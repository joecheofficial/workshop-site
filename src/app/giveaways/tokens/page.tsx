import PackPage from '@/components/giveaways/PackPage'
import { TOKENS_PACK } from './pack'

// Token Diet giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: "The Token Diet: cut your AI agents' token use",
  description:
    'Four changes, including RTK trimming 70% of noisy command output before my agents read it, with 1.4 billion tokens my agents never had to read.',
  author: {
    '@type': 'Person',
    name: 'Joe Che',
    url: 'https://www.mastermindshq.business',
  },
  publisher: {
    '@type': 'Organization',
    name: 'AI Business Mastermind',
    url: 'https://www.mastermindshq.business',
  },
  step: [
    {
      '@type': 'HowToStep',
      name: 'Filter the noise before AI reads it',
      text: 'Install RTK with brew install rtk, create ~/.claude, run rtk init -g --auto-patch to install its Claude Code hook without prompts, restart Claude Code so the hook loads, work normally for a day or two, then run rtk gain to see your savings.',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: 'Use the cheapest model that can do each job',
      text: 'Small, fast models for lookups and formatting, a mid model for everyday coding and writing, the top model only for architecture, hard debugging and high-stakes writing.',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: 'Audit your CLAUDE.md',
      text: 'Have Claude compare yours to my Ultimate CLAUDE.md and keep only what fits.',
      position: 3,
    },
    {
      '@type': 'HowToStep',
      name: 'Let a router decide before a big model runs',
      text: 'Put a router in front of every request: a free safety gate for read-only commands, saved recipes for known jobs, project indexes for context, then the cheapest capable model. Use a small classifier for the routing decisions.',
      position: 4,
    },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Claude Code' },
    { '@type': 'HowToTool', name: 'RTK' },
  ],
  totalTime: 'PT15M',
}

export default function TokensPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="tokens" content={TOKENS_PACK} />
    </>
  )
}
