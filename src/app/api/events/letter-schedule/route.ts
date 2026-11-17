import { NextResponse, type NextRequest } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { getEventBySlug, getLiveEvents } from '@/lib/events'
import { sendScheduledLetter } from '@/lib/event-confirmation-email'
import { isSuppressed } from '@/lib/email-suppressions'
import { EVENT_FLAG_EMAIL, runLetterSchedule, type LetterFlags, type LetterRecipient } from '@/lib/letter-schedule'
import { supabase } from '@/lib/supabase'

export const runtime = 'nodejs'

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim()
  if (!secret) return false
  const expected = `Bearer ${secret}`
  const provided = request.headers.get('authorization') ?? ''
  if (provided.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected))
}

// Throws on a read error: an empty list must never be mistaken for "no one".
async function listRegistrations(slug: string): Promise<LetterRecipient[]> {
  const { data, error } = await supabase
    .from('event_registrations')
    .select('attendee_name, attendee_email, registered_at, attended, acquisition_ref')
    .eq('event_slug', slug)
    .eq('status', 'confirmed')
  if (error) throw new Error(`registrations read error: ${error.message}`)
  return (data ?? []).map((row) => ({
    attendeeName: row.attendee_name,
    attendeeEmail: row.attendee_email,
    registeredAt: row.registered_at,
    attended: row.attended,
    acquisitionRef: row.acquisition_ref,
  }))
}

async function loadFlags(slug: string): Promise<LetterFlags> {
  const { data, error } = await supabase.from('event_letter_flags').select('email, flag').eq('event_slug', slug)
  if (error) throw new Error(`letter flags read error: ${error.message}`)
  const flags: LetterFlags = { event: new Set(), person: new Map() }
  for (const row of data ?? []) {
    if (row.email === EVENT_FLAG_EMAIL) {
      flags.event.add(row.flag)
      continue
    }
    const email = String(row.email).trim().toLowerCase()
    if (!flags.person.has(email)) flags.person.set(email, new Set())
    flags.person.get(email)!.add(row.flag)
  }
  return flags
}

async function claim(key: string) {
  const { error } = await supabase.from('cron_window_locks').insert({ lock_key: key })
  if (!error) return true
  if (error.code === '23505') return false
  throw new Error(`claim error: ${error.message}`)
}

async function release(key: string) {
  await supabase.from('cron_window_locks').delete().eq('lock_key', key)
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(request.url)
  const nowParam = url.searchParams.get('now')
  const slug = url.searchParams.get('slug')
  const letterKey = url.searchParams.get('letter')
  const dryRun = url.searchParams.get('dryRun') === '1'
  const force = url.searchParams.get('force') === '1'
  const now = nowParam ? new Date(nowParam) : new Date()
  if (Number.isNaN(now.getTime())) {
    return NextResponse.json({ error: 'Invalid now parameter.' }, { status: 400 })
  }

  const events = slug
    ? ([getEventBySlug(slug)].filter(Boolean) as ReturnType<typeof getLiveEvents>)
    : getLiveEvents()

  try {
    const run = await runLetterSchedule(
      { now, events, dryRun, onlyLetterKey: letterKey, force },
      { listRegistrations, loadFlags, isSuppressed, claim, release, sendLetter: sendScheduledLetter },
    )
    return NextResponse.json({ ok: true, now: now.toISOString(), dryRun, results: run.results })
  } catch (error) {
    console.error('[letter-schedule] run failed', error)
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unknown error.' }, { status: 500 })
  }
}
