import assert from 'node:assert/strict'
import test from 'node:test'
import { buildConfirmationEmailHtml } from '../src/lib/event-confirmation-email'
import { getEventBySlug } from '../src/lib/events'

const event = getEventBySlug('joechella-big-one-december-11-2026')!

test('weekend buyers receive the weekend chat and intake links with clear food planning guidance', () => {
  const html = buildConfirmationEmailHtml(event, 'Casey Lee')
  assert.match(html, /Hey Casey,/)
  assert.ok(html.includes('https://chat.whatsapp.com/G58cN1CwdSLELkdjOxexyA?mode=gi_t'))
  assert.ok(html.includes('https://forms.gle/LRhp7sehzzpMPVtbA'))
  assert.match(html, /just for ticket holders joining us for the weekend/)
  assert.match(html, /guest numbers and prepare food for the weekend/)
  assert.match(html, /preferences, not pre-orders/)
  assert.match(html, /Food and drinks are purchased separately/)
  assert.match(html, /covers Friday, December 11 and Saturday, December 12, 2026/)
  assert.match(html, /either day or both/)
  assert.match(html, /Friday starts at 11 am and Saturday at 1 pm/)
  assert.match(html, /All times are Bali time/)
  assert.match(html, /Bali Beach Glamping, Tabanan, Bali/)
  assert.doesNotMatch(html, /H7XWWyKz6kl85qPTJQCqI9/)
  assert.match(html, /Add to Google Calendar/)
  assert.match(html, /Open Google Maps/)
})

test('weekend confirmation escapes attendee names', () => {
  const html = buildConfirmationEmailHtml(event, '<img src=x>')
  assert.doesNotMatch(html, /Hey <img/)
  assert.match(html, /Hey &lt;img,/)
})

test('other event confirmations keep their existing content and exclude weekend-only links', () => {
  const other = getEventBySlug('connection-dinner-canggu')!
  const html = buildConfirmationEmailHtml(other, 'Casey')
  assert.match(html, /Your seat is reserved/)
  assert.doesNotMatch(html, /G58cN1CwdSLELkdjOxexyA|LRhp7sehzzpMPVtbA|Bring your swimmers/)
})
