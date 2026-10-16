import assert from 'node:assert/strict'
import test from 'node:test'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { FREE_AI_TOOLS } from '../src/lib/free-ai-tools'
import { buildFreeAiToolEmail } from '../src/lib/free-ai-tool-email'
import { freeAiToolPack } from '../src/lib/free-ai-tool-pack'
import { isDeliverableLeadMagnetSource } from '../src/lib/lead-magnets'
import { offerForLevel } from '../src/lib/giveaway-offers'
import { giveaways } from '../src/lib/giveaways'

const KEYWORDS = ['SKILL', 'HANDY', 'BRAIN', 'PAPER', 'CALLS', 'SHARP', 'SLOTS', 'DRAW', 'INKED', 'LOCAL']

// Week 2 reels (Illy approved 2026-10-16): keyword, slug and the honest level
// (terminal or Claude Code setup = builder, an app or a website = beginner).
const WEEK2: Record<string, { slug: string; level: 'beginner' | 'builder' }> = {
  VOICE: { slug: 'free-ai-voicestudio', level: 'beginner' },
  DATA: { slug: 'free-ai-firecrawl', level: 'beginner' },
  NOTES: { slug: 'free-ai-meetily', level: 'beginner' },
  BROWSER: { slug: 'free-ai-browser-use', level: 'builder' },
  STYLE: { slug: 'free-ai-ui-ux-pro-max', level: 'builder' },
  MEMORY: { slug: 'free-ai-mempalace', level: 'builder' },
}

test('every Free AI Tool is present, one per keyword', () => {
  assert.deepEqual(FREE_AI_TOOLS.map((t) => t.keyword), [...KEYWORDS, ...Object.keys(WEEK2)])
  assert.equal(new Set(FREE_AI_TOOLS.map((t) => t.slug)).size, FREE_AI_TOOLS.length, 'duplicate slug')
  for (const t of FREE_AI_TOOLS) {
    assert.match(t.slug, /^free-ai-[a-z0-9-]+$/)
    assert.ok(t.steps.length >= 3 && t.steps.length <= 5, `${t.slug} needs 3 to 5 steps`)
    assert.ok(t.howIUse.length > 0 && t.goodToKnow && t.links.length > 0, `${t.slug} missing copy`)
    assert.match(t.toolUrl, /^https:\/\//)
    for (const l of t.links) assert.match(l.url, /^https:\/\//, `${t.slug} link ${l.url}`)
  }
  for (const t of FREE_AI_TOOLS.slice(0, KEYWORDS.length)) assert.equal(t.steps.length, 3, `${t.slug} keeps its 3 steps`)
})

test('every Free AI Tool has a page, a layout and a registry entry', () => {
  for (const t of FREE_AI_TOOLS) {
    const dir = join(__dirname, '..', 'src', 'app', 'giveaways', t.slug)
    assert.ok(existsSync(join(dir, 'page.tsx')), `${t.slug} page.tsx missing`)
    assert.ok(existsSync(join(dir, 'layout.tsx')), `${t.slug} layout.tsx missing`)
    const page = readFileSync(join(dir, 'page.tsx'), 'utf8')
    assert.ok(page.includes(`const SLUG = '${t.slug}'`) && page.includes('freeAiToolPack(SLUG)'), `${t.slug} page reads the wrong tool`)
    assert.ok(readFileSync(join(dir, 'layout.tsx'), 'utf8').includes(`/giveaways/${t.slug}'`), `${t.slug} layout has the wrong canonical URL`)
    assert.ok(giveaways.some((g) => g.slug === t.slug), `${t.slug} not in the giveaways registry`)
  }
  const sitemap = readFileSync(join(__dirname, '..', 'src', 'app', 'sitemap.ts'), 'utf8')
  assert.ok(sitemap.includes('FREE_AI_TOOL_SLUGS'), 'Free AI Tools pages are missing from the sitemap')
})

test('every Free AI Tool slug is deliverable and its email carries the real link', () => {
  for (const t of FREE_AI_TOOLS) {
    assert.ok(isDeliverableLeadMagnetSource(t.slug), `${t.slug} would fail closed in /api/lead-magnet`)
    const e = buildFreeAiToolEmail({ source: t.slug, unsubscribeFooter: '<p>footer</p>', unsubscribeUrl: 'https://x.test/u' })
    assert.equal(e.subject, `Your ${t.name} setup notes`)
    assert.ok(e.html.includes(t.toolUrl) && e.text.includes(t.toolUrl), `${t.slug} email missing tool link`)
    assert.ok(e.text.includes(`/giveaways/${t.slug}`), `${t.slug} email missing page link`)
    assert.ok(e.text.includes(`Set it up in ${t.steps.length} steps:`), `${t.slug} email step count`)
    for (const body of [e.subject, e.html, e.text]) {
      assert.ok(!body.includes('—'), `${t.slug} email contains an em dash`)
      assert.ok(!/\{\{|\[LINK\]|undefined/.test(body), `${t.slug} email has a placeholder`)
    }
  }
})

test('Week 2 setup notes: honest level, matched offer, Claude Code prompt and limits up front', () => {
  for (const [keyword, want] of Object.entries(WEEK2)) {
    const t = FREE_AI_TOOLS.find((x) => x.keyword === keyword)
    assert.ok(t, `${keyword} missing`)
    assert.equal(t.slug, want.slug)
    assert.equal(t.level, want.level, `${keyword} level`)
    const pack = freeAiToolPack(t.slug)
    assert.equal(pack.level, want.level)
    assert.equal(offerForLevel(pack.level, t.slug)?.id, want.level === 'builder' ? 'get-found-kit' : 'website-workshop', `${keyword} end offer`)
    // The free thing first: the one prompt sits in the first block, with the official link.
    assert.equal(pack.hero.button.target, 'get')
    assert.equal(pack.get?.command?.text, t.claudePrompt)
    assert.ok(t.claudePrompt && t.claudePrompt.length > 80, `${keyword} needs a real Claude Code prompt`)
    assert.equal(pack.get?.primary?.href, t.toolUrl)
    assert.ok(pack.get?.note?.rest, `${keyword} must say what you need up front`)
    assert.ok(pack.promise && pack.promise.does.length && pack.promise.doesNot.length, `${keyword} needs does / does not`)
    const titles = pack.guide?.sections.map((s) => s.title) || []
    for (const want of ['What you need', 'The steps by hand', 'Honest limits, costs and licence', 'Links']) {
      assert.ok(titles.includes(want), `${keyword} guide is missing "${want}"`)
    }
    assert.ok(pack.stuck.length >= 5, `${keyword} needs its own stuck fixes`)
    assert.ok(t.links.some((l) => l.url.startsWith(t.githubUrl)), `${keyword} must link the GitHub repo`)
    assert.ok(!/\d+(\.\d+)?x (more|faster)|guarantee/i.test(JSON.stringify(pack)), `${keyword} makes a results claim`)
  }
})

test('the first ten Free AI Tools pages are unchanged by the Week 2 extras', () => {
  for (const t of FREE_AI_TOOLS.slice(0, KEYWORDS.length)) {
    assert.equal(t.claudePrompt, undefined)
    const pack = freeAiToolPack(t.slug)
    assert.equal(pack.level, 'beginner')
    assert.equal(pack.hero.button.target, 'guide')
    assert.equal(pack.hero.title, `Here is ${t.name}.`)
  }
})

test('page copy has no em dashes', () => {
  for (const file of ['src/lib/free-ai-tools.ts', 'src/lib/free-ai-tool-pack.ts', 'src/lib/free-ai-tool-email.ts']) {
    assert.ok(!readFileSync(join(__dirname, '..', file), 'utf8').includes('—'), `${file} contains an em dash`)
  }
  for (const t of FREE_AI_TOOLS) {
    for (const f of ['page.tsx', 'layout.tsx']) {
      const src = readFileSync(join(__dirname, '..', 'src', 'app', 'giveaways', t.slug, f), 'utf8')
      assert.ok(!src.includes('—'), `${t.slug}/${f} contains an em dash`)
    }
  }
})
