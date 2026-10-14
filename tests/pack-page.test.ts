import assert from 'node:assert/strict'
import test from 'node:test'
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { hasDmMarker } from '../src/lib/giveaway-dm'
import { GIVEAWAY_OFFERS, WEBSITE_WORKSHOP_URL, offerForLevel } from '../src/lib/giveaway-offers'
import { LEAD_MACHINE_CONTENT } from '../src/app/giveaways/lead-machine/pack'
import { validatePackContent } from '../src/lib/pack-page'
import type { PackPageContent } from '../src/lib/pack-page'
import { LEAD_MACHINE_PROMPT } from '../src/app/giveaways/lead-machine/prompt'

// ---------------------------------------------------------------------------
// Pack page template rules (Illy, 2026-10-13). docs/giveaways/PROCESS.md,
// "Pack page template".
//
//   1. Came from the DM (?via=dm): never ask for the email again.
//   2. Everyone else: one ask, after the first copy or download. No timed popup.
//   3. The one paid offer at the end matches the page's AI level.
//   4. The copy card gives out exactly what ships in the download.
// ---------------------------------------------------------------------------

const ROOT = join(__dirname, '..')
const PACK_SRC = readFileSync(join(ROOT, 'src', 'components', 'giveaways', 'PackPage.tsx'), 'utf8')
const GIVEAWAYS_DIR = join(ROOT, 'src', 'app', 'giveaways')

test('the DM marker is read from ?via=dm and nothing else', () => {
  assert.equal(hasDmMarker('?via=dm'), true)
  assert.equal(hasDmMarker('via=DM'), true)
  assert.equal(hasDmMarker('?utm_source=ig&via=dm'), true)
  assert.equal(hasDmMarker('?via=dm%20'), true)
  assert.equal(hasDmMarker(''), false)
  assert.equal(hasDmMarker('?via=email'), false)
  assert.equal(hasDmMarker('?dm=1'), false)
})

test('PackPage wires the shared email modal and skips it for DM visitors', () => {
  assert.match(PACK_SRC, /from\s+['"]@\/components\/giveaways\/GiveawayEmailModal['"]/, 'PackPage must use the shared GiveawayEmailModal (it posts to /api/lead-magnet)')
  assert.match(PACK_SRC, /<GiveawayEmailModal\b[\s\S]{0,200}?slug=\{slug\}/, 'the modal must be tagged with the page slug')
  assert.match(PACK_SRC, /isFromDmVisit\(\)/, 'PackPage must check the DM marker')
  assert.match(PACK_SRC, /if\s*\(\s*fromDm\.current\b/, 'the ask must return early for DM visitors')
})

test('PackPage asks only after a copy or a download, never on a timer', () => {
  assert.match(PACK_SRC, /askForEmailOnce\(\s*['"]copy['"]\s*\)/, 'the copy button must trigger the one ask')
  assert.match(PACK_SRC, /askForEmailOnce\(\s*['"]download['"]\s*\)/, 'the download button must trigger the one ask')
  assert.doesNotMatch(PACK_SRC, /GiveawayAutoModal/, 'pack pages never use the 20-second auto popup')
  assert.match(PACK_SRC, /sessionStorage\.(get|set)Item\(key/, 'the ask must be remembered so it fires at most once per tab')
  const opens = PACK_SRC.match(/setEmailOpen\(\s*true\s*\)/g) || []
  assert.equal(opens.length, 1, 'the modal must have exactly one opener, inside askForEmailOnce')
})

test('every offer sits at its own level, and builder pages have no offer until one is chosen', () => {
  for (const [level, offer] of Object.entries(GIVEAWAY_OFFERS)) {
    if (offer) assert.equal(offer.level, level, `offer ${offer.id} is filed under ${level} but declares ${offer.level}`)
  }
  assert.equal(GIVEAWAY_OFFERS.builder, null)
  assert.equal(offerForLevel('builder', 'tokens'), null)
})

test('the beginner offer is the Website Workshop, tagged with the giveaway slug', () => {
  const offer = offerForLevel('beginner', 'lead-machine')
  assert.ok(offer)
  assert.equal(offer.id, 'website-workshop')
  const url = new URL(offer.cta.href)
  assert.equal(`${url.origin}${url.pathname}`, WEBSITE_WORKSHOP_URL)
  assert.equal(url.searchParams.get('utm_campaign'), 'lead-machine')
  assert.equal(url.searchParams.get('utm_source'), 'giveaway')
})

test('Lead Machine is a beginner pack page with its own slug', () => {
  assert.equal(LEAD_MACHINE_CONTENT.slug, 'lead-machine')
  assert.equal(LEAD_MACHINE_CONTENT.level, 'beginner')
  const page = readFileSync(join(GIVEAWAYS_DIR, 'lead-machine', 'page.tsx'), 'utf8')
  assert.match(page, /<PackPage\b[\s\S]{0,200}?slug="lead-machine"/)
})

test('the Lead Machine copy card is exactly the prompt inside the download', () => {
  const zip = join(ROOT, 'public', 'lead-machine-starter.zip')
  const shipped = execFileSync('unzip', ['-p', zip, 'lead-machine/PASTE-INTO-CHATGPT-OR-CLAUDE.txt'], { encoding: 'utf8' }).replace(/\s+$/, '')
  assert.equal(LEAD_MACHINE_PROMPT, shipped, 'prompt.ts drifted from the zip. Regenerate it (command in prompt.ts).')
  assert.equal(LEAD_MACHINE_CONTENT.use?.cards[0].prompt, LEAD_MACHINE_PROMPT)
})

test('pack page words contain no em dashes', () => {
  assert.doesNotMatch(JSON.stringify(LEAD_MACHINE_CONTENT), /—/)
  for (const offer of Object.values(GIVEAWAY_OFFERS)) {
    if (offer) assert.doesNotMatch(JSON.stringify(offer), /—/)
  }
})

test('every page on the pack template passes its own directory as the slug', () => {
  for (const entry of readdirSync(GIVEAWAYS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const pagePath = join(GIVEAWAYS_DIR, entry.name, 'page.tsx')
    try {
      if (!statSync(pagePath).isFile()) continue
    } catch {
      continue
    }
    const src = readFileSync(pagePath, 'utf8')
    const m = src.match(/<PackPage\b[\s\S]{0,200}?slug="([^"]+)"/)
    if (!m) continue
    assert.equal(m[1], entry.name, `giveaways/${entry.name} renders PackPage with slug="${m[1]}"`)
  }
})

// Every page on the pack template, found by its pack.ts, must pass the validator.
function isPackContent(v: unknown): v is PackPageContent {
  return Boolean(v && typeof v === 'object' && 'slug' in v && 'hero' in v && 'stuck' in v && 'level' in v)
}

test('every pack page content passes the pack page rules', async () => {
  let checked = 0
  for (const entry of readdirSync(GIVEAWAYS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const contentPath = join(GIVEAWAYS_DIR, entry.name, 'pack.ts')
    try {
      if (!statSync(contentPath).isFile()) continue
    } catch {
      continue
    }
    const mod = (await import(contentPath)) as Record<string, unknown>
    const contents = Object.values(mod).filter(isPackContent)
    assert.ok(contents.length > 0, `giveaways/${entry.name}/pack.ts exports no pack page content`)
    for (const c of contents) {
      assert.equal(c.slug, entry.name, `giveaways/${entry.name}/pack.ts has slug "${c.slug}"`)
      assert.deepEqual(validatePackContent(c), [], `giveaways/${entry.name}: ${validatePackContent(c).join('; ')}`)
      checked++
    }
  }
  assert.ok(checked >= 1, 'no pack page content found')
})

test('every Free AI Tools page passes the pack page rules', async () => {
  const { FREE_AI_TOOL_SLUGS } = await import('../src/lib/free-ai-tools')
  const { freeAiToolPack } = await import('../src/lib/free-ai-tool-pack')
  assert.ok(FREE_AI_TOOL_SLUGS.length >= 10)
  for (const slug of FREE_AI_TOOL_SLUGS) {
    const pack = freeAiToolPack(slug)
    assert.equal(pack.slug, slug)
    assert.deepEqual(validatePackContent(pack), [], `${slug}: ${validatePackContent(pack).join('; ')}`)
    const page = readFileSync(join(GIVEAWAYS_DIR, slug, 'page.tsx'), 'utf8')
    assert.match(page, new RegExp(`<PackPage\\b[\\s\\S]{0,200}?slug="${slug}"`), `${slug}/page.tsx must render PackPage with its own slug`)
  }
})
