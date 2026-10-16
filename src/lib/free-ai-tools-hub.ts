import { getFreeAiTool } from './free-ai-tools'
import type { FreeAiTool } from './free-ai-tools'

// ---------------------------------------------------------------------------
// The Free AI Tools hub: /giveaways/free-ai-tools, Instagram keyword SWAP
// (the "paid app vs free swap" carousel, posting 21 Oct 2026, approved by Illy
// 16 Oct). One line per swap: the paid app people already pay for, and the free
// tool page we already have. Tool names, taglines and links come from the shared
// table in src/lib/free-ai-tools.ts, so the hub, the ten tool pages and both
// delivery emails always agree.
//
// No prices here on purpose: paid plans change, the page lives for months. The
// carousel carries the prices that were checked on the day it was made.
// ---------------------------------------------------------------------------

export const FREE_AI_TOOLS_HUB_SLUG = 'free-ai-tools'
export const FREE_AI_TOOLS_HUB_URL = `https://workshop.mastermindshq.business/giveaways/${FREE_AI_TOOLS_HUB_SLUG}`

export type FreeAiSwap = {
  /** The free tool's giveaway page slug in src/lib/free-ai-tools.ts. */
  slug: string
  /** The paid app it replaces, as people know it. */
  paid: string
  /** What the swap does for you, in plain words. One line. */
  line: string
}

/** Carousel order first (slides 2 to 10), then the bonus 10th swap. */
export const FREE_AI_SWAPS: FreeAiSwap[] = [
  { slug: 'free-ai-stirling-pdf', paid: 'Adobe Acrobat Pro', line: '50+ PDF tools in one free app: merge, shrink, sign and convert.' },
  { slug: 'free-ai-documenso', paid: 'DocuSign', line: 'Contracts signed from a phone. The free plan covers 5 documents a month.' },
  { slug: 'free-ai-cal-com', paid: 'Calendly', line: 'One booking link. People pick a time, it books the call and sends reminders.' },
  { slug: 'free-ai-buzz', paid: 'Otter.ai', line: 'Turns calls, voice notes and videos into text, offline on your computer.' },
  { slug: 'free-ai-handy', paid: 'Wispr Flow', line: 'Hold a key and talk. It types for you in any app.' },
  { slug: 'free-ai-excalidraw', paid: 'Miro', line: 'A whiteboard in your browser. No download, no account.' },
  { slug: 'free-ai-upscayl', paid: 'Topaz Gigapixel', line: 'Drag in a blurry photo and AI makes it bigger and sharper.' },
  { slug: 'free-ai-jan', paid: 'ChatGPT Plus', line: 'A ChatGPT-style app that runs offline, for client info you would never paste online.' },
  { slug: 'free-ai-anythingllm', paid: 'ChatPDF', line: 'Ask questions about your own PDFs and notes. Answers show the source.' },
  { slug: 'free-ai-claude-skills', paid: 'Paid prompt packs', line: "Anthropic's free skill library teaches Claude your way of working once. Needs a paid Claude plan." },
]

export type FreeAiSwapRow = FreeAiSwap & { tool: FreeAiTool; path: string }

/** Each swap joined to its tool entry, with the site path of the tool's page. */
export function freeAiSwapRows(): FreeAiSwapRow[] {
  return FREE_AI_SWAPS.map((s) => ({ ...s, tool: getFreeAiTool(s.slug), path: `/giveaways/${s.slug}` }))
}
