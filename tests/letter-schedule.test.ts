import assert from 'node:assert/strict'
import test from 'node:test'

import { getEventBySlug, type EventLetter } from '../src/lib/events'
import { buildLetterConfirmation } from '../src/lib/event-confirmation-email'
import {
  isLetterDue,
  letterAudience,
  letterBodyFor,
  runLetterSchedule,
  type LetterFlags,
  type LetterRecipient,
} from '../src/lib/letter-schedule'

const SLUG = 'make-ai-sound-exactly-like-you'
const event = getEventBySlug(SLUG)!
const letter = (key: string): EventLetter => event.letterSchedule!.find((l) => l.key === key)!

const noFlags = (): LetterFlags => ({ event: new Set(), person: new Map() })
const person = (email: string, registeredAt: string, extra: Partial<LetterRecipient> = {}): LetterRecipient => ({
  attendeeName: 'Ann Lee',
  attendeeEmail: email,
  registeredAt,
  attended: null,
  acquisitionRef: 'email',
  ...extra,
})

test('voice class carries the 7 approved letters (email 5 back 18 Nov) and no default reminders', () => {
  assert.equal(event.calendarEvent?.disableDefaultReminders, true)
  assert.deepEqual(
    event.letterSchedule!.map((l) => l.key),
    ['e2-setup', 'e3-tomorrow', 'e4-one-hour', 'e5-we-started', 'a1-came', 'a1-missed', 'a2-story'],
  )
  for (const l of event.letterSchedule!) {
    assert.ok(!/[—]/.test(l.body + l.subject + l.preview), `${l.key} has an em dash`)
    assert.ok(!/hot seat|rebuild/i.test(l.body), `${l.key} promises hot seats`)
    assert.ok(!/New York|Berlin|Singapore|Bali/.test(l.body), `${l.key} has a city time line`)
    assert.ok(l.body.trim().endsWith('Joe') || l.body.includes('\n\nJoe\n\nP.S.'), `${l.key} not signed Joe`)
  }
})

test('pre-class send times match the approved plan (Bali)', () => {
  assert.equal(letter('e2-setup').sendAtIso, '2026-11-27T17:00:00+08:00')
  assert.equal(letter('e3-tomorrow').sendAtIso, '2026-11-30T16:00:00+08:00')
  assert.equal(letter('e4-one-hour').sendAtIso, '2026-12-01T19:00:00+08:00')
  // the 1-hour email may never land after class starts
  assert.equal(isLetterDue(letter('e4-one-hour'), new Date('2026-12-01T19:50:00+08:00')), false)
  assert.equal(isLetterDue(letter('e4-one-hour'), new Date('2026-12-01T19:10:00+08:00')), true)
})

test('email 2 only goes to people who signed up before Fri 27 Nov 17:00 Bali', () => {
  const r = [
    person('early@x.com', '2026-11-20T00:00:00Z'),
    person('late@x.com', '2026-11-28T00:00:00Z'),
    person('test@x.com', '2026-11-13T00:00:00Z', { acquisitionRef: 'internal-test' }),
  ]
  assert.deepEqual(letterAudience(letter('e2-setup'), r, noFlags()).map((x) => x.attendeeEmail), ['early@x.com'])
})

test('email 3 help line only for early sign-ups who did not reply DONE', () => {
  const flags = noFlags()
  flags.person.set('done@x.com', new Set(['setup_done']))
  const help = 'App not opening yet? Reply to this email and we\'ll help you today.'
  const ask = "What's the first thing you want to write in your voice? Hit reply and tell me."
  assert.ok(letterBodyFor(letter('e3-tomorrow'), person('nodone@x.com', '2026-11-20T00:00:00Z'), flags).includes(help))
  assert.ok(letterBodyFor(letter('e3-tomorrow'), person('done@x.com', '2026-11-20T00:00:00Z'), flags).includes(ask))
  // signed up after email 2 went out: never got the setup email, so no help line
  assert.ok(letterBodyFor(letter('e3-tomorrow'), person('late@x.com', '2026-11-29T00:00:00Z'), flags).includes(ask))
})

test('email 5 goes to EVERYONE at 20:05 Bali, only inside its window (Illy 18 Nov)', () => {
  const e5 = letter('e5-we-started')
  assert.equal(e5.sendAtIso, '2026-12-01T20:05:00+08:00')
  assert.equal(e5.subject, 'We started, jump in')
  assert.equal(e5.body, "Hi {first},\n\nWe just started and we're still getting everyone set up. Jump in now.\n\nJoin the class on Zoom\n\nJoe")
  const r = [person('a@x.com', '2026-11-20T00:00:00Z'), person('dayof@x.com', '2026-12-01T10:00:00Z')]
  assert.equal(letterAudience(e5, r, noFlags()).length, 2)
  assert.equal(isLetterDue(e5, new Date('2026-12-01T20:00:00+08:00')), false)
  assert.equal(isLetterDue(e5, new Date('2026-12-01T20:10:00+08:00')), true)
  assert.equal(isLetterDue(e5, new Date('2026-12-01T20:30:00+08:00')), false)
})

test('after-class letters wait for attendance + recording, split came / missed, honour stop', () => {
  const r = [
    person('came@x.com', '2026-11-20T00:00:00Z', { attended: true }),
    person('missed@x.com', '2026-11-20T00:00:00Z', { attended: false }),
    person('unknown@x.com', '2026-11-20T00:00:00Z', { attended: null }),
  ]
  assert.equal(letterAudience(letter('a1-came'), r, noFlags()).length, 0)
  const flags = noFlags()
  flags.event.add('after_class_ready')
  assert.deepEqual(letterAudience(letter('a1-came'), r, flags).map((x) => x.attendeeEmail), ['came@x.com'])
  assert.deepEqual(
    letterAudience(letter('a1-missed'), r, flags).map((x) => x.attendeeEmail),
    ['missed@x.com', 'unknown@x.com'],
  )
  flags.person.set('came@x.com', new Set(['stop']))
  assert.deepEqual(
    letterAudience(letter('a2-story'), r, flags).map((x) => x.attendeeEmail),
    ['missed@x.com', 'unknown@x.com'],
  )
  assert.equal(letter('a2-story').unsubscribeFooter, true)
  assert.equal(event.letterSchedule!.some((l) => l.key === 'a3-faq'), false)
})

test('letters render as plain letters with their one link', () => {
  const e2 = buildLetterConfirmation(letter('e2-setup'), 'Ann Lee', event.zoomLink, { links: letter('e2-setup').links })
  assert.match(e2.html, /<a href="https:\/\/workshop\.mastermindshq\.business\/voice-setup"[^>]*>Get the app here<\/a>/)
  assert.ok(e2.html.startsWith('<!doctype html>'))
  assert.match(e2.html, /Mac or Windows\. <a href=/)
  assert.doesNotMatch(e2.html, /Georgia|font-weight:bold|max-width/)
  assert.ok(e2.text.includes('Get the app here: https://workshop.mastermindshq.business/voice-setup'))
  assert.ok(e2.text.startsWith('Hi Ann,'))
  // P.S. calendar link added 24 Nov 2026 (Illy): setup link + calendar link.
  assert.equal((e2.html.match(/<a /g) ?? []).length, 2)
  assert.match(e2.html, /P\.S\. <a href="https:\/\/workshop\.mastermindshq\.business\/voice-calendar"[^>]*>Add Tuesday to your calendar here<\/a>\. On Windows/)
  assert.doesNotMatch(e2.html, /<img/)
  const e4 = buildLetterConfirmation(letter('e4-one-hour'), '', event.zoomLink)
  assert.ok(e4.text.startsWith('Hi there,'))
  assert.ok(e4.html.includes(event.zoomLink!.replace(/&/g, '&amp;')))
  const a2 = buildLetterConfirmation(letter('a2-story'), 'Ann', event.zoomLink, {
    links: letter('a2-story').links,
    unsubscribeUrl: 'https://u.example/x',
  })
  assert.match(a2.html, /Unsubscribe<\/a> any time/)
})

test('run sends once per person, retries after a failed send, skips suppressed', async () => {
  const claimed = new Set<string>()
  const sent: string[] = []
  let failNext = true
  const deps = {
    listRegistrations: async () => [
      person('a@x.com', '2026-11-20T00:00:00Z'),
      person('A@x.com ', '2026-11-20T00:00:00Z'),
      person('b@x.com', '2026-11-20T00:00:00Z'),
      person('sup@x.com', '2026-11-20T00:00:00Z'),
    ],
    loadFlags: async () => noFlags(),
    isSuppressed: async (e: string) => e === 'sup@x.com',
    claim: async (k: string) => (claimed.has(k) ? false : (claimed.add(k), true)),
    release: async (k: string) => void claimed.delete(k),
    sendLetter: async (i: { attendeeEmail: string }) => {
      if (i.attendeeEmail === 'b@x.com' && failNext) {
        failNext = false
        throw new Error('resend 500')
      }
      sent.push(i.attendeeEmail)
    },
  }
  const now = new Date('2026-11-27T17:05:00+08:00')
  const first = await runLetterSchedule({ now, events: [event] }, deps)
  assert.equal(first.results.length, 1)
  assert.equal(first.results[0].letterKey, 'e2-setup')
  assert.equal(first.results[0].errors.length, 1)
  await runLetterSchedule({ now: new Date('2026-11-27T17:15:00+08:00'), events: [event] }, deps)
  assert.deepEqual(sent.map((e) => e.trim().toLowerCase()).sort(), ['a@x.com', 'b@x.com'])
  // nothing due on a quiet day
  const quiet = await runLetterSchedule({ now: new Date('2026-11-25T12:00:00+08:00'), events: [event] }, deps)
  assert.equal(quiet.results.length, 0)
})
