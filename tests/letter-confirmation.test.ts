import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildLetterConfirmation } from '../src/lib/event-confirmation-email'
import { getEventBySlug } from '../src/lib/events'

const ZOOM = 'https://us02web.zoom.us/j/1?pwd=x'

test('letter fills first name, links Zoom once, no images or buttons', () => {
  const { html, text } = buildLetterConfirmation(
    { subject: 's', preview: 'p', body: 'Hi {first},\n\nJoin the class on Zoom\n\nJoe' },
    'Illy Helianthi',
    ZOOM,
  )
  assert.match(html, /Hi Illy,/)
  assert.equal(html.split(ZOOM).length - 1, 1)
  assert.doesNotMatch(html, /<img|<button|<table/i)
  assert.match(text, /Join the class on Zoom: https:\/\/us02web/)
})

test('missing name falls back to "there" and names are escaped', () => {
  assert.match(buildLetterConfirmation({ subject: 's', preview: 'p', body: 'Hi {first},' }, '', ZOOM).html, /Hi there,/)
  assert.doesNotMatch(buildLetterConfirmation({ subject: 's', preview: 'p', body: 'Hi {first},' }, '<b>x', ZOOM).html, /<b>x/)
})

test('voice class uses the approved letter, silent Google invite, no em dashes, no hot seats', () => {
  const event = getEventBySlug('make-ai-sound-exactly-like-you')
  assert.ok(event)
  const letter = event!.emailConfig?.letterConfirmation
  assert.ok(letter)
  assert.equal(letter!.subject, "You're in. Tuesday 1 Dec")
  assert.equal(event!.calendarEvent?.silentGoogleInvite, true)
  assert.doesNotMatch(letter!.body, /—|hot seat|rebuild|read every reply|Singapore|New York/)
})
