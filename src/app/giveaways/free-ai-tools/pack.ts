import type { PackPageContent } from '@/lib/pack-page'
import { FREE_AI_TOOLS_HUB_SLUG, freeAiSwapRows } from '@/lib/free-ai-tools-hub'

// Words for the Free AI Tools hub (keyword SWAP, the "paid app vs free swap"
// carousel of 21 Oct 2026). Layout, the email ask and the end offer live in
// src/components/giveaways/PackPage.tsx. The swaps live in src/lib/free-ai-tools-hub.ts.
//
// Level: beginner. These are everyday business apps (PDFs, contracts, booking,
// notes) for people who are not technical, the same level as the ten tool pages
// it links to, so it ends with the Website Workshop like them. Get Found needs
// Claude Code, which this audience does not have yet.

const rows = freeAiSwapRows()

export const FREE_AI_TOOLS_HUB_PACK: PackPageContent = {
  slug: FREE_AI_TOOLS_HUB_SLUG,
  level: 'beginner',
  hero: {
    title: 'Here are the 10 free swaps.',
    free: 'They are free.',
    lede: 'Ten paid apps a small business pays for every month, and the free tool I would use instead. Each one links to my setup notes: 3 steps, tips and the official links.',
    button: { label: 'Show me the swaps', meta: '10 swaps · on this page', target: 'guide' },
    ticks: ['No sign-up here', 'Free plan or open source', 'Setup notes for each one'],
  },
  jumps: [
    { target: 'guide', label: 'The 10 swaps', text: 'Paid app, free tool, one line each.' },
    { target: 'stuck', label: 'Get unstuck', text: 'The usual questions, and the answer to each.' },
  ],
  guide: {
    eyebrow: 'The swaps',
    heading: 'Paid app, free swap',
    intro: 'Tap a swap to open my setup notes for that tool.',
    sections: [
      {
        title: 'The 10 swaps',
        links: rows.map((r) => ({ label: `${r.paid} to ${r.tool.name}: ${r.line}`, href: r.path })),
      },
      {
        title: 'Before you cancel anything',
        bullets: [
          'Every swap has a free plan or is open source. None of them need a card to start.',
          'A free plan does not always do everything the paid app does. Each tool page says exactly what the free plan covers.',
          'This list is not sponsored. Nobody pays me to share these tools.',
        ],
      },
      {
        title: 'Where to start',
        bullets: [
          'Start with the paid app you open least. It is the easiest one to swap.',
          'Try the free tool for a week next to the paid one. Cancel only when you have stopped opening the old one.',
          'Not technical? Cal.com, Documenso, Excalidraw and Stirling PDF are the easiest four.',
        ],
      },
      {
        title: 'Good to know',
        text: 'Documenso is free for 5 documents a month. Cal.com is free for one person. Stirling PDF is free for individual use. Claude Skills need a paid Claude plan. Jan, Buzz and Upscayl run on your own computer, so they need a fairly new one. Every tool page lists its own catch.',
      },
      {
        title: 'Why I share them',
        text: "I don't make any of these tools and nobody pays me to share them. They are free tools I think are worth ten minutes of your time. Pick one this week and tell me which bill you cancelled first.",
      },
    ],
  },
  stuck: [
    { q: 'I do not know which one to pick', a: 'Pick the paid app you pay for and open least. Open its swap above and do step 1 only.' },
    { q: 'Is there a catch?', a: 'Some free plans have limits, like 5 documents a month or one person. Each tool page says exactly what the free plan covers.' },
    { q: 'My screen looks different from the steps', a: 'Apps change their screens. Use the official links on each tool page, which the people who make the tool keep up to date.' },
    { q: 'None of these fixed it', email: 'joe@mastermindshq.business', a: 'Say which tool and which step you were on, and paste what you saw.' },
  ],
  bridge: 'You came for free tools. The next step is a website you own, built by you, that you can change any time.',
  emailHeading: 'Want all 10 swaps in your inbox?',
}
