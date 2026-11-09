import PackPage from '@/components/giveaways/PackPage'
import { GUARDOG_PACK } from './pack'

// GuardDog giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Install GuardDog for Claude Code',
  description:
    'A free package security scanner that checks npm and PyPI packages for known security holes and warning signs before you install them.',
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
      name: 'Copy the setup prompt',
      text: 'Copy the setup prompt from this page.',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: 'Paste it into Claude Code or Codex',
      text: 'It installs the myos-guard-dog command, helps you add a free VirusTotal key on your own computer, and runs a first check.',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: 'Check packages before you install them',
      text: 'Run myos-guard-dog analyze followed by a package name, or ask Claude to check it with GuardDog. You get one verdict: SILENT, WHINE or BARK.',
      position: 3,
    },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Claude Code' },
    { '@type': 'HowToTool', name: 'Terminal' },
  ],
  totalTime: 'PT3M',
}

export default function GuardogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="guardog" content={GUARDOG_PACK} />
    </>
  )
}
