import assert from 'node:assert/strict'
import test from 'node:test'

import { getEventBySlug } from '../src/lib/events'
import { getLetterOnlyEvent, letterOnlyEvents, MAVEN_VOICE_LESSON_SLUG } from '../src/lib/letter-only-events'
import { letterAudience, runLetterSchedule, type LetterFlags, type LetterRecipient } from '../src/lib/letter-schedule'

const maven = getLetterOnlyEvent(MAVEN_VOICE_LESSON_SLUG)!
const voice = getEventBySlug('make-ai-sound-exactly-like-you')!
const m = (key: string) => maven.letterSchedule!.find((l) => l.key === key)!
const v = (key: string) => voice.letterSchedule!.find((l) => l.key === key)!

const flags = (event: string[] = [], person: Record<string, string[]> = {}): LetterFlags => ({
  event: new Set(event),
  person: new Map(Object.entries(person).map(([k, f]) => [k, new Set(f)])),
})
const who = (email: string, registeredAt = '2027-01-10T10:00:00+08:00'): LetterRecipient => ({
  attendeeName: 'Ann Lee',
  attendeeEmail: email,
  registeredAt,
  attended: null,
  acquisitionRef: 'maven',
})

test('letter-only events never collide with a site page slug', () => {
  for (const e of letterOnlyEvents) assert.equal(getEventBySlug(e.slug), undefined)
})

test('Maven lesson carries exactly the 4 letters Maven does not send itself', () => {
  assert.deepEqual(maven.letterSchedule!.map((l) => l.key), ['e2-setup', 'e3-tomorrow', 'e5-we-started', 'a2-story'])
  assert.match(maven.zoomLink!, /87862308220\?pwd=/)
})

test('word-for-word letters match the approved 1 Dec text', () => {
  for (const key of ['e5-we-started', 'a2-story']) {
    assert.equal(m(key).subject, v(key).subject)
    assert.equal(m(key).preview, v(key).preview)
    assert.equal(m(key).body, v(key).body)
  }
  assert.deepEqual(m('a2-story').links, v('a2-story').links)
  assert.equal(m('a2-story').unsubscribeFooter, true)
})

test('browser-lesson letters wait for copy_approved', () => {
  const people = [who('a@x.com')]
  for (const key of ['e2-setup', 'e3-tomorrow']) {
    assert.equal(letterAudience(m(key), people, flags()).length, 0)
    assert.equal(letterAudience(m(key), people, flags(['copy_approved'])).length, 1)
    assert.doesNotMatch(m(key).body, /app open|desktop app|Get the app/)
  }
})

test('a2 waits for the stop check and skips stopped people', () => {
  const people = [who('a@x.com'), who('b@x.com')]
  assert.equal(letterAudience(m('a2-story'), people, flags()).length, 0)
  const got = letterAudience(m('a2-story'), people, flags(['stop_checked'], { 'b@x.com': ['stop'] }))
  assert.deepEqual(got.map((r) => r.attendeeEmail), ['a@x.com'])
})

test('e5 goes to everyone at 21:05 on the night', async () => {
  const sent: string[] = []
  const run = await runLetterSchedule(
    { now: new Date('2027-01-26T21:06:00+08:00'), events: letterOnlyEvents },
    {
      listRegistrations: async () => [who('a@x.com'), who('b@x.com')],
      loadFlags: async () => flags(),
      isSuppressed: async (e) => e === 'b@x.com',
      claim: async () => true,
      release: async () => {},
      sendLetter: async (i) => {
        sent.push(`${i.letter.key}:${i.attendeeEmail}`)
      },
    },
  )
  assert.deepEqual(sent, ['e5-we-started:a@x.com'])
  assert.equal(run.results[0].skippedCount, 1)
})
