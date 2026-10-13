import type { GiveawayLevel } from './giveaway-offers'

// ---------------------------------------------------------------------------
// Content shape for the pack-style giveaway page (src/components/giveaways/
// PackPage.tsx). Structure copied from Avi Grondin's free-pack page and
// approved by Illy on 2026-10-13:
//
//   hero -> get it -> what it looks like -> use it now -> ways to run it
//   -> stuck? find your line -> one matched paid offer at the very end
//
// Pages supply words only. Layout, the email ask and the offer live in the
// component and in src/lib/giveaway-offers.ts, so every pack page behaves
// the same way. Rules: docs/giveaways/PROCESS.md, "Pack page template".
// ---------------------------------------------------------------------------

export type PackTagTone = 'easy' | 'warn' | 'plain'

export type PackChatMessage =
  | { from: 'me'; text?: string; file?: string }
  | { from: 'ai'; text: string; list?: { line: string; contact: string }[]; after?: string }

export type PackPageContent = {
  /** Must equal the giveaway directory name: it tags captured emails in /api/lead-magnet. */
  slug: string
  /** The buyer's AI level. Picks the end offer (match offers to AI level). */
  level: GiveawayLevel
  hero: {
    title: string
    free: string
    lede: string
    button: { label: string; meta: string }
    ticks: string[]
  }
  jumps: { get: string; use: string; stuck: string }
  get: {
    heading: string
    intro: string
    phone: { lead: string; link: string; rest: string }
    primary: { label: string; meta: string; href: string }
    secondary?: { label: string; href: string }
  }
  doesHeading: string
  doesNot: string[]
  does: string[]
  example: {
    heading: string
    chatTitle: string
    label: string
    messages: PackChatMessage[]
    note: string
  }
  words: { word: string; text: string }[]
  files: { name: string; text: string }[]
  use: {
    heading: string
    intro: string
    cardLabel: string
    cardTitle: string
    cardText: string
    prompt: string
    openLinks: { label: string; href: string }[]
  }
  ways: {
    title: string
    sub: string
    tags: { label: string; tone: PackTagTone }[]
    steps: string[]
    note?: string
    after?: string
  }[]
  stuck: { q: string; a: string; email?: string }[]
  /** One line that ties this free thing to the paid next step. */
  bridge: string
  /** Heading for the one email ask (only shown to people who did not come from the DM). */
  emailHeading: string
}
