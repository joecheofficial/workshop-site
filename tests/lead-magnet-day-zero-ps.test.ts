import assert from 'node:assert/strict'
import test from 'node:test'

import { withDayZeroPs } from '../src/lib/giveaway-followups'

const footer = '<p style="font-size: 12px;">Sent by Masterminds HQ. <a href="https://u">Unsubscribe</a> any time.</p>'
const html = `<div><p>Here it is.</p><p>Joe</p>\n${footer}\n</div>`
const text = 'Here it is.\n\nJoe\n\nSent by Masterminds HQ. Unsubscribe any time: https://u'

test('starter gift: demo P.S. after the sign-off, above the unsubscribe footer, in html and text', () => {
  const out = withDayZeroPs('lead-machine', { html, text, footerHtml: footer })
  assert.ok(out.html.indexOf('fg-p-demo') > out.html.indexOf('<p>Joe</p>'))
  assert.ok(out.html.indexOf('fg-p-demo') < out.html.indexOf('Sent by Masterminds HQ'))
  assert.match(out.text!, /Joe\n\nP\.S\. New to building with AI\? Start with my free demo\..*\n\nSent by Masterminds HQ/s)
})

test('builder gift gets the Meta Ads P.S.; quiz and sales keywords get none', () => {
  assert.match(withDayZeroPs('guardog', { html, text, footerHtml: footer }).text!, /fg-p-meta/)
  for (const src of ['ai-levels-quiz', 'kw-book', 'kw-mastermind']) {
    assert.deepEqual(withDayZeroPs(src, { html, text, footerHtml: footer }), { html, text })
  }
})

test('templates without the shared footer or a text part still get exactly one P.S.', () => {
  const out = withDayZeroPs('lead-magnet', { html: '<div><p>PDF</p></div>' })
  assert.equal(out.text, undefined)
  assert.equal((out.html.match(/P\.S\./g) || []).length, 1)
  assert.ok(out.html.endsWith('</div>'))
})
