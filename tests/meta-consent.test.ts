import assert from 'node:assert/strict'
import test from 'node:test'
import { buildEventCheckoutSessionParams } from '../src/lib/event-checkout'
import { getEventBySlug } from '../src/lib/events'
import { buildMetaCheckoutMetadata, cookieDomainFor, extractFbclid, isConsentRequiredCountry, isLocalHost, parseCookieHeader, pickConsentValue, resolveServerConsentState, serializeCookie, stripeAmountToMajor } from '../src/lib/meta-consent'
import { NextRequest } from 'next/server'
import { proxy } from '../src/proxy'
import { ensureFbqStub, fetchAndTrackPurchase, initPixelsOnce, loadFbeventsOnce, trackMeta, trackPurchaseOnce } from '../src/lib/meta-pixel'

test('Meta checkout metadata stays session-only and preserves existing metadata', () => {
  const event = getEventBySlug('ai-avatar-content-creation')
  assert.ok(event)
  const input = { event, attendeeName: 'Test Buyer', attendeeEmail: 'buyer@example.com', amount: 10, promo: null, baseUrl: 'https://workshop.mastermindshq.business', mode: 'hosted' as const }
  const original = buildEventCheckoutSessionParams(input)
  const expected = { event_slug: event.slug, attendee_name: input.attendeeName, attendee_email: input.attendeeEmail, promo_code: '' }
  assert.deepEqual(original.metadata, expected)
  assert.deepEqual(original.payment_intent_data?.metadata, expected)
  const enriched = buildEventCheckoutSessionParams({ ...input, metaMetadata: { meta_consent: 'granted', meta_fbp: 'fb.1.test', event_slug: 'override' } })
  assert.equal(enriched.metadata?.meta_consent, 'granted')
  assert.equal(enriched.metadata?.meta_fbp, 'fb.1.test')
  assert.equal(enriched.metadata?.event_slug, event.slug)
  assert.deepEqual(enriched.payment_intent_data?.metadata, expected)
})


test('consent-required country detection normalizes input and fails safe for missing countries', () => {
  for (const country of ['DE', 'GB', 'CH', 'NO', ' de ', '', null, undefined, 'XX', 'ZZ', 'unknown']) assert.equal(isConsentRequiredCountry(country), true)
  for (const country of ['US', 'ID', ' us ']) assert.equal(isConsentRequiredCountry(country), false)
})

test('local host detection and cookie domains handle ports, casing and boundaries', () => {
  for (const host of ['localhost:3000', '127.0.0.1', '[::1]:3000', 'preview.localhost']) assert.equal(isLocalHost(host), true)
  for (const host of ['localhost.example.com', 'notlocalhost', null]) assert.equal(isLocalHost(host), false)
  assert.equal(cookieDomainFor('MASTERMINDSHQ.BUSINESS:443'), '.mastermindshq.business')
  assert.equal(cookieDomainFor('evilmastermindshq.business'), null)
})

test('server consent matrix: explicit choice first, then country header, then region cookie', () => {
  const resolve = (host: string, country: string | null, crCookie?: string, consentCookie?: string) => resolveServerConsentState({ host, country, crCookie, consentCookie })
  assert.equal(resolve('localhost:3000', 'DE'), 'not_required')
  assert.equal(resolve('workshop.mastermindshq.business', 'US'), 'not_required')
  assert.equal(resolve('example.com', 'DE'), 'unknown')
  assert.equal(resolve('example.com', 'DE', undefined, 'granted'), 'granted')
  assert.equal(resolve('example.com', 'DE', undefined, 'denied'), 'denied')
  assert.equal(resolve('example.com', null, '0'), 'not_required')
  assert.equal(resolve('example.com', null), 'unknown')
  assert.equal(resolve('example.com', '', '0'), 'unknown')
  assert.equal(resolve('example.com', 'DE', '0'), 'unknown')
  assert.equal(resolve('workshop.mastermindshq.business', 'US', '0', 'denied'), 'denied')
  assert.equal(resolve('workshop.mastermindshq.business', 'US', '1'), 'unknown')
  assert.equal(resolve('workshop.mastermindshq.business', 'US', '0', 'granted'), 'granted')
})

test('serialized cookies use the correct domain, lifetime and Secure attribute', () => {
  for (const host of ['workshop.mastermindshq.business', 'passiveincome.mastermindshq.business']) {
    assert.equal(serializeCookie('mhq_consent', 'granted', { host, maxAge: 15552000 }), 'mhq_consent=granted; Max-Age=15552000; Domain=.mastermindshq.business; Path=/; SameSite=Lax; Secure')
  }
  assert.equal(serializeCookie('mhq_cr', '1', { host: 'workshop-site.vercel.app', maxAge: 86400 }), 'mhq_cr=1; Max-Age=86400; Path=/; SameSite=Lax; Secure')
  assert.equal(serializeCookie('mhq_cr', '0', { host: 'localhost:3000', maxAge: 86400 }), 'mhq_cr=0; Max-Age=86400; Path=/; SameSite=Lax')
})

test('cookie parsing preserves duplicates and safely decodes values', () => {
  const cookies = parseCookieHeader('mhq_consent=granted; mhq_consent=denied; token=a%3Db; malformed=%ZZ')
  assert.deepEqual(cookies.get('mhq_consent'), ['granted', 'denied'])
  assert.equal(pickConsentValue(cookies.get('mhq_consent')), 'denied')
  assert.equal(pickConsentValue(['granted', 'granted']), 'granted')
  assert.equal(pickConsentValue(undefined), undefined)
  assert.equal(cookies.get('token')?.[0], 'a=b')
  assert.equal(cookies.get('malformed')?.[0], '%ZZ')
})

test('Stripe amounts respect zero-decimal currencies and lowercase codes', () => {
  assert.equal(stripeAmountToMajor(100, 'USD'), 1)
  assert.equal(stripeAmountToMajor(4850, 'usd'), 48.5)
  assert.equal(stripeAmountToMajor(5000, 'JPY'), 5000)
})

test('fbclid extraction accepts relative URLs and bounds the first value', () => {
  assert.equal(extractFbclid([null, 'https://example.com', '?fbclid=first', '?fbclid=second']), 'first')
  assert.equal(extractFbclid(['?fbclid=' + 'x'.repeat(600)])?.length, 500)
  assert.equal(extractFbclid(['http://[', null]), null)
})

test('checkout metadata includes identifiers only when consent allows them', () => {
  const request = new Request('https://workshop.mastermindshq.business/api/events/checkout-session', { headers: {
    'x-vercel-ip-country': 'US', cookie: '_fbp=fb.1.browser', referer: 'https://example.com/?fbclid=click123', 'user-agent': 'Test browser', 'x-forwarded-for': ' 203.0.113.1, 203.0.113.2',
  } })
  const metadata = buildMetaCheckoutMetadata(request)
  assert.equal(metadata.meta_consent, 'not_required')
  assert.equal(metadata.meta_fbp, 'fb.1.browser')
  assert.match(metadata.meta_fbc, /^fb\.1\.\d+\.click123$/)
  assert.equal(metadata.meta_ua, 'Test browser')
  assert.equal(metadata.meta_ip, '203.0.113.1')
  const denied = new Request(request, { headers: { 'x-vercel-ip-country': 'DE', cookie: '_fbp=private', 'user-agent': 'private' } })
  assert.deepEqual(buildMetaCheckoutMetadata(denied), { meta_consent: 'unknown' })
  const conflicting = new Request(request, { headers: { 'x-vercel-ip-country': 'DE', cookie: 'mhq_consent=granted; mhq_consent=denied; _fbp=private' } })
  assert.deepEqual(buildMetaCheckoutMetadata(conflicting), { meta_consent: 'denied' })
  const granted = new Request(request, { headers: { 'x-vercel-ip-country': 'DE', cookie: 'mhq_consent=granted; _fbc=existing', 'user-agent': 'a'.repeat(600) } })
  const grantedMetadata = buildMetaCheckoutMetadata(granted, { extraUrls: ['?fbclid=bodyClick'] })
  assert.equal(grantedMetadata.meta_fbc, 'existing')
  assert.equal(grantedMetadata.meta_ua.length, 500)
  const bodyMetadata = buildMetaCheckoutMetadata(request, { extraUrls: ['?fbclid=bodyClick'] })
  assert.ok(bodyMetadata.meta_fbc.endsWith('.bodyClick'))
})

test('proxy sets the region cookie only when a desired value is known and the cookie is missing', () => {
  const request = (host: string, headers: Record<string, string> = {}) => new NextRequest(`https://${host}/events`, { headers: { host, ...headers } })
  assert.match(proxy(request('workshop.mastermindshq.business', { 'x-vercel-ip-country': 'DE' })).headers.get('set-cookie') ?? '', /mhq_cr=1; Max-Age=86400; Domain=\.mastermindshq\.business/)
  assert.match(proxy(request('workshop-site.vercel.app', { 'x-vercel-ip-country': 'US' })).headers.get('set-cookie') ?? '', /^mhq_cr=0; Max-Age=86400; Path=\/; SameSite=Lax; Secure$/)
  assert.equal(proxy(request('example.com')).headers.get('set-cookie'), null)
  assert.equal(proxy(request('example.com', { cookie: 'mhq_cr=1', 'x-vercel-ip-country': 'DE' })).headers.get('set-cookie'), null)
  assert.equal(proxy(request('workshop.mastermindshq.business', { cookie: 'mhq_cr=1', 'x-vercel-ip-country': 'US' })).headers.get('set-cookie'), null)
  assert.match(proxy(request('localhost:3000')).headers.get('set-cookie') ?? '', /^mhq_cr=0.*SameSite=Lax$/)
})


test('browser pixel lifecycle queues safely, loads once and deduplicates purchases', async (t) => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
  const originalDocument = Object.getOwnPropertyDescriptor(globalThis, 'document')
  const storage = new Map<string, string>()
  const scripts: Array<{ id: string; src: string; async: boolean }> = []
  const browser = { localStorage: { getItem: (key: string) => storage.get(key) ?? null, setItem: (key: string, value: string) => { storage.set(key, value) } } } as unknown as Window
  Object.defineProperty(globalThis, 'window', { value: browser, configurable: true })
  Object.defineProperty(globalThis, 'document', { configurable: true, value: {
    getElementById: (id: string) => scripts.find(script => script.id === id),
    querySelector: () => scripts.find(script => script.src.includes('fbevents.js')),
    createElement: () => ({ id: '', src: '', async: false }),
    head: { appendChild: (script: typeof scripts[number]) => scripts.push(script) },
  } })
  try {
    ensureFbqStub()
    initPixelsOnce()
    initPixelsOnce()
    assert.ok(browser.fbq)
    assert.equal(browser.fbq.disablePushState, true)
    assert.equal(browser.fbq, browser._fbq)
    assert.equal(browser.fbq.queue.length, 2)
    trackMeta('PageView')
    assert.deepEqual(Array.from(browser.fbq.queue[2]), ['track', 'PageView', {}])
    assert.equal(scripts.length, 0)
    loadFbeventsOnce()
    loadFbeventsOnce()
    assert.equal(scripts.length, 1)
    assert.equal(scripts[0].id, 'mhq-fbevents')
    assert.equal(trackPurchaseOnce({ sessionId: 'cs_first', value: 1, currency: 'USD' }), true)
    assert.equal(trackPurchaseOnce({ sessionId: 'cs_first', value: 1, currency: 'USD' }), false)
    assert.deepEqual(Array.from(browser.fbq.queue.at(-1)!), ['track', 'Purchase', { value: 1, currency: 'USD' }, { eventID: 'mhq_cs_first' }])
    let requests = 0
    t.mock.method(globalThis, 'fetch', async () => { requests++; return new Response(JSON.stringify({ paid: true, value: 48.5, currency: 'USD' })) })
    await fetchAndTrackPurchase('invalid', 'events')
    await fetchAndTrackPurchase('cs_first', 'events')
    assert.equal(requests, 0)
    await Promise.all([fetchAndTrackPurchase('cs_trial', 'ai-agent-income'), fetchAndTrackPurchase('cs_trial', 'ai-agent-income')])
    await fetchAndTrackPurchase('cs_trial', 'ai-agent-income')
    assert.equal(requests, 1)
    assert.equal(browser.fbq.queue.filter(args => args[1] === 'StartTrial').length, 1)
    assert.equal(storage.get('mhq_starttrial_sent_mhq_cs_trial'), '1')
    t.mock.method(browser.localStorage, 'getItem', () => { throw new Error('Storage blocked') })
    t.mock.method(browser.localStorage, 'setItem', () => { throw new Error('Storage blocked') })
    assert.equal(trackPurchaseOnce({ sessionId: 'cs_blocked', value: 1, currency: 'USD' }), true)
    t.mock.method(globalThis, 'fetch', async () => { throw new Error('Network unavailable') })
    await assert.doesNotReject(fetchAndTrackPurchase('cs_network', 'events'))
  } finally {
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow)
    else Reflect.deleteProperty(globalThis, 'window')
    if (originalDocument) Object.defineProperty(globalThis, 'document', originalDocument)
    else Reflect.deleteProperty(globalThis, 'document')
  }
})
