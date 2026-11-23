import type { EventDefinition, EventLetter } from '@/lib/events'
import { dedupeAttendeesByEmail } from './location-reminder'

/**
 * Per-event scheduled plain letters (Illy 12-17 Nov 2026: the voice class
 * runs on HER approved letters only, never the site-default reminders).
 *
 * Each letter has a fixed send time and a send window. A cron calls
 * runLetterSchedule every 10 minutes; a letter goes to each matching
 * registrant once, guarded by a per-recipient claim (cron_window_locks).
 *
 * Signals that the site cannot see itself (who replied DONE, who is in Zoom,
 * whether the recording is ready) arrive as rows in event_letter_flags, written
 * by the Studio job agents/events-manager/voice-class-letters/. A letter that
 * needs an event-level gate flag never sends until that flag exists.
 */

export const EVENT_FLAG_EMAIL = '*'

/** What the letter run needs from an event. Site events (EventDefinition) fit it,
 *  and so do letter-only events with no page (src/lib/letter-only-events.ts). */
export type LetterEvent = Pick<EventDefinition, 'slug' | 'zoomLink' | 'letterSchedule'>
const DEFAULT_WINDOW_MINUTES = 120

export type LetterRecipient = {
  attendeeName: string
  attendeeEmail: string
  registeredAt: string | null
  attended: boolean | null
  acquisitionRef: string | null
}

export type LetterFlags = {
  /** event-level flags (email '*') */
  event: Set<string>
  /** per-person flags, keyed by lower-case email */
  person: Map<string, Set<string>>
}

export function isLetterDue(letter: EventLetter, now: Date): boolean {
  const start = new Date(letter.sendAtIso).getTime()
  const end = start + (letter.windowMinutes ?? DEFAULT_WINDOW_MINUTES) * 60 * 1000
  const t = now.getTime()
  return t >= start && t < end
}

function personHas(flags: LetterFlags, email: string, flag: string): boolean {
  return flags.person.get(email.trim().toLowerCase())?.has(flag) ?? false
}

/** Who gets this letter. Pure, so tests can pin every audience rule. */
export function letterAudience(
  letter: EventLetter,
  recipients: LetterRecipient[],
  flags: LetterFlags,
): LetterRecipient[] {
  const a = letter.audience ?? {}
  if (a.requiresEventFlag && !flags.event.has(a.requiresEventFlag)) return []
  return recipients.filter((r) => {
    if (r.acquisitionRef === 'internal-test') return false
    if (a.signedUpBeforeIso) {
      if (!r.registeredAt) return false
      if (new Date(r.registeredAt).getTime() >= new Date(a.signedUpBeforeIso).getTime()) return false
    }
    if (a.attended === true && r.attended !== true) return false
    if (a.attended === false && r.attended === true) return false
    if (a.excludePersonFlag && personHas(flags, r.attendeeEmail, a.excludePersonFlag)) return false
    for (const stop of a.stopFlags ?? []) {
      if (personHas(flags, r.attendeeEmail, stop)) return false
    }
    return true
  })
}

/** Picks the body: a variant applies when the person lacks its flag. */
export function letterBodyFor(letter: EventLetter, recipient: LetterRecipient, flags: LetterFlags): string {
  for (const v of letter.variants ?? []) {
    if (v.onlyIfSignedUpBeforeIso) {
      if (!recipient.registeredAt) continue
      if (new Date(recipient.registeredAt).getTime() >= new Date(v.onlyIfSignedUpBeforeIso).getTime()) continue
    }
    if (!personHas(flags, recipient.attendeeEmail, v.whenPersonLacksFlag)) return v.body
  }
  return letter.body
}

export function buildLetterClaimKey(slug: string, letterKey: string, email: string): string {
  return `letter/${slug}/${letterKey}/${email.trim().toLowerCase()}`
}

export type LetterRunResult = {
  slug: string
  letterKey: string
  audienceCount: number
  sentCount: number
  skippedCount: number
  dryRun: boolean
  errors: string[]
}

export type RunLetterScheduleDeps = {
  listRegistrations: (slug: string) => Promise<LetterRecipient[]>
  loadFlags: (slug: string) => Promise<LetterFlags>
  isSuppressed: (email: string) => Promise<boolean>
  claim: (key: string) => Promise<boolean>
  release: (key: string) => Promise<void>
  sendLetter: (input: {
    event: LetterEvent
    letter: EventLetter
    body: string
    attendeeName: string
    attendeeEmail: string
    idempotencyKey: string
  }) => Promise<unknown>
}

export async function runLetterSchedule(
  input: { now: Date; events: LetterEvent[]; dryRun?: boolean; onlyLetterKey?: string | null; force?: boolean },
  deps: RunLetterScheduleDeps,
): Promise<{ results: LetterRunResult[] }> {
  const results: LetterRunResult[] = []
  const dryRun = input.dryRun === true

  for (const event of input.events) {
    const letters = event.letterSchedule ?? []
    const due = letters.filter((l) =>
      input.onlyLetterKey ? l.key === input.onlyLetterKey && (input.force || isLetterDue(l, input.now)) : isLetterDue(l, input.now),
    )
    if (due.length === 0) continue

    const recipients = dedupeAttendeesByEmail(await deps.listRegistrations(event.slug))
    const flags = await deps.loadFlags(event.slug)

    for (const letter of due) {
      const audience = letterAudience(letter, recipients, flags)
      const result: LetterRunResult = {
        slug: event.slug,
        letterKey: letter.key,
        audienceCount: audience.length,
        sentCount: 0,
        skippedCount: 0,
        dryRun,
        errors: [],
      }

      for (const r of audience) {
        const key = buildLetterClaimKey(event.slug, letter.key, r.attendeeEmail)
        try {
          if (await deps.isSuppressed(r.attendeeEmail)) {
            result.skippedCount += 1
            continue
          }
          if (dryRun) {
            result.sentCount += 1
            continue
          }
          if (!(await deps.claim(key))) {
            result.skippedCount += 1
            continue
          }
          try {
            await deps.sendLetter({
              event,
              letter,
              body: letterBodyFor(letter, r, flags),
              attendeeName: r.attendeeName,
              attendeeEmail: r.attendeeEmail,
              idempotencyKey: key,
            })
            result.sentCount += 1
          } catch (error) {
            // Free the slot so the next run (10 min later, still in the window) retries.
            await deps.release(key).catch(() => {})
            throw error
          }
        } catch (error) {
          result.errors.push(`${r.attendeeEmail}: ${error instanceof Error ? error.message : 'Unknown error.'}`)
        }
      }
      results.push(result)
    }
  }
  return { results }
}
