import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { buildWhatsAppAgentEmail } from '../src/lib/whatsapp-agent-email'
import { isDeliverableLeadMagnetSource } from '../src/lib/lead-magnets'

test('whatsapp-agent is deliverable and has its own branch in /api/lead-magnet', () => {
  assert.ok(isDeliverableLeadMagnetSource('whatsapp-agent'))
  const route = readFileSync(join(__dirname, '..', 'src', 'app', 'api', 'lead-magnet', 'route.ts'), 'utf8')
  assert.match(route, /source === 'whatsapp-agent'[\s\S]{0,300}?buildWhatsAppAgentEmail/)
})

test('WhatsApp receptionist email links the zip, the PDF and the page, pretty-light', () => {
  const unsubscribeFooter = '<p>Unsubscribe footer</p>'
  const { subject, html, text } = buildWhatsAppAgentEmail({ unsubscribeFooter, unsubscribeUrl: 'https://example.com/u' })
  assert.equal(subject, 'Your WhatsApp receptionist folder')
  for (const part of ['/whatsapp-receptionist.zip', '/whatsapp-receptionist-guide.pdf', '/giveaways/whatsapp-agent']) {
    assert.ok(html.includes(part), `html missing ${part}`)
    assert.ok(text.includes(part), `text missing ${part}`)
  }
  assert.ok(html.includes(unsubscribeFooter))
  assert.ok(text.includes('https://example.com/u'))
  for (const banned of ['—', '<button', '<table', 'attachment']) assert.ok(!html.includes(banned), `unexpected ${banned}`)
})
