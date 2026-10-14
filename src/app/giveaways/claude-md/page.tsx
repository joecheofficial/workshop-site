import PackPage from '@/components/giveaways/PackPage'
import { CLAUDE_MD_PACK } from './pack'

// Ultimate CLAUDE.md giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Stop Repeating Yourself to Claude with CLAUDE.md',
  description:
    'A free CLAUDE.md template that loads your rules, preferences, and project context automatically at the start of every Claude Code session.',
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
      name: 'Download the file',
      text: 'Download the free CLAUDE.md template. It lands in your Downloads folder ready to use.',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: 'Move it to your project root',
      text: 'Drop CLAUDE.md in the root folder of your project. That is the only place it needs to be.',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: 'Open Claude Code',
      text: 'Claude Code reads CLAUDE.md automatically. Your rules and context are loaded before you type a word.',
      position: 3,
    },
  ],
  tool: [{ '@type': 'HowToTool', name: 'Claude Code' }],
  totalTime: 'PT5M',
}

export default function ClaudeMdPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="claude-md" content={CLAUDE_MD_PACK} />
    </>
  )
}
