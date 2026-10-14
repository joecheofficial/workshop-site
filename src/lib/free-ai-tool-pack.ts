import { formatStars, getFreeAiTool } from './free-ai-tools'
import type { FreeAiTool } from './free-ai-tools'
import type { PackPageContent } from './pack-page'

// ---------------------------------------------------------------------------
// Free AI Tools pages on the pack page template (Illy, 2026-10-14).
// Every word comes from the shared table in src/lib/free-ai-tools.ts (the same
// table the delivery email reads), so a fix there fixes the page and the email.
// ---------------------------------------------------------------------------

const MASTERMIND_URL = 'https://www.mastermindshq.business'

export function freeAiToolPack(slug: string): PackPageContent {
  const t: FreeAiTool = getFreeAiTool(slug)
  const sameAsTool = t.githubUrl === t.toolUrl
  return {
    slug: t.slug,
    level: 'beginner',
    hero: {
      title: `Here is ${t.name}.`,
      free: 'It is free.',
      lede: t.subline,
      button: { label: 'Show me the setup', meta: `${t.steps.length} steps · on this page`, target: 'guide' },
      ticks: ['No sign-up here', 'Free and open source', `${formatStars(t.stars)} stars on GitHub`],
    },
    jumps: [
      { target: 'get', label: 'Get it', text: `Open ${t.name}${sameAsTool ? '' : ' and its GitHub page'}.` },
      { target: 'guide', label: 'Set it up', text: `${t.steps.length} steps, then how I would use it.` },
      { target: 'stuck', label: 'Get unstuck', text: 'The usual problems, and the fix for each.' },
    ],
    get: {
      heading: t.name,
      intro: t.intro,
      primary: { label: t.primaryLabel, href: t.toolUrl },
      secondary: sameAsTool ? [] : [{ label: 'See it on GitHub', href: t.githubUrl }],
    },
    guide: {
      eyebrow: 'Set it up',
      heading: `Set it up in ${t.steps.length} steps`,
      intro: t.tagline,
      sections: [
        { title: 'The steps', steps: t.steps },
        { title: "How I'd use it", bullets: t.howIUse },
        { title: 'Good to know', text: t.goodToKnow },
        { title: 'Links', links: t.links.map((l) => ({ label: l.label, href: l.url })) },
        {
          title: 'Why I share it',
          text: `I don't make ${t.name} and nobody pays me to share it. It's just a free tool I think is worth ten minutes of your time. Try it this week and tell me what you used it for first.`,
        },
      ],
    },
    stuck: [
      { q: 'I do not know where to start', a: `Do step 1 only. Open ${t.name}, then come back here for step 2.` },
      {
        q: 'My screen looks different from the steps',
        a: `Apps change their screens. Use the official links above, which the people who make ${t.name} keep up to date.`,
      },
      { q: 'Is there a catch?', a: t.goodToKnow },
      { q: 'None of these fixed it', email: 'joe@mastermindshq.business', a: 'Say which step you were on and paste what you saw.' },
    ],
    bridge: `You came for a free tool. The next step is a website you own, built by you, that you can change any time.`,
    emailHeading: `Want my ${t.name} setup notes in your inbox?`,
  }
}

export function freeAiToolJsonLd(slug: string) {
  const t = getFreeAiTool(slug)
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `${t.name}: free setup notes`,
    description: t.intro,
    author: { '@type': 'Person', name: 'Joe Che', url: MASTERMIND_URL },
    publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: MASTERMIND_URL },
    step: t.steps.map((text, i) => ({ '@type': 'HowToStep', position: i + 1, text })),
    tool: [{ '@type': 'HowToTool', name: t.name }],
    totalTime: 'PT10M',
  }
}
