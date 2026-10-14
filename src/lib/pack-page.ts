import type { GiveawayLevel } from './giveaway-offers'

// ---------------------------------------------------------------------------
// Content shape for the pack-style giveaway page (src/components/giveaways/
// PackPage.tsx). Structure copied from Avi Grondin's free-pack page and
// approved by Illy on 2026-10-13; rolled out to every giveaway on 2026-10-14.
//
//   hero -> get it -> guide -> what it looks like -> use it now
//   -> ways to run it -> stuck? find your line -> one matched offer
//
// Every block except hero, stuck and the offer is optional, so the same
// template carries prompt packs, downloads, installs, guides and videos.
// Pages supply words only. Layout, the email ask and the offer live in the
// component and in src/lib/giveaway-offers.ts. Rules: docs/giveaways/
// PROCESS.md, "Pack page template".
// ---------------------------------------------------------------------------

export type PackSectionId = 'get' | 'guide' | 'inside' | 'use' | 'ways' | 'stuck' | 'next'

export type PackTagTone = 'easy' | 'warn' | 'plain'

export type PackChatMessage =
  | { from: 'me'; text?: string; file?: string }
  | { from: 'ai'; text: string; list?: { line: string; contact: string }[]; after?: string }

export type PackTerminalLine = { kind: 'cmd' | 'out' | 'ok' | 'note'; text: string }

export type PackLink = { label: string; href: string; /** Save as this file name instead of opening (same-site files only). */ download?: string }

/** One block of a guide: any mix of text, bullets, steps, a table, a copyable prompt, a video, links. */
export type PackGuideSection = {
  title: string
  text?: string
  bullets?: string[]
  steps?: string[]
  table?: { head: string[]; rows: string[][] }
  prompt?: { label: string; text: string }
  video?: { src: string; caption?: string }
  links?: PackLink[]
}

/** A blank the visitor fills in. The prompt holds {{key}}; an empty field shows as [token]. */
export type PackPromptField = { key: string; label: string; token: string; multiline?: boolean; options?: string[] }

export type PackPromptCard = {
  /** Short label above the title, e.g. "the whole Lead Machine in one prompt". */
  label: string
  title: string
  text: string
  prompt: string
  fields?: PackPromptField[]
  /** "See it work": rough input next to what comes back. */
  example?: { before: string; after: string }
}

/** The prompt with every {{key}} replaced by what was typed, or by [token] when empty. */
export function fillPrompt(card: PackPromptCard, values: Record<string, string> = {}): string {
  let out = card.prompt
  for (const f of card.fields || []) {
    const v = (values[f.key] || '').trim()
    out = out.split(`{{${f.key}}}`).join(v || `[${f.token}]`)
  }
  return out
}

export type PackWay = {
  title: string
  sub: string
  tags: { label: string; tone: PackTagTone }[]
  steps: string[]
  note?: string
  after?: string
}

export type PackPageContent = {
  /** Must equal the giveaway directory name: it tags captured emails in /api/lead-magnet. */
  slug: string
  /** The buyer's AI level. Picks the end offer (match offers to AI level). */
  level: GiveawayLevel
  hero: {
    title: string
    free: string
    lede: string
    button: { label: string; meta: string; target: PackSectionId }
    ticks: string[]
  }
  /** Two or three tiles under the hero. Every target must be a block this page has. */
  jumps: { target: PackSectionId; label: string; text: string }[]
  get?: {
    heading: string
    intro: string
    note?: { lead: string; link?: { label: string; target: PackSectionId }; rest?: string }
    primary?: { label: string; meta?: string; href: string; download?: string }
    secondary?: PackLink[]
    command?: { label: string; text: string }
  }
  /** "It does / It does not". */
  promise?: { heading: string; doesNot: string[]; does: string[] }
  /** Main body for guides. A page that passes an interactive child (quiz, builder) renders it here too. */
  guide?: { eyebrow: string; heading: string; intro?: string; sections: PackGuideSection[] }
  inside?: {
    heading: string
    example?: {
      kind: 'chat' | 'terminal'
      title: string
      /** Screen-reader description of the example. */
      label: string
      messages?: PackChatMessage[]
      lines?: PackTerminalLine[]
      note: string
    }
    words?: { heading: string; items: { word: string; text: string }[] }
    files?: { heading: string; items: { name: string; text: string }[] }
  }
  /** openLinks may contain {prompt} in the href: it is replaced by the filled prompt, URL-encoded (opens the chat pre-filled). */
  use?: { heading: string; intro: string; cards: PackPromptCard[]; openLinks: PackLink[] }
  ways?: { heading: string; intro: string; items: PackWay[] }
  stuck: { q: string; a: string; email?: string }[]
  /** One line that ties this free thing to the paid next step. */
  bridge: string
  /** Heading for the one email ask (only shown to people who did not come from the DM). */
  emailHeading: string
  /** True for giveaways promised as "no sign-up at all" (never ask for an email, even once). */
  noEmailAsk?: boolean
}

/** The blocks a page actually has, in render order. */
export function packSections(c: PackPageContent): PackSectionId[] {
  const out: PackSectionId[] = []
  if (c.get || c.promise) out.push('get')
  if (c.guide) out.push('guide')
  if (c.inside) out.push('inside')
  if (c.use && c.use.cards.length) out.push('use')
  if (c.ways && c.ways.items.length) out.push('ways')
  out.push('stuck')
  return out
}

/** True when the page gives the visitor something to copy or download (the moment we ask for the email). */
export function packHasAction(c: PackPageContent): boolean {
  return Boolean(
    c.get?.primary ||
      c.get?.secondary?.length ||
      c.get?.command ||
      (c.use && c.use.cards.length) ||
      c.guide?.sections.some((s) => s.prompt),
  )
}

const LEVELS: GiveawayLevel[] = ['beginner', 'builder']

/** Problems that would ship a broken or off-rule page. Empty list = good. Used by tests/pack-page.test.ts. */
export function validatePackContent(c: PackPageContent): string[] {
  const problems: string[] = []
  const have = new Set<PackSectionId>(packSections(c))
  if (!LEVELS.includes(c.level)) problems.push(`unknown level ${c.level}`)
  if (!have.has(c.hero.button.target)) problems.push(`hero button points at missing block "${c.hero.button.target}"`)
  if (c.jumps.length < 2 || c.jumps.length > 3) problems.push(`needs 2 or 3 jump tiles, has ${c.jumps.length}`)
  for (const j of c.jumps) if (!have.has(j.target)) problems.push(`jump "${j.label}" points at missing block "${j.target}"`)
  if (c.get?.note?.link && !have.has(c.get.note.link.target)) problems.push(`get note link points at missing block "${c.get.note.link.target}"`)
  if (!c.stuck.length) problems.push('needs at least one "Stuck?" line')
  if (!c.stuck.some((s) => s.email)) problems.push('the last "Stuck?" line should give a support email')
  for (const card of c.use?.cards || []) {
    if (!card.prompt.trim()) problems.push(`prompt card "${card.title}" is empty`)
    const keys = new Set((card.fields || []).map((f) => f.key))
    for (const m of card.prompt.matchAll(/\{\{(\w+)\}\}/g)) if (!keys.has(m[1])) problems.push(`prompt card "${card.title}" has {{${m[1]}}} but no field for it`)
    for (const k of keys) if (!card.prompt.includes(`{{${k}}}`)) problems.push(`prompt card "${card.title}" has a field "${k}" the prompt never uses`)
  }
  for (const s of c.guide?.sections || []) {
    if (!(s.text || s.bullets?.length || s.steps?.length || s.table || s.prompt || s.video || s.links?.length)) problems.push(`guide block "${s.title}" is empty`)
    if (s.table && s.table.rows.some((r) => r.length !== s.table!.head.length)) problems.push(`table in "${s.title}" has ragged rows`)
  }
  const json = JSON.stringify(c)
  if (/—/.test(json)) problems.push('contains an em dash')
  for (const m of json.matchAll(/"(?:href|src)":"([^"]+)"/g)) {
    if (!/^(https:\/\/|\/)/.test(m[1])) problems.push(`link is not https or site-relative: ${m[1]}`)
  }
  if (!c.bridge.trim()) problems.push('missing bridge line to the offer')
  return problems
}
