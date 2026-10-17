import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  buildGenericGiveawayEmail,
  isValidManychatSecret,
  sanitizeGiveawayName,
  validateGiveawayLink,
} from '../src/lib/generic-giveaway-email'

test('link allowlist accepts owned and trusted https hosts', () => {
  assert.ok(validateGiveawayLink('https://portal.mastermindshq.business/the-quiet-epidemic'))
  assert.ok(validateGiveawayLink('https://mastermindshq.business/x'))
  assert.ok(validateGiveawayLink('https://workshop-site-sigma.vercel.app/giveaways/x'))
  assert.ok(validateGiveawayLink('https://github.com/josephtandle/x'))
  assert.ok(validateGiveawayLink('https://betterplayaguideai.musecafe.vip/'))
})

test('link allowlist rejects everything else', () => {
  for (const bad of [
    'http://portal.mastermindshq.business/the-quiet-epidemic',
    'https://evil.com/x',
    'https://github.com/other/x',
    'https://github.com/josephtandle',
    'https://mastermindshq.business.evil.com/x',
    'https://evilmastermindshq.business/x',
    'https://user:pw@mastermindshq.business/x',
    'javascript:alert(1)',
    'not a url',
    '',
    undefined,
    42,
  ]) {
    assert.equal(validateGiveawayLink(bad), null, String(bad))
  }
})

test('name is stripped of tags and control chars, capped, and falls back to the slug', () => {
  assert.equal(sanitizeGiveawayName('<b>The Quiet</b> Epidemic\u0007', 'x'), 'The Quiet Epidemic')
  assert.equal(sanitizeGiveawayName('  ', 'the-quiet-epidemic'), 'The Quiet Epidemic')
  assert.equal(sanitizeGiveawayName(undefined, 'claude-md'), 'Claude Md')
  assert.equal(sanitizeGiveawayName('a'.repeat(500), 'x').length, 120)
})

test('secret compare requires a non-empty env and an exact match', () => {
  assert.equal(isValidManychatSecret('abc', 'abc'), true)
  assert.equal(isValidManychatSecret('abd', 'abc'), false)
  assert.equal(isValidManychatSecret('abc', ''), false)
  assert.equal(isValidManychatSecret('', ''), false)
  assert.equal(isValidManychatSecret(null, 'abc'), false)
  assert.equal(isValidManychatSecret('abcd', 'abc'), false)
})

function build(name: string, link: string) {
  return buildGenericGiveawayEmail({
    source: 'the-quiet-epidemic',
    name,
    link,
    unsubscribeFooter: '<p style="font-size: 12px; color: #bbb;">Sent by Masterminds HQ.</p>',
    unsubscribeUrl: 'https://workshop.mastermindshq.business/unsubscribe?token=t',
  })
}

test('email is pretty-light, escaped, has a text part, and no em dash', () => {
  const e = build('Tom & "Jerry" <x>', 'https://portal.mastermindshq.business/the-quiet-epidemic')
  assert.match(e.subject, /^Your copy of /)
  assert.ok(e.html.includes('Tom &amp; &quot;Jerry&quot; &lt;x&gt;'))
  assert.ok(!e.html.includes('<x>'))
  assert.ok(!/<table/i.test(e.html))
  assert.ok(!/background/i.test(e.html))
  assert.ok(e.html.includes('Georgia'))
  assert.ok(e.html.includes('#6f5cc4'))
  assert.ok(e.text.length > 50)
  assert.ok(e.text.includes('Unsubscribe any time'))
  for (const s of [e.subject, e.html, e.text]) assert.ok(!s.includes('—'))
  assert.ok(e.html.includes('utm_content=the-quiet-epidemic'))
  assert.ok(e.text.includes('https://mastermindshq.business/?utm_source=email'))
})

test('third-party links are not UTM tagged', () => {
  const e = build('Repo', 'https://github.com/josephtandle/x')
  assert.ok(e.text.includes('https://github.com/josephtandle/x\n'))
  assert.ok(!e.html.includes('github.com/josephtandle/x?utm'))
})

test('only authenticated ManyChat calls may supply the link; website callers get our own page from a fixed list', () => {
  const route = readFileSync(join(process.cwd(), 'src/app/api/lead-magnet/route.ts'), 'utf8')
  assert.ok(route.includes("checkRateLimit('lead-magnet:manychat', 300, 60)"))
  // rawLink is read only on the ManyChat branch; a website caller can never choose the link.
  assert.ok(route.includes('isManychat ? validateGiveawayLink(rawLink) : websiteGeneric?.link ?? null'))
  assert.ok(route.includes('const websiteGeneric = isManychat ? null : websiteGiveawayEmail(source)'))
  assert.ok(route.includes('generic: true'))
})

test('IG sales keywords get the short sales-link letter with a fixed link', async () => {
  const { buildSalesKeywordEmail, salesKeywordPage, SALES_KEYWORD_PAGES } = await import('../src/lib/generic-giveaway-email')
  assert.deepEqual(Object.keys(SALES_KEYWORD_PAGES).sort(), ['kw-ads', 'kw-book', 'kw-build', 'kw-mastermind', 'kw-meta', 'kw-team'])
  assert.equal(salesKeywordPage('the-quiet-epidemic'), null)
  assert.equal(salesKeywordPage('toString'), null)
  const footer = '<p style="font-size: 12px; color: #bbb;">Sent by Masterminds HQ.</p>'
  const book = buildSalesKeywordEmail({ source: 'kw-book', unsubscribeFooter: footer, unsubscribeUrl: 'https://workshop.mastermindshq.business/unsubscribe?token=t' })
  assert.equal(book.subject, 'The link you asked for on Instagram')
  assert.ok(book.text.includes('https://www.amazon.com/dp/B0H4GR93WT\n'))
  assert.ok(!book.html.includes('amazon.com/dp/B0H4GR93WT?utm'))
  const meta = buildSalesKeywordEmail({ source: 'kw-meta', unsubscribeFooter: footer, unsubscribeUrl: null })
  assert.ok(meta.html.includes('meta-ads-with-claude-code?utm_source=email'))
  assert.ok(meta.html.includes('utm_content=kw-meta'))
  for (const src of Object.keys(SALES_KEYWORD_PAGES)) {
    const e = buildSalesKeywordEmail({ source: src, unsubscribeFooter: footer, unsubscribeUrl: null })
    for (const s of [e.subject, e.html, e.text]) assert.ok(!s.includes('—'))
    assert.ok(!/<table|background/i.test(e.html))
    assert.ok(!/Your copy of/.test(e.subject + e.html))
  }
  assert.throws(() => buildSalesKeywordEmail({ source: 'x', unsubscribeFooter: footer, unsubscribeUrl: null }))
})

test('sales-keyword branch runs only for authenticated ManyChat calls, before the generic letter', () => {
  const route = readFileSync(join(process.cwd(), 'src/app/api/lead-magnet/route.ts'), 'utf8')
  const i = route.indexOf('if (isManychat && salesKeywordPage(source))')
  assert.ok(i > 0)
  assert.ok(i < route.indexOf('const websiteGeneric = isManychat ? null'))
  assert.ok(i > route.indexOf(".upsert({ email, lead_source: source }"))
})
