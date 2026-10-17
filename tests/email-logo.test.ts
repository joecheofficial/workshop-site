import assert from 'node:assert/strict'
import test from 'node:test'
import { existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { EMAIL_LOGO_URL, withEmailLogo } from '../src/lib/email-logo'

test('logo goes inside the outer letter div, once', () => {
  const html = '\n      <div style="font-family:Georgia;">\n<p>Hi,</p></div>'
  const out = withEmailLogo(html)
  assert.ok(out.indexOf(EMAIL_LOGO_URL) > out.indexOf('<div'))
  assert.ok(out.indexOf(EMAIL_LOGO_URL) < out.indexOf('<p>Hi,'))
  assert.equal(withEmailLogo(out), out)
  assert.equal(out.split(EMAIL_LOGO_URL).length - 1, 1)
})

test('no outer div: logo is prepended; empty stays empty', () => {
  assert.ok(withEmailLogo('<p>x</p>').startsWith('<p style="margin:0 0 24px 0;"><img'))
  assert.equal(withEmailLogo(''), '')
})

test('stays pretty-light and the hosted file exists and is small', () => {
  const out = withEmailLogo('<div><p>x</p></div>')
  assert.ok(!/<table|background|<a /i.test(out))
  assert.ok(out.includes('alt="Masterminds HQ"'))
  const file = join(process.cwd(), 'public/brand/mhq-logo-animated.gif')
  assert.ok(existsSync(file))
  assert.ok(statSync(file).size < 200 * 1024)
})
