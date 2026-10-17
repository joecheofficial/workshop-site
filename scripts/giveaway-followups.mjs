#!/usr/bin/env node
// Free-gift follow-up sender (day 1 IG DM, day 2-3 quick win, day 5-7 last email).
// Copy and rules: src/lib/giveaway-followups.ts. Docs: docs/giveaway-followups.md.
//
//   node scripts/giveaway-followups.mjs                       dry run: who would get what, and why the rest are skipped
//   node scripts/giveaway-followups.mjs --show                dry run + the full text of every due message
//   node scripts/giveaway-followups.mjs --render-dir <dir>    write every variant to <dir> (html + txt) for review, sends nothing
//   node scripts/giveaway-followups.mjs --test-to delivered@resend.dev   send every email variant to Resend's sink only
//   GIVEAWAY_FOLLOWUPS_ENABLED=1 GIVEAWAY_FOLLOWUPS_START=<iso> node scripts/giveaway-followups.mjs --live --alert
//   --only <email>  limit to one address    --max <n>  cap sends per run (default 20)    --env-file <path>
//   node scripts/giveaway-followups.mjs --review-to illy@mastermindshq.business   day 14 + day 30 copies to Illy, once each (only when she asks)
//   --only <email> --force-step dm_level|dm_ack   test one DM on a test account now, ignoring the timing (guards still apply)
//
// Node 26 runs this directly (it strips the TypeScript types from the lib import).
// Safety: every send is claimed in giveaway_followup_sends first (unique email+step);
// unsubscribes, customers, Joe's close circle, the do-not-contact list, dead email
// domains and anyone who wrote back are skipped; any lookup that fails skips the
// person for this run rather than guessing.

import { execFileSync } from 'node:child_process'
import { createHash, createHmac, randomBytes } from 'node:crypto'
import { promises as dns } from 'node:dns'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { homedir } from 'node:os'
import path from 'node:path'
import {
  LAST, QUICKWIN, DM_ACK_BUBBLES, dayZeroPs, planFollowups, renderDmLevel, renderLast, renderQuickwin, toHtml,
  BUILDER_SOURCES, WW_FUNNEL_SOURCES, BONUS_TTL_HOURS, GIFTS, GIFT_ORDER, LIVE_EVENTS, renderGift2, renderLive,
  SALES_DAY2, renderSalesDay2, renderSalesDay5, salesOfferFor, ILLY_REPLY_TO,
} from '../src/lib/giveaway-followups.ts'
import { signDeal } from '/Users/myos/.myos/workspace/projects/mastermind/mhq-homepage/src/lib/mhq-checkout-deals.mjs'
import { withEmailLogo } from '../src/lib/email-logo.ts'

const WS = '/Users/myos/.myos/workspace'
const require = createRequire(import.meta.url)
const args = process.argv.slice(2)
const flag = (n) => args.includes(n)
const value = (n) => { const i = args.indexOf(n); return i !== -1 ? args[i + 1] : undefined }
const live = flag('--live')
const show = flag('--show')
const alert = flag('--alert')
const only = (value('--only') || '').trim().toLowerCase() || null
const max = Number(value('--max') || 20)
const renderDir = value('--render-dir')
const testTo = (value('--test-to') || '').trim().toLowerCase() || null
// Illy's review copies of the day 14 / day 30 emails: only to her, only on her explicit ask.
const reviewTo = (value('--review-to') || '').trim().toLowerCase() || null
const reviewSet = value('--review-set') || 'tail' // 'tail' = day 14 + day 30, 'sales' = the sales-keyword track
const forceStep = value('--force-step') || null
if (forceStep && (!only || !['dm_level', 'dm_ack'].includes(forceStep))) throw new Error('--force-step needs --only <email> and dm_level or dm_ack')

for (const line of readFileSync((value('--env-file') || `${WS}/.env`).replace(/^~/, homedir()), 'utf8').split('\n')) {
  if (!line.includes('=') || line.trim().startsWith('#')) continue
  const i = line.indexOf('=')
  const k = line.slice(0, i).trim()
  if (!(k in process.env)) process.env[k] = line.slice(i + 1).trim().replace(/^"|"$/g, '')
}

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY
const RESEND_KEY = process.env.RESEND_API_KEY
const STRIPE_KEY = (process.env.STRIPE_SECRET_KEY || '').trim()
const UNSUB_SECRET = process.env.UNSUBSCRIBE_TOKEN_SECRET
const FROM = 'Joe Che <joe@mastermindshq.business>'
const REPLY_TO = 'joe@mastermindshq.business'
const PARTICIPANTS_DB = `${WS}/data/mastermind-participants.db`
const DNC_FILE = `${WS}/agents/lead-machine/data/touch-overrides.json`
const CRM_DB = `${WS}/data/${'crm'}.db`
const INSTADM_CONFIG = `${WS}/agents/manychat/data/instadm-config.json`
const HOUR = 3600 * 1000

// ---------------------------------------------------------------- helpers

const sb = (p, init = {}) => fetch(`${SUPABASE_URL}/rest/v1/${p}`, {
  ...init,
  headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
})
async function sbJson(p) {
  const res = await sb(p)
  if (!res.ok) throw new Error(`Supabase ${p.split('?')[0]} ${res.status}: ${(await res.text()).slice(0, 200)}`)
  return res.json()
}
const inList = (emails) => `(${emails.map((e) => `"${encodeURIComponent(e)}"`).join(',')})`

function unsubscribeUrl(email) {
  const payload = Buffer.from(email.trim().toLowerCase(), 'utf8').toString('base64url')
  const sig = createHmac('sha256', UNSUB_SECRET).update(payload).digest('base64url')
  return `https://workshop.mastermindshq.business/api/unsubscribe?token=${encodeURIComponent(`${payload}.${sig}`)}`
}

function linaToken() {
  if (process.env.LINA_TELEGRAM_BOT_TOKEN && process.env.LINA_OWNER_CHAT_IDS) return
  const plist = path.join(homedir(), 'Library/LaunchAgents/com.illy.lina-bot.plist')
  const read = (k) => { try { return execFileSync('/usr/libexec/PlistBuddy', ['-c', `Print :EnvironmentVariables:${k}`, plist], { encoding: 'utf8' }).trim() } catch { return '' } }
  process.env.LINA_TELEGRAM_BOT_TOKEN ||= read('LINA_TELEGRAM_BOT_TOKEN')
  process.env.LINA_OWNER_CHAT_IDS ||= read('LINA_OWNER_CHAT_IDS')
}
async function lina(text) {
  linaToken()
  const token = process.env.LINA_TELEGRAM_BOT_TOKEN
  const chats = String(process.env.LINA_OWNER_CHAT_IDS || '').split(',').map((s) => s.trim()).filter(Boolean)
  if (!token || !chats.length) { console.error('lina: no token/chat, alert not sent:', text); return }
  for (const chat_id of chats) {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text, disable_web_page_preview: true }),
    }).catch((e) => console.error('lina send failed', e.message))
  }
}

async function domainAlive(email) {
  const domain = email.split('@')[1]
  if (!domain) return false
  try { if ((await dns.resolveMx(domain)).length) return true } catch {}
  try { if ((await dns.resolve4(domain)).length) return true } catch {}
  return false
}

// ---------------------------------------------------------------- lookups

function participantEmails() {
  const out = execFileSync('/usr/bin/sqlite3', ['-readonly', PARTICIPANTS_DB,
    "select lower(trim(email)) from participants where email like '%@%' union select lower(trim(secondary_email)) from participants where secondary_email like '%@%' union select lower(trim(calendar_invite_email)) from participants where calendar_invite_email like '%@%'"],
  { encoding: 'utf8' })
  return new Set(out.split('\n').map((s) => s.trim()).filter(Boolean))
}

async function stripeBuyer(email) {
  const q = new URLSearchParams({ 'customer_details[email]': email, status: 'complete', limit: '1' })
  const r = await fetch(`https://api.stripe.com/v1/checkout/sessions?${q}`, { headers: { Authorization: `Bearer ${STRIPE_KEY}` } })
  if (!r.ok) throw new Error(`Stripe sessions ${r.status}`)
  if ((await r.json()).data?.length) return true
  // Payments outside Checkout (invoices, subscriptions): any paid charge on a customer with this email.
  const headers = { Authorization: `Bearer ${STRIPE_KEY}`, 'Stripe-Version': '2024-06-20' }
  const s = new URLSearchParams({ query: `email:'${email.replace(/'/g, '')}'`, limit: '10' })
  const c = await fetch(`https://api.stripe.com/v1/customers/search?${s}`, { headers })
  if (!c.ok) throw new Error(`Stripe customers ${c.status}`)
  for (const cus of (await c.json()).data || []) {
    const ch = await fetch(`https://api.stripe.com/v1/charges?customer=${cus.id}&limit=10`, { headers })
    if (!ch.ok) throw new Error(`Stripe charges ${ch.status}`)
    if (((await ch.json()).data || []).some((x) => x.paid && x.status === 'succeeded' && x.amount > 0)) return true
  }
  return false
}

function dncEmails() {
  try {
    const j = JSON.parse(readFileSync(DNC_FILE, 'utf8'))
    return new Set((j.do_not_contact || []).map((x) => String(x.match || '').toLowerCase()).filter((m) => m.includes('@')))
  } catch { return null }
}

/** Did they write to Joe by email since the gift? gog failure throws, so the caller skips them. */
function repliedByEmail(email, since) {
  const after = new Date(since.getTime() - 24 * HOUR).toISOString().slice(0, 10).replace(/-/g, '/')
  for (const acct of ['joe@mastermindshq.business', ILLY_REPLY_TO]) {
    const out = execFileSync('/opt/homebrew/bin/gog', ['-a', acct, 'gmail', 'search', `from:${email} after:${after}`, '--json'], { encoding: 'utf8', timeout: 60000 })
    const j = JSON.parse(out || '[]')
    const list = Array.isArray(j) ? j : (j.threads || j.messages || j.results || [])
    if (list.length > 0) return true
  }
  return false
}

// ---- day 14 / day 30 lookups (only for people past the day 5-7 email)

/** Free gifts the CRM knows they grabbed (first and latest source). */
function crmFirstSource(email) {
  const e = email.replace(/'/g, "''")
  const out = execFileSync('/usr/bin/sqlite3', ['-readonly', CRM_DB, `select source_first from crm_contacts where lower(primary_email)='${e}' and source_first like 'giveaway-%' union select source_latest from crm_contacts where lower(primary_email)='${e}' and source_latest like 'giveaway-%'`], { encoding: 'utf8' })
  return out.split('\n').map((x) => x.trim().replace(/^giveaway-/, '')).filter(Boolean)
}
let keywordToSlug = null
function slugForKeyword(kw) {
  if (!keywordToSlug) {
    keywordToSlug = new Map()
    try {
      const j = JSON.parse(readFileSync(INSTADM_CONFIG, 'utf8'))
      for (const [k, v] of Object.entries(j.active || {})) if (v?.slug) keywordToSlug.set(k.toLowerCase(), v.slug)
    } catch {}
  }
  return keywordToSlug.get(String(kw || '').toLowerCase()) || null
}

/** Started any checkout (paid or not) since the gift, including the 72h bonus link. */
let recentSessions = null
async function checkoutStartedSince(email, since) {
  if (!recentSessions) {
    recentSessions = []
    let after = null
    const from = Math.floor((Date.now() - 45 * 24 * HOUR) / 1000)
    for (let page = 0; page < 20; page++) {
      const q = new URLSearchParams({ limit: '100', 'created[gte]': String(from) })
      if (after) q.set('starting_after', after)
      const r = await fetch(`https://api.stripe.com/v1/checkout/sessions?${q}`, { headers: { Authorization: `Bearer ${STRIPE_KEY}` } })
      if (!r.ok) throw new Error(`Stripe sessions list ${r.status}`)
      const body = await r.json()
      recentSessions.push(...body.data)
      if (!body.has_more || !body.data.length) break
      after = body.data[body.data.length - 1].id
    }
  }
  const t = Math.floor(since.getTime() / 1000)
  return recentSessions.some((s) => s.created >= t && [s.customer_details?.email, s.customer_email, s.metadata?.giveaway_email]
    .some((e) => String(e || '').toLowerCase() === email))
}

/** A call on Illy's or Joe's calendar with them as a guest, from the gift on. */
function bookedCall(email, since) {
  for (const acct of ['illy@mastermindshq.business', 'joe@mastermindshq.business']) {
    const out = execFileSync('/opt/homebrew/bin/gog', ['-a', acct, 'calendar', 'search', email, '--from', since.toISOString(), '--to', new Date(Date.now() + 90 * 24 * HOUR).toISOString(), '--json', '--results-only'], { encoding: 'utf8', timeout: 60000 })
    const events = JSON.parse(out || '[]')
    if ((Array.isArray(events) ? events : []).some((e) => (e.attendees || []).some((a) => String(a.email || '').toLowerCase() === email))) return true
  }
  return false
}

let manychat = null
function mc() {
  if (!manychat) manychat = require(`${WS}/agents/manychat/src/api.js`)
  return manychat
}
async function findSubscriber(email) {
  const r = await mc().get(`/fb/subscriber/findBySystemField?email=${encodeURIComponent(email)}`)
  const s = r && r.status === 'success' ? r.data : null
  if (!s || !s.id) return null
  const preferred = (s.custom_fields || []).find((c) => c.name === 'preferred_name')?.value
  const lastKeyword = (s.custom_fields || []).find((c) => c.name === 'last_keyword')?.value || null
  return { id: String(s.id), ig_username: s.ig_username || null, name: preferred || s.first_name || null, last_keyword: lastKeyword,
    ig_last_interaction: s.ig_last_interaction || null, last_input_text: s.last_input_text || null, live_chat_url: s.live_chat_url || null }
}

// ---------------------------------------------------------------- sending

async function claim(item, extra = {}) {
  const res = await sb('giveaway_followup_sends?select=id', {
    method: 'POST', headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ email: item.email, step: item.step, level: item.level, source: item.source, ...extra }),
  })
  if (res.status === 409) return null
  if (!res.ok) throw new Error(`claim ${item.email}/${item.step} ${res.status}: ${(await res.text()).slice(0, 200)}`)
  return (await res.json())[0].id
}
const unclaim = (id) => sb(`giveaway_followup_sends?id=eq.${id}`, { method: 'DELETE' })
const markSent = (id, patch) => sb(`giveaway_followup_sends?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(patch) })

// Day 5-7 workshop bonus: one signed checkout link per person, the $67 workshop plus the
// Get Found kit as its own $0 price (the same line the demo page's 24h bonus uses, which the
// portal webhook grants like the paid add-on; a coupon on the $47 price would fail the
// portal's exact amount check). /api/mhq-checkout refuses the link after 72h.
const BONUS_DEAL = {
  price: 'price_1UA5zHEmLFN6MnIWrcT2h1tR', upfrontPrice: 'price_1UQlfnEmLFN6MnIWxyqlUeQB', mode: 'payment',
  metadata: { myos_flow: 'website_workshop', courseSlug: 'website-workshop', productKey: 'website-workshop', deal: 'website_workshop_getfound_bonus', source_tag: 'giveaway_followup' },
  successUrl: 'https://mastermindshq.business/website-workshop/thank-you?session_id={CHECKOUT_SESSION_ID}',
  cancelUrl: 'https://mastermindshq.business/website-workshop',
  fallback: 'https://mastermindshq.business/website-workshop',
}
// The signed checkout link is far too long to show (Illy, 17 Oct), so each person gets their
// own Shlink short link that stops working after 72h. The signed token lives an hour longer
// than the short link, so nobody can reach the checkout's raw "expired" error; after 72h the
// short link goes to Shlink's default (the MHQ homepage).
const SHLINK_VPS = 'root@100.90.95.9'
function shlinkCreate(longUrl, slug, title, validUntil) {
  const { _internal } = require(`${WS}/agents/shlink/recipes/shorten-link.js`)
  const cmd = _internal.buildRemoteCommand(['docker', 'exec', 'shlink', 'shlink', 'short-url:create', longUrl,
    '--custom-slug', slug, '--title', title, '--valid-until', validUntil.toISOString().replace(/\.\d{3}Z$/, '+00:00'), '--no-interaction'])
  const out = execFileSync('ssh', ['-i', `${homedir()}/.ssh/id_ed25519`, '-o', 'ConnectTimeout=8', '-o', 'StrictHostKeyChecking=no', SHLINK_VPS, cmd], { encoding: 'utf8', timeout: 30000 })
  const m = out.match(/Generated short URL:\s*(\S+)/)
  if (!m) throw new Error(`Shlink did not return a short URL: ${out.slice(0, 200)}`)
  return m[1]
}
function bonusLink(email) {
  const secret = (process.env.MHQ_CHECKOUT_SIGNING_SECRET || '').trim()
  if (!secret) throw new Error('MHQ_CHECKOUT_SIGNING_SECRET missing, cannot mint the 72h bonus link')
  const deal = { ...BONUS_DEAL, metadata: { ...BONUS_DEAL.metadata, giveaway_email: email } }
  const longUrl = `https://mastermindshq.business/api/mhq-checkout?m=${encodeURIComponent(signDeal(deal, secret, { ttlMs: (BONUS_TTL_HOURS + 1) * HOUR }))}`
  const slug = `fg-bonus-${randomBytes(4).toString('hex')}`
  return shlinkCreate(longUrl, slug, 'Free-gift follow-up: 72h workshop + Get Found bonus', new Date(Date.now() + BONUS_TTL_HOURS * HOUR))
}

function renderEmailFor(item) {
  const needsBonus = item.variant === 'last_workshop' || item.sales_variant === 'last_workshop'
  const v = { first_name: item.first_name, unsubscribe_url: unsubscribeUrl(item.email), ...(needsBonus ? { bonus_link: bonusLink(item.email) } : {}) }
  if (item.step === 'sales_day2') return renderSalesDay2(item.offer, v)
  if (item.step === 'sales_day5') return renderSalesDay5(item.sales_variant, v)
  if (item.step === 'email_quickwin') return renderQuickwin(item.level, v)
  if (item.step === 'email_gift2') return renderGift2(item.level, item.gift, v)
  if (item.step === 'email_live') return renderLive(item.event, v)
  return renderLast(item.variant, v)
}

async function resendSend({ to, subject, text, step, key, replyTo = [REPLY_TO] }) {
  const unsub = unsubscribeUrl(to)
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': createHash('sha1').update(key).digest('hex') },
    body: JSON.stringify({
      from: FROM, to: [to], subject, text, html: withEmailLogo(toHtml(text)), reply_to: replyTo,
      headers: { 'List-Unsubscribe': `<${unsub}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
      tags: [{ name: 'flow', value: 'giveaway_followup' }, { name: 'step', value: step }],
    }),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok || !body.id) throw new Error(`Resend ${res.status}: ${JSON.stringify(body).slice(0, 200)}`)
  return body.id
}

async function sendDm(subscriberId, bubbles) {
  // Same body shape as the live ManyChat stuck-link watcher (agents/manychat/src/stuck-link-watch.js).
  return mc().post('/fb/sending/sendContent', {
    subscriber_id: Number(subscriberId),
    data: { version: 'v2', content: { type: 'instagram', messages: bubbles.map((text) => ({ type: 'text', text })) } },
  })
}

async function sendOne(item, sub) {
  if (item.step === 'dm_human') {
    const id = await claim(item, { detail: { reply: item.reply_text } })
    if (!id) return { status: 'already' }
    await lina(`Free-gift DM: @${item.ig_username || '?'} (${item.email}) answered the level question in their own words, so the bot stayed quiet and their emails are paused. They wrote:\n\n"${item.reply_text}"\n\nReply by hand (DM Writer / ManyChat live chat): ${sub?.live_chat_url || 'open ManyChat'}`)
    return { status: 'flagged' }
  }
  if (item.step === 'dm_level' || item.step === 'dm_ack') {
    const bubbles = item.step === 'dm_level' ? renderDmLevel(item.first_name) : DM_ACK_BUBBLES
    const id = await claim(item)
    if (!id) return { status: 'already' }
    try {
      const r = await sendDm(item.subscriber_id, bubbles)
      if (r?.status !== 'success') throw new Error(`ManyChat: ${JSON.stringify(r).slice(0, 200)}`)
      await markSent(id, { message_id: `manychat:${item.subscriber_id}` })
      return { status: 'sent' }
    } catch (err) {
      if (err?.code === 'CLOSE_CIRCLE_BLOCKED') {
        await markSent(id, { detail: { blocked: err.message.slice(0, 300) } })
        return { status: 'blocked_close_circle' }
      }
      await unclaim(id)
      throw err
    }
  }
  if (!(await domainAlive(item.email))) return { status: 'dead_domain' }
  const { subject, text } = renderEmailFor(item)
  const v5 = item.variant || item.sales_variant
  const detail = v5 ? { variant: v5, ...(item.offer ? { offer: item.offer } : {}), ...(v5 === 'last_workshop' ? { bonus_until: new Date(Date.now() + BONUS_TTL_HOURS * HOUR).toISOString() } : {}) }
    : item.offer ? { offer: item.offer } : item.gift ? { gift: item.gift.slug } : item.event ? { event: item.event.id } : null
  const id = await claim(item, detail ? { detail } : {})
  if (!id) return { status: 'already' }
  try {
    // Mastermind emails ask for a reply that sets up a call with Illy, so she gets the reply too.
    const replyTo = item.offer === 'mastermind' ? [REPLY_TO, ILLY_REPLY_TO] : [REPLY_TO]
    const messageId = await resendSend({ to: item.email, subject, text, step: item.step, key: `giveaway-followup:${item.step}:${item.email}`, replyTo })
    await markSent(id, { message_id: messageId })
    return { status: 'sent', id: messageId }
  } catch (err) {
    await unclaim(id)
    throw err
  }
}

// ---------------------------------------------------------------- review modes

function allVariants() {
  const v = { first_name: 'Rick', unsubscribe_url: 'https://workshop.mastermindshq.business/api/unsubscribe?token=EXAMPLE', bonus_link: 'https://a.mastermindshq.business/fg-bonus-1a2b3c4d' }
  const out = []
  for (const level of Object.keys(QUICKWIN)) out.push({ key: `day2-3-quickwin-${level}`, ...renderQuickwin(level, v) })
  for (const variant of Object.keys(LAST)) out.push({ key: `day5-7-${variant}`, ...renderLast(variant, v) })
  for (const level of Object.keys(GIFT_ORDER)) out.push({ key: `day14-gift-${level}`, ...renderGift2(level, GIFTS[GIFT_ORDER[level][0]], v) })
  for (const e of LIVE_EVENTS) out.push({ key: `day30-live-${e.id}`, ...renderLive(e, v) })
  for (const o of Object.keys(SALES_DAY2)) out.push({ key: `sales-${o}-day2`, ...renderSalesDay2(o, v) })
  for (const k of ['sales_last_book', 'sales_last_mastermind']) out.push({ key: `sales-${k.replace('sales_last_', '')}-day5`, ...renderSalesDay5(k, v) })
  return out
}

async function renderAll(dir) {
  mkdirSync(dir, { recursive: true })
  for (const e of allVariants()) {
    writeFileSync(path.join(dir, `${e.key}.txt`), `Subject: ${e.subject}\n\n${e.text}\n`)
    writeFileSync(path.join(dir, `${e.key}.html`), `<!doctype html><meta charset="utf-8"><title>${e.subject}</title><p style="font-family:system-ui;color:#888">Subject: ${e.subject}</p>${withEmailLogo(toHtml(e.text))}`)
  }
  const starter = dayZeroPs('lead-machine')
  const builder = dayZeroPs('tokens')
  writeFileSync(path.join(dir, 'day0-ps.txt'), `Starter gifts:\n${starter.text}\n\nBuilder gifts (${[...BUILDER_SOURCES].join(', ')}):\n${builder.text}\n\nai-levels-quiz: no P.S.\n`)
  writeFileSync(path.join(dir, 'day1-dm.txt'), `Level question (bubbles):\n${renderDmLevel('Rick').map((b) => `> ${b}`).join('\n')}\n\nAfter a 1/2/3 answer:\n${DM_ACK_BUBBLES.map((b) => `> ${b}`).join('\n')}\n`)
  console.log(`rendered ${allVariants().length} emails + day0-ps.txt + day1-dm.txt to ${dir}`)
}

async function testSends(to) {
  if (!/@resend\.dev$/.test(to)) throw new Error('--test-to only accepts a Resend sink address (…@resend.dev)')
  for (const e of allVariants()) {
    const id = await resendSend({ to, subject: `[TEST] ${e.subject}`, text: e.text, step: e.key, key: `giveaway-followup-test:${e.key}:${Date.now()}` })
    let last = 'queued'
    for (let i = 0; i < 10 && !['delivered', 'bounced', 'complained'].includes(last); i++) {
      await new Promise((r) => setTimeout(r, 1500))
      const r = await fetch(`https://api.resend.com/emails/${id}`, { headers: { Authorization: `Bearer ${RESEND_KEY}` } })
      last = (await r.json()).last_event || last
    }
    console.log(`${e.key}: ${id} ${last}`)
  }
}

async function reviewSends(to) {
  if (to !== 'illy@mastermindshq.business') throw new Error('--review-to only sends to illy@mastermindshq.business')
  const v = { first_name: 'Illy', unsubscribe_url: unsubscribeUrl(to) }
  if (reviewSet === 'sales') {
    // The exact sales-keyword track: day 2 per offer, then each offer's day 5 (Meta and the
    // workshop reuse the approved day 5-7 emails; the workshop one carries a REAL 72h link).
    const wv = { ...v, bonus_link: bonusLink(to) }
    const sales = [
      ...['book', 'mastermind', 'meta', 'workshop'].map((o) => ({ key: `sales-${o}-day2`, label: `[FINAL sales · ${o} · day 2]`, ...renderSalesDay2(o, v) })),
      { key: 'sales-book-day5', label: '[FINAL sales · book · day 5]', ...renderSalesDay5('sales_last_book', v) },
      { key: 'sales-mastermind-day5', label: '[FINAL sales · mastermind · day 5]', ...renderSalesDay5('sales_last_mastermind', v) },
      { key: 'sales-meta-day5-final-review', label: '[FINAL sales · meta · day 5 · until 2 Nov]', ...renderSalesDay5('last_meta_final_review', v) },
      { key: 'sales-meta-day5-recorded', label: '[FINAL sales · meta · day 5 · from 3 Nov]', ...renderSalesDay5('last_meta_recorded', v) },
      { key: 'sales-workshop-day5', label: '[FINAL sales · workshop · day 5]', ...renderSalesDay5('last_workshop', wv) },
    ]
    for (const e of sales) {
      const replyTo = e.key.includes('mastermind') ? [REPLY_TO, ILLY_REPLY_TO] : [REPLY_TO]
      const id = await resendSend({ to, subject: `${e.label} ${e.subject}`, text: e.text, step: e.key, key: `giveaway-followup-review:${e.key}:${to}`, replyTo })
      let last = 'queued'
      for (let i = 0; i < 10 && !['delivered', 'bounced', 'complained'].includes(last); i++) {
        await new Promise((r) => setTimeout(r, 1500))
        last = (await (await fetch(`https://api.resend.com/emails/${id}`, { headers: { Authorization: `Bearer ${RESEND_KEY}` } })).json()).last_event || last
      }
      console.log(`${e.label}: ${id} ${last}`)
    }
    return
  }
  const items = [
    ...Object.keys(GIFT_ORDER).map((level) => ({ key: `day14-${level}`, label: `[FINAL day 14 · ${level}]`, ...renderGift2(level, GIFTS[GIFT_ORDER[level][0]], v) })),
    ...LIVE_EVENTS.map((e) => ({ key: `day30-${e.id}`, label: `[FINAL day 30 · ${e.id}]`, ...renderLive(e, v) })),
  ]
  for (const e of items) {
    // Fixed idempotency key: a re-run within 24h cannot send her a second copy.
    const id = await resendSend({ to, subject: `${e.label} ${e.subject}`, text: e.text, step: e.key, key: `giveaway-followup-review:${e.key}:${to}` })
    let last = 'queued'
    for (let i = 0; i < 10 && !['delivered', 'bounced', 'complained'].includes(last); i++) {
      await new Promise((r) => setTimeout(r, 1500))
      last = (await (await fetch(`https://api.resend.com/emails/${id}`, { headers: { Authorization: `Bearer ${RESEND_KEY}` } })).json()).last_event || last
    }
    console.log(`${e.label}: ${id} ${last}`)
  }
}

// ---------------------------------------------------------------- main

async function main() {
  const missing = Object.entries({ SUPABASE_URL, SUPABASE_KEY, RESEND_KEY, STRIPE_KEY, UNSUBSCRIBE_TOKEN_SECRET: UNSUB_SECRET }).filter(([, v]) => !v).map(([k]) => k)
  if (missing.length) throw new Error(`missing env: ${missing.join(', ')}`)
  if (renderDir) return renderAll(renderDir)
  if (testTo) return testSends(testTo)
  if (reviewTo) return reviewSends(reviewTo)

  const startRaw = process.env.GIVEAWAY_FOLLOWUPS_START
  if (live && (process.env.GIVEAWAY_FOLLOWUPS_ENABLED !== '1' || !startRaw)) {
    console.log('REFUSED: --live needs GIVEAWAY_FOLLOWUPS_ENABLED=1 and GIVEAWAY_FOLLOWUPS_START. Nothing sent.')
    return
  }
  const now = new Date()
  const startAt = startRaw ? new Date(startRaw) : new Date(now.getTime() - 35 * 24 * HOUR)
  if (Number.isNaN(startAt.getTime())) throw new Error(`bad GIVEAWAY_FOLLOWUPS_START: ${startRaw}`)
  const since = new Date(Math.max(startAt.getTime(), now.getTime() - 35 * 24 * HOUR))

  let leads = await sbJson(`leads?select=email,lead_source,first_name,created_at,updated_at&updated_at=gte.${encodeURIComponent(since.toISOString())}&order=updated_at.desc&limit=1000`)
  if (only) leads = leads.filter((l) => String(l.email).toLowerCase() === only)
  const emails = [...new Set(leads.map((l) => String(l.email).trim().toLowerCase()))]
  const sent = emails.length ? await sbJson(`giveaway_followup_sends?select=email,step,sent_at,level,source,detail&email=in.${inList(emails)}`) : []
  const pastLast = new Set(sent.filter((r) => r.step === 'email_last').map((r) => String(r.email).toLowerCase()))
  const suppressed = emails.length ? (await sbJson(`email_suppressions?select=email&email=in.${inList(emails)}`)).map((r) => r.email) : []
  const quiz = emails.length ? await sbJson(`ai_levels_quiz_leads?select=email,source,score,updated_at&email=in.${inList(emails)}&order=updated_at.asc`) : []
  const quizScores = new Map()
  const inWorkshopFunnel = []
  for (const q of quiz) {
    const e = String(q.email).toLowerCase()
    if (q.score != null) quizScores.set(e, Number(q.score))
    if (WW_FUNNEL_SOURCES.has(String(q.source))) inWorkshopFunnel.push(e)
  }

  const participants = participantEmails()
  const dnc = dncEmails()
  if (!dnc) throw new Error(`could not read ${DNC_FILE}, refusing to run`)
  const guard = require(`${WS}/agents/shared/close-circle-guard.js`)
  const customers = []
  const blocked = []
  const repliedByEmailList = []
  const subscribers = new Map()
  const lookupFailed = new Set()
  const clickedOffer = []
  const booked = []
  const grabbedGifts = new Map()
  for (const lead of leads) {
    const email = String(lead.email).trim().toLowerCase()
    try {
      if (participants.has(email) || (await stripeBuyer(email))) customers.push(email)
      const sub = await findSubscriber(email)
      if (sub) subscribers.set(email, sub)
      const g = guard.guardSend({ email, ig_username: sub?.ig_username, name: sub?.name || lead.first_name }, { channel: 'email+instagram', caller: 'workshop-site/scripts/giveaway-followups.mjs' })
      if (g.blocked || dnc.has(email)) blocked.push(email)
      const grabbedAt = new Date(lead.updated_at || lead.created_at)
      if (repliedByEmail(email, grabbedAt)) repliedByEmailList.push(email)
      if (pastLast.has(email) || salesOfferFor(String(lead.lead_source || ''))) {
        const mineSent = sent.filter((r) => String(r.email).toLowerCase() === email).map((r) => new Date(r.sent_at).getTime())
        const firstSentAt = mineSent.length ? new Date(Math.min(...mineSent)) : grabbedAt
        if (await checkoutStartedSince(email, firstSentAt)) clickedOffer.push(email)
        if (bookedCall(email, firstSentAt)) booked.push(email)
        const gifts = new Set([lead.lead_source, ...crmFirstSource(email), ...sent.filter((r) => String(r.email).toLowerCase() === email).flatMap((r) => [r.source, r.detail?.gift])].filter(Boolean))
        const kwSlug = slugForKeyword(sub?.last_keyword)
        if (kwSlug) gifts.add(kwSlug)
        grabbedGifts.set(email, gifts)
      }
    } catch (err) {
      lookupFailed.add(email)
      console.error(`lookup failed for ${email}, skipping this run: ${err.message}`)
    }
  }

  let { due, skipped } = planFollowups({
    leads: leads.filter((l) => !lookupFailed.has(String(l.email).trim().toLowerCase())),
    sent, subscribers, quizScores, inWorkshopFunnel, suppressed, customers, blocked, repliedByEmail: repliedByEmailList, startAt, now,
    clickedOffer, booked, grabbedGifts,
  })
  if (lookupFailed.size) skipped.lookup_failed = lookupFailed.size
  if (forceStep) {
    const sub = subscribers.get(only)
    const lead = leads.find((l) => String(l.email).toLowerCase() === only)
    const stop = !lead ? 'no lead row' : !sub ? 'not found in ManyChat' : lookupFailed.has(only) ? 'lookup failed' : blocked.includes(only) ? 'close circle / DNC' : suppressed.includes(only) ? 'unsubscribed' : null
    due = stop ? [] : [{ email: only, step: forceStep, level: 'starter', source: lead.lead_source, first_name: sub.name || '', subscriber_id: sub.id, ig_username: sub.ig_username }]
    if (stop) skipped = { [`force_refused: ${stop}`]: 1 }
  }
  console.log(JSON.stringify({ mode: live ? 'live' : 'dry-run', at: now.toISOString(), startAt: startAt.toISOString(), leads: leads.length, due: due.length, skipped }, null, 2))
  for (const item of due) {
    console.log(`${live ? 'SEND' : 'WOULD SEND'} ${item.step}${item.variant ? `/${item.variant}` : ''}${item.gift ? `/${item.gift.slug}` : ''}${item.event ? `/${item.event.id}` : ''} [${item.level}] -> ${item.email}${item.ig_username ? ` @${item.ig_username}` : ''}`)
    if (show) {
      if (item.step.startsWith('email')) { const { subject, text } = renderEmailFor(item); console.log(`  Subject: ${subject}\n${text.split('\n').map((l) => '  | ' + l).join('\n')}\n`) }
      if (item.step === 'dm_level') console.log(renderDmLevel(item.first_name).map((b) => '  > ' + b).join('\n'))
      if (item.step === 'dm_ack') console.log(DM_ACK_BUBBLES.map((b) => '  > ' + b).join('\n'))
      if (item.step === 'dm_human') console.log(`  (no send, Lina pings Illy) reply: ${item.reply_text}`)
    }
  }
  if (!live) return

  const failures = []
  let count = 0
  for (const item of due.slice(0, max)) {
    try {
      const r = await sendOne(item, subscribers.get(item.email))
      if (r.status === 'sent') count++
      console.log(`${item.step} -> ${item.email}: ${r.status}${r.id ? ` ${r.id}` : ''}`)
    } catch (err) {
      failures.push(`${item.email}/${item.step}: ${err.message}`)
      console.error(`FAILED ${item.email}/${item.step}: ${err.message}`)
    }
  }
  console.log(`sent ${count}, failed ${failures.length}`)
  if (failures.length && alert) await lina(`Free-gift follow-ups: ${failures.length} send(s) failed.\n${failures.slice(0, 5).join('\n')}\nLog: ~/.myos/logs/giveaway-followups.log`)
  if (lookupFailed.size && alert) await lina(`Free-gift follow-ups: lookups failed for ${lookupFailed.size} lead(s), they were skipped this run. Log: ~/.myos/logs/giveaway-followups.log`)
}

// Lookups exported for a live smoke check (import does not run main on Node 26).
export { checkoutStartedSince, bookedCall, crmFirstSource, slugForKeyword, stripeBuyer, bonusLink }

if (import.meta.main) main().catch(async (err) => {
  console.error(err.stack || err.message)
  if (alert) await lina(`Free-gift follow-ups crashed: ${err.message}\nLog: ~/.myos/logs/giveaway-followups.log`)
  process.exitCode = 1
})

