import assert from 'node:assert/strict'
import test from 'node:test'

import {
  events,
  getLiveEvents,
  getEventBySlug,
  resolvePromoCode,
  formatEventPrice,
  formatDonationLabelNote,
  toggleDonationPreset,
} from '../src/lib/events'
import { POST } from '../src/app/api/events/checkout-session/route'
import { buildConfirmationEmailHtml } from '../src/lib/event-confirmation-email'
import { isEventEnded } from '../src/lib/event-status'
import { resolveNotifyWindow, hoursUntilEvent } from '../src/lib/waitlist-notify-windows'
import { toOrigin } from '../src/lib/url-utils'

// ─── Event data integrity ──────────────────────────────────────────────────────

test('no two events share the same slug', () => {
  const slugs = events.map((e) => e.slug)
  const unique = new Set(slugs)
  assert.equal(unique.size, slugs.length, `Duplicate slugs found: ${slugs.join(', ')}`)
})

test('all live events have required string fields', () => {
  for (const event of getLiveEvents()) {
    assert.ok(event.slug, `${event.slug}: missing slug`)
    assert.ok(event.title, `${event.slug}: missing title`)
    assert.ok(event.dateLabel, `${event.slug}: missing dateLabel`)
    assert.ok(event.timeLabel, `${event.slug}: missing timeLabel`)
    assert.ok(event.locationLabel, `${event.slug}: missing locationLabel`)
    assert.ok(event.heroImage, `${event.slug}: missing heroImage`)
  }
})

test('all live events have valid calendar start and end times for automatic closure', () => {
  for (const event of getLiveEvents()) {
    assert.ok(event.calendarEvent?.startIso, `${event.slug}: missing calendarEvent.startIso`)
    assert.ok(event.calendarEvent?.endIso, `${event.slug}: missing calendarEvent.endIso`)

    const startMs = new Date(event.calendarEvent.startIso).getTime()
    const endMs = new Date(event.calendarEvent.endIso).getTime()

    assert.ok(Number.isFinite(startMs), `${event.slug}: invalid calendarEvent.startIso`)
    assert.ok(Number.isFinite(endMs), `${event.slug}: invalid calendarEvent.endIso`)
    assert.ok(endMs > startMs, `${event.slug}: calendarEvent.endIso must be after startIso`)
  }
})

test('connection dinner has capacity and emailConfig set', () => {
  const dinner = getEventBySlug('connection-dinner-canggu')
  assert.ok(dinner, 'connection dinner event must exist')
  assert.ok(typeof dinner.capacity === 'number' && dinner.capacity > 0, 'must have positive capacity')
  assert.ok(dinner.emailConfig, 'must have emailConfig')
  assert.equal(dinner.emailConfig?.headerLabel, null, 'header should be suppressed (null)')
  assert.ok(dinner.emailConfig?.mapsUrl, 'must have a Google Maps URL')
  assert.equal(dinner.emailConfig?.skipSetupInstructions, true, 'must skip setup instructions')
})

test('October connection dinner is open for donation-based registration', () => {
  const dinner = getEventBySlug('joe-ches-connection-dinner-sunday-october-04-2026')
  assert.ok(dinner, 'October connection dinner event must exist')
  assert.equal(dinner.calendarEvent?.startIso, '2026-10-04T18:00:00+08:00')
  assert.equal(dinner.calendarEvent?.endIso, '2026-10-04T21:00:00+08:00')
  assert.equal(dinner.manuallyClosed, false)
  assert.equal(dinner.pricing.donationMode, true)
  assert.equal(dinner.pricing.minDonation, 0)
  assert.deepEqual(dinner.capacityReservation, { holdMinutes: 30 })
})

test('donation-mode events have minDonation defined', () => {
  for (const event of events) {
    if (event.pricing.donationMode) {
      assert.ok(
        typeof event.pricing.minDonation === 'number',
        `${event.slug}: donationMode event must have minDonation`,
      )
    }
  }
})

test('all promo codes within an event are unique (case-insensitive)', () => {
  for (const event of events) {
    const codes = (event.pricing.promoCodes ?? []).map((p) => p.code.toUpperCase())
    const unique = new Set(codes)
    assert.equal(unique.size, codes.length, `${event.slug}: duplicate promo codes`)
  }
})

// ─── resolvePromoCode ──────────────────────────────────────────────────────────

test('resolvePromoCode finds a code case-insensitively', () => {
  const event = getEventBySlug('ai-avatar-content-creation')
  assert.ok(event)

  const promo = resolvePromoCode(event, 'helix33')
  assert.ok(promo, 'should resolve lowercase "helix33"')
  assert.equal(promo.code, 'helix33')
  assert.equal(promo.percentOff, 33)
})

test('resolvePromoCode matches regardless of input case', () => {
  const event = getEventBySlug('ai-avatar-content-creation')
  assert.ok(event)

  const lower = resolvePromoCode(event, 'helix33')
  const upper = resolvePromoCode(event, 'HELIX33')
  const mixed = resolvePromoCode(event, 'Helix33')

  assert.ok(lower && upper && mixed)
  assert.equal(lower.code, upper.code)
  assert.equal(lower.code, mixed.code)
})

test('resolvePromoCode returns null for an unknown code', () => {
  const event = getEventBySlug('ai-avatar-content-creation')
  assert.ok(event)
  assert.equal(resolvePromoCode(event, 'NOTACODE'), null)
})

test('resolvePromoCode returns null for empty or whitespace input', () => {
  const event = getEventBySlug('ai-avatar-content-creation')
  assert.ok(event)
  assert.equal(resolvePromoCode(event, ''), null)
  assert.equal(resolvePromoCode(event, '   '), null)
})

test('resolvePromoCode returns null for events with no promo codes', () => {
  const dinner = getEventBySlug('connection-dinner-canggu')
  assert.ok(dinner)
  assert.equal(resolvePromoCode(dinner, 'anything'), null)
})

// ─── formatEventPrice ──────────────────────────────────────────────────────────

test('formatEventPrice returns the full price when no promo is applied', () => {
  const event = getEventBySlug('ai-avatar-content-creation')
  assert.ok(event)
  assert.equal(formatEventPrice(event), '$97')
})

test('formatEventPrice applies percentOff correctly', () => {
  const event = getEventBySlug('ai-avatar-content-creation')
  assert.ok(event)
  const promo = resolvePromoCode(event, 'Mastermind50')
  assert.ok(promo)
  // $97 - 50% = $48.50 (two decimal places for non-integers)
  assert.equal(formatEventPrice(event, promo), '$48.50')
})

test('formatEventPrice applies 100% off (free ticket)', () => {
  const event = getEventBySlug('ai-avatar-content-creation')
  assert.ok(event)
  const promo = resolvePromoCode(event, 'Guest100')
  assert.ok(promo)
  assert.equal(formatEventPrice(event, promo), '$0')
})

test('formatEventPrice never returns a negative price', () => {
  const event = getEventBySlug('ai-avatar-content-creation')
  assert.ok(event)
  // Synthetic over-discount: amountOff greater than the full price
  const bigDiscount = { code: 'BIG', label: 'Big', description: '', amountOff: 9999 }
  assert.equal(formatEventPrice(event, bigDiscount), '$0')
})

test('isEventEnded detects events after their calendar end time', () => {
  const dinner = getEventBySlug('connection-dinner-canggu')
  assert.ok(dinner)
  assert.equal(isEventEnded(dinner, new Date('2026-05-27T12:59:59.000Z')), false)
  assert.equal(isEventEnded(dinner, new Date('2026-05-27T13:00:00.000Z')), true)
})

// ─── Cron notify window detection ─────────────────────────────────────────────

const EVENT_START = '2026-05-27T18:00:00+08:00' // 10:00 UTC

function nowAt(hoursBeforeEvent: number): Date {
  const eventMs = new Date(EVENT_START).getTime()
  return new Date(eventMs - hoursBeforeEvent * 60 * 60 * 1000)
}

test('hoursUntilEvent returns the correct fractional hours', () => {
  const now = nowAt(5)
  const hours = hoursUntilEvent(EVENT_START, now)
  assert.ok(Math.abs(hours - 5) < 0.001, `expected ~5, got ${hours}`)
})

test('resolveNotifyWindow returns t5h at exactly 5h before the event', () => {
  const win = resolveNotifyWindow(EVENT_START, nowAt(5))
  assert.ok(win)
  assert.equal(win.windowLabel, 't5h')
  assert.equal(win.variant, 'cancellation')
})

test('resolveNotifyWindow returns t5h at the start of the window (4.5h)', () => {
  const win = resolveNotifyWindow(EVENT_START, nowAt(4.5))
  assert.ok(win)
  assert.equal(win.windowLabel, 't5h')
})

test('resolveNotifyWindow returns null just outside the t5h window (5.5h)', () => {
  // Exactly at the boundary — the window is [4.5, 5.5), so 5.5 is outside
  const win = resolveNotifyWindow(EVENT_START, nowAt(5.5))
  assert.equal(win, null)
})

test('resolveNotifyWindow returns null between the two windows (3h before)', () => {
  const win = resolveNotifyWindow(EVENT_START, nowAt(3))
  assert.equal(win, null)
})

test('resolveNotifyWindow returns t2h at exactly 2h before the event', () => {
  const win = resolveNotifyWindow(EVENT_START, nowAt(2))
  assert.ok(win)
  assert.equal(win.windowLabel, 't2h')
  assert.equal(win.variant, 't2h')
})

test('resolveNotifyWindow returns t2h at the start of the window (1.5h)', () => {
  const win = resolveNotifyWindow(EVENT_START, nowAt(1.5))
  assert.ok(win)
  assert.equal(win.windowLabel, 't2h')
})

test('resolveNotifyWindow returns null just outside the t2h window (2.5h)', () => {
  const win = resolveNotifyWindow(EVENT_START, nowAt(2.5))
  assert.equal(win, null)
})

test('resolveNotifyWindow returns null after the event has started', () => {
  const win = resolveNotifyWindow(EVENT_START, nowAt(-1))
  assert.equal(win, null)
})

// ─── URL / origin parsing ──────────────────────────────────────────────────────

test('toOrigin extracts origin from a full URL', () => {
  assert.equal(toOrigin('https://workshop.mastermindshq.business/events/foo'), 'https://workshop.mastermindshq.business')
})

test('toOrigin handles a URL with a port', () => {
  assert.equal(toOrigin('http://localhost:3000/foo'), 'http://localhost:3000')
})

test('toOrigin adds https:// when the scheme is missing', () => {
  assert.equal(toOrigin('workshop.mastermindshq.business'), 'https://workshop.mastermindshq.business')
})

test('toOrigin returns null for null/empty input', () => {
  assert.equal(toOrigin(null), null)
  assert.equal(toOrigin(''), null)
  assert.equal(toOrigin(undefined), null)
})

test('toOrigin returns null for garbage input', () => {
  assert.equal(toOrigin('not a url at all !!'), null)
})

// ─── Donation presets, label formatting, and server min enforcement ────────────

test('formatDonationLabelNote renders Connection Dinner label with a comma and no em dash', () => {
  const dinner = getEventBySlug('connection-dinner-canggu')
  assert.ok(dinner)
  const note = formatDonationLabelNote(dinner.pricing)
  assert.equal(note, '(suggested: $10, minimum: $0)')
  assert.ok(!note.includes('—'), 'must not contain an em dash')

  const octDinner = getEventBySlug('joe-ches-connection-dinner-sunday-october-04-2026')
  assert.ok(octDinner)
  assert.equal(formatDonationLabelNote(octDinner.pricing), '(suggested: $10, minimum: $0)')
})

test('formatDonationLabelNote uses custom donationLabelNote when set', () => {
  const joechella = getEventBySlug('joechella-big-one-december-11-2026')
  assert.ok(joechella)
  assert.equal(formatDonationLabelNote(joechella.pricing), '(minimum IDR 200K, about $12)')
  assert.ok(!formatDonationLabelNote(joechella.pricing).includes('—'))
})

test('toggleDonationPreset adds and removes preset amounts and clamps to minDonation', () => {
  // Base $12, click +$33 -> $45
  const step1 = toggleDonationPreset({
    currentDonation: 12,
    minDonation: 12,
    presetAmount: 33,
    isSelected: false,
  })
  assert.deepEqual(step1, { nextDonation: 45, nextSelected: true })

  // Click +$83 on top -> $128
  const step2 = toggleDonationPreset({
    currentDonation: step1.nextDonation,
    minDonation: 12,
    presetAmount: 83,
    isSelected: false,
  })
  assert.deepEqual(step2, { nextDonation: 128, nextSelected: true })

  // Toggle off $33 -> $95
  const step3 = toggleDonationPreset({
    currentDonation: step2.nextDonation,
    minDonation: 12,
    presetAmount: 33,
    isSelected: true,
  })
  assert.deepEqual(step3, { nextDonation: 95, nextSelected: false })

  // Toggle off $83 when user manually lowered input to $20 -> clamps to minDonation ($12)
  const step4 = toggleDonationPreset({
    currentDonation: 20,
    minDonation: 12,
    presetAmount: 83,
    isSelected: true,
  })
  assert.deepEqual(step4, { nextDonation: 12, nextSelected: false })
})

test('server checkout-session route rejects a donation below minDonation with 400', async () => {
  const response = await POST(
    new Request('https://workshop.mastermindshq.business/api/events/checkout-session', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': '203.0.113.42',
      },
      body: JSON.stringify({
        slug: 'joechella-big-one-december-11-2026',
        attendeeName: 'Test Guest',
        attendeeEmail: 'guest@example.com',
        donationAmount: 5,
      }),
    }),
  )

  assert.equal(response.status, 400)
  const payload = await response.json()
  assert.match(String(payload.error), /at least \$12/i)
})

test('Joechella event has expected configuration and no dinner-specific copy or em dashes', () => {
  const event = getEventBySlug('joechella-big-one-december-11-2026')
  assert.ok(event, 'Joechella event must exist')
  assert.equal(event.status, 'live')
  assert.equal(event.pricing.donationMode, true)
  assert.equal(event.pricing.fullPrice, 12)
  assert.equal(event.pricing.minDonation, 12)
  assert.equal(event.pricing.donationPresets?.length, 2)
  assert.equal(event.capacity, undefined)
  assert.equal(event.capacityReservation, undefined)
  assert.equal(event.manuallyClosed, false)
  assert.equal(event.privateLocationReminder, undefined)
  assert.equal(event.calendarEvent?.googleCalendarEventId, undefined)
  assert.equal(
    event.emailConfig?.mapsUrl,
    'https://www.google.com/maps/search/?api=1&query=Bali+Beach+Glamping+Tabanan',
  )
  assert.equal(event.emailConfig?.signatureName, 'Joe Che')

  const serialized = JSON.stringify(event)
  const emailHtml = buildConfirmationEmailHtml(event, 'Test Guest', 'tok_123')
  const combined = `${serialized}\n${emailHtml}`

  assert.ok(!combined.includes('—'), 'Joechella copy must not contain any em dashes')
  assert.doesNotMatch(combined, /Mostly/i, 'must not mention Mostly Restaurant')
  assert.doesNotMatch(combined, /dress code|flip-flops/i, 'must not include dinner dress code')
  assert.doesNotMatch(combined, /VIP status/i, 'must not mention VIP status')
  assert.doesNotMatch(combined, /doors close at 6:30/i, 'must not mention 6:30 doors')
})

test('mobile hero video fields point at small local files and stay opt-in', async () => {
  const { statSync } = await import('node:fs')
  const { join } = await import('node:path')

  const event = getEventBySlug('joechella-big-one-december-11-2026')
  assert.ok(event?.heroVideoMobileSrc, 'Joechella must set a phone hero video')
  assert.ok(event.heroVideoMobilePoster, 'Joechella must set a phone hero poster')
  assert.notEqual(event.heroVideoMobileSrc, event.heroVideoSrc)

  const video = statSync(join(process.cwd(), 'public', event.heroVideoMobileSrc))
  const poster = statSync(join(process.cwd(), 'public', event.heroVideoMobilePoster))
  assert.ok(video.size < 1.5 * 1024 * 1024, `phone hero video must stay under 1.5 MB, got ${video.size}`)
  assert.ok(poster.size < 100 * 1024, `phone hero poster must stay under 100 KB, got ${poster.size}`)

  // A <video poster> skips next/image and loads at page load on every viewport,
  // so the bloom gallery poster has to be a pre-sized file.
  const bloom = event.sections?.find((section) => section.type === 'gallery' && section.id === 'bloom')
  assert.ok(bloom && bloom.type === 'gallery' && bloom.video, 'Joechella bloom gallery video must exist')
  const galleryPoster = statSync(join(process.cwd(), 'public', bloom.video.poster))
  assert.ok(galleryPoster.size < 200 * 1024, `bloom gallery poster must stay under 200 KB, got ${galleryPoster.size}`)

  for (const other of events) {
    if (other.slug === event.slug) continue
    assert.equal(other.heroVideoMobileSrc, undefined, `${other.slug} must not gain a phone hero video`)
    assert.equal(other.heroVideoMobilePoster, undefined, `${other.slug} must not gain a phone hero poster`)
  }
})
