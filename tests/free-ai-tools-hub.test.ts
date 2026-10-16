import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { FREE_AI_TOOL_SLUGS } from '../src/lib/free-ai-tools'
import { FREE_AI_SWAPS, FREE_AI_TOOLS_HUB_SLUG, freeAiSwapRows } from '../src/lib/free-ai-tools-hub'
import { buildFreeAiToolsHubEmail } from '../src/lib/free-ai-tools-hub-email'
import { isDeliverableLeadMagnetSource } from '../src/lib/lead-magnets'
import { giveaways } from '../src/lib/giveaways'
import { validatePackContent } from '../src/lib/pack-page'
import { FREE_AI_TOOLS_HUB_PACK } from '../src/app/giveaways/free-ai-tools/pack'

// Free AI Tools hub, keyword SWAP (paid app vs free swap carousel, 21 Oct 2026).

test('the hub lists each of the original ten Free AI Tools exactly once (the SWAP carousel promises those 10)', () => {
  assert.equal(FREE_AI_TOOLS_HUB_SLUG, 'free-ai-tools')
  assert.deepEqual([...FREE_AI_SWAPS.map((s) => s.slug)].sort(), [...FREE_AI_TOOL_SLUGS.slice(0, 10)].sort())
  for (const s of FREE_AI_SWAPS) {
    assert.ok(s.paid.trim() && s.line.trim(), `${s.slug} needs a paid app and a line`)
    assert.ok(!s.line.includes('$'), `${s.slug}: no prices on the hub, paid plans change`)
  }
})

test('the hub page links each swap to its own tool page and passes the pack rules', () => {
  assert.equal(FREE_AI_TOOLS_HUB_PACK.slug, 'free-ai-tools')
  assert.equal(FREE_AI_TOOLS_HUB_PACK.level, 'beginner')
  assert.deepEqual(validatePackContent(FREE_AI_TOOLS_HUB_PACK), [])
  const swaps = FREE_AI_TOOLS_HUB_PACK.guide?.sections.find((s) => s.title === 'The 10 swaps')
  assert.ok(swaps?.links)
  assert.deepEqual(swaps.links.map((l) => l.href), FREE_AI_SWAPS.map((s) => `/giveaways/${s.slug}`))
  const page = readFileSync(join(__dirname, '..', 'src', 'app', 'giveaways', 'free-ai-tools', 'page.tsx'), 'utf8')
  assert.match(page, /<PackPage\b[\s\S]{0,200}?slug="free-ai-tools"/)
  assert.ok(giveaways.some((g) => g.slug === 'free-ai-tools'), 'free-ai-tools is not in the giveaways registry')
})

test('the hub email is deliverable and carries all ten links', () => {
  assert.ok(isDeliverableLeadMagnetSource('free-ai-tools'), 'free-ai-tools would fail closed in /api/lead-magnet')
  const e = buildFreeAiToolsHubEmail({ unsubscribeFooter: '<p>footer</p>', unsubscribeUrl: 'https://x.test/u' })
  assert.equal(e.subject, 'Your 10 free swaps')
  for (const r of freeAiSwapRows()) {
    assert.ok(e.html.includes(`/giveaways/${r.slug}`) && e.text.includes(`/giveaways/${r.slug}`), `email missing ${r.slug}`)
    assert.ok(e.text.includes(r.tool.name) && e.text.includes(r.paid), `email missing names for ${r.slug}`)
  }
  assert.ok(e.text.includes('/giveaways/free-ai-tools'), 'email missing the hub link')
  for (const body of [e.subject, e.html, e.text]) {
    assert.ok(!body.includes('—'), 'hub email contains an em dash')
    assert.ok(!/\{\{|\[LINK\]|undefined/.test(body), 'hub email has a placeholder')
  }
  const route = readFileSync(join(__dirname, '..', 'src', 'app', 'api', 'lead-magnet', 'route.ts'), 'utf8')
  assert.match(route, /source === 'free-ai-tools'[\s\S]{0,300}buildFreeAiToolsHubEmail/)
})
