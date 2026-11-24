#!/usr/bin/env node
// Re-adds free-class sign-ups that the site confirmed to the attendee but could
// not save, because the database was down when they registered.
//
// Why this exists (24 Nov 2026): the MastermindsHQ Supabase project runs on a
// tiny instance that freezes and restarts for 15-80 minutes at a time (16, 18,
// 20, 23 and 24 Nov). The site retries for ~40 s, then sends a
// "[Backup] Unsaved registration" email from Resend. This job reads those
// emails straight from Resend (no Gmail login needed), checks the database,
// and inserts anyone still missing, using the same row shape the site writes.
// It keeps trying every run until the database answers, so an outage of any
// length heals itself.
//
// Usage:  node scripts/replay-backup-registrations.mjs [--live] [--days 7]
// Without --live it only reports what it would add.

import { createHmac, randomUUID } from 'node:crypto'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { homedir } from 'node:os'

const LIVE = process.argv.includes('--live')
const daysArg = process.argv.indexOf('--days')
const DAYS = daysArg > -1 ? Number(process.argv[daysArg + 1]) : 7
const SUBJECT_PREFIX = '[Backup] Unsaved registration:'
const VERCEL_PROJECT = 'prj_kHhJsQoPR3XUpVULzRy9nCRAfPIq'
const VERCEL_TEAM = 'team_HNMf5x4L1nlLH6f1m7Nf1HAe'
const MASTER_ENV = '/Users/myos/.myos/workspace/.env'
const STATE_FILE = `${homedir()}/.myos/state/backup-registration-replay.json`

const log = (...a) => console.log(new Date().toISOString(), ...a)

function readMasterEnv(key) {
  const line = readFileSync(MASTER_ENV, 'utf8').split('\n').find((l) => l.startsWith(`${key}=`))
  if (!line) throw new Error(`${key} missing from master .env`)
  return line.slice(key.length + 1).trim().replace(/^"|"$/g, '')
}

async function vercelEnv(keys) {
  const token = readMasterEnv('VERCEL_TOKEN')
  const h = { Authorization: `Bearer ${token}` }
  const list = await fetch(
    `https://api.vercel.com/v9/projects/${VERCEL_PROJECT}/env?teamId=${VERCEL_TEAM}`,
    { headers: h },
  ).then((r) => r.json())
  const out = {}
  for (const key of keys) {
    const env = list.envs.find((e) => e.key === key && e.target.includes('production'))
    if (!env) throw new Error(`Vercel env ${key} not found`)
    const full = await fetch(
      `https://api.vercel.com/v1/projects/${VERCEL_PROJECT}/env/${env.id}?teamId=${VERCEL_TEAM}&decrypt=true`,
      { headers: h },
    ).then((r) => r.json())
    out[key] = full.value
  }
  return out
}

function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf8'))
  } catch {
    return { done: {} }
  }
}

function saveState(state) {
  mkdirSync(dirname(STATE_FILE), { recursive: true })
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
}

const unescape = (s) =>
  s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

export function parseBackupHtml(html) {
  const fields = {}
  const re = /<tr><td><b>([^<]+)<\/b><\/td><td>([\s\S]*?)<\/td><\/tr>/g
  let m
  while ((m = re.exec(html))) fields[m[1].trim()] = unescape(m[2]).trim()
  return {
    eventSlug: fields.Event,
    name: fields.Name,
    email: fields.Email?.toLowerCase(),
    whatsapp: fields.WhatsApp || null,
    answer: fields.Answer || null,
    ref: (fields.Ref || 'untagged').toLowerCase(),
  }
}

async function listBackupAlerts(resendKey) {
  const cutoff = Date.now() - DAYS * 86400_000
  const found = []
  let after = null
  for (let page = 0; page < 30; page++) {
    const url = `https://api.resend.com/emails?limit=100${after ? `&after=${after}` : ''}`
    const res = await fetch(url, { headers: { Authorization: `Bearer ${resendKey}` } })
    if (!res.ok) throw new Error(`Resend list ${res.status}`)
    const body = await res.json()
    let reachedCutoff = false
    for (const e of body.data) {
      if (Date.parse(e.created_at.replace(' ', 'T').replace(/\+00$/, 'Z')) < cutoff) {
        reachedCutoff = true
        break
      }
      if (e.subject?.startsWith(SUBJECT_PREFIX)) found.push(e)
    }
    if (reachedCutoff || !body.has_more || !body.data.length) break
    after = body.data[body.data.length - 1].id
  }
  return found
}

async function main() {
  const env = await vercelEnv(['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SECRET_KEY', 'RESEND_API_KEY', 'CRON_SECRET'])
  const sb = env.NEXT_PUBLIC_SUPABASE_URL
  const sbh = {
    apikey: env.SUPABASE_SECRET_KEY,
    Authorization: `Bearer ${env.SUPABASE_SECRET_KEY}`,
    'Content-Type': 'application/json',
  }
  const state = loadState()
  const alerts = (await listBackupAlerts(env.RESEND_API_KEY)).filter((a) => !state.done[a.id])
  if (!alerts.length) return log('no open backup alerts')

  for (const alert of alerts) {
    const full = await fetch(`https://api.resend.com/emails/${alert.id}`, {
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}` },
    }).then((r) => r.json())
    const p = parseBackupHtml(full.html || '')
    if (!p.eventSlug || !p.email || !p.name) {
      log('could not parse alert', alert.id, alert.subject)
      continue
    }

    const q = `${sb}/rest/v1/event_registrations?select=id&status=eq.confirmed&event_slug=eq.${encodeURIComponent(p.eventSlug)}&attendee_email=eq.${encodeURIComponent(p.email)}`
    const check = await fetch(q, { headers: sbh, signal: AbortSignal.timeout(15000) }).catch((e) => ({ ok: false, status: String(e) }))
    if (!check.ok) {
      log('database not answering, will retry next run', check.status, p.email)
      return
    }
    if ((await check.json()).length) {
      log('already saved', p.eventSlug, p.email)
      state.done[alert.id] = { at: new Date().toISOString(), result: 'already-saved', email: p.email }
      saveState(state)
      continue
    }

    if (!LIVE) {
      log('[dry run] would add', p.eventSlug, p.name, p.email, p.ref)
      continue
    }

    const id = randomUUID()
    const registeredAt = new Date(Date.parse(alert.created_at.replace(' ', 'T').replace(/\+00$/, 'Z'))).toISOString()
    const ins = await fetch(`${sb}/rest/v1/event_registrations`, {
      method: 'POST',
      headers: { ...sbh, Prefer: 'return=minimal' },
      body: JSON.stringify({
        id,
        event_slug: p.eventSlug,
        attendee_name: p.name,
        attendee_email: p.email,
        acquisition_ref: p.ref,
        amount_paid: 0,
        cancel_token: createHmac('sha256', env.CRON_SECRET).update(`cancel:${id}`).digest('hex'),
        status: 'confirmed',
        whatsapp_number: p.whatsapp,
        business_context: p.answer,
        registered_at: registeredAt,
      }),
      signal: AbortSignal.timeout(15000),
    }).catch((e) => ({ ok: false, status: String(e), text: async () => '' }))
    if (!ins.ok) {
      log('insert failed, will retry next run', ins.status, await ins.text(), p.email)
      return
    }

    await fetch(`${sb}/rest/v1/event_registration_intake?on_conflict=event_slug,attendee_email`, {
      method: 'POST',
      headers: { ...sbh, Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({
        event_slug: p.eventSlug,
        attendee_name: p.name,
        attendee_email: p.email,
        whatsapp_number: p.whatsapp,
        business_context: p.answer,
        acquisition_ref: p.ref,
        updated_at: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(15000),
    }).catch(() => null)

    log('RE-ADDED', p.eventSlug, p.name, p.email, id)
    state.done[alert.id] = { at: new Date().toISOString(), result: 're-added', email: p.email, id }
    saveState(state)
  }
}

main().catch((err) => {
  log('error', err?.message || err)
  process.exit(1)
})
