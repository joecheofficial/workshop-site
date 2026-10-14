import PackPage from '@/components/giveaways/PackPage'
import { GUARDOG_PACK } from './pack'

// GuardDog giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Install GuardDog for Claude Code',
  description:
    'A free package security scanner that checks npm and PyPI packages for malware, CVEs, and suspicious patterns before you install them.',
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
      name: 'Copy the install command',
      text: 'Copy the one-line install command from this page.',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: 'Run it in your terminal',
      text: 'Paste and run the command in your terminal. It clones the repo, installs dependencies, sets up the Claude Code skill, and optionally walks you through adding a free VirusTotal API key.',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: 'Type /guardog in Claude Code',
      text: 'Open Claude Code and type /guardog followed by any package name. GuardDog scans it and tells you whether it is safe to install.',
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
