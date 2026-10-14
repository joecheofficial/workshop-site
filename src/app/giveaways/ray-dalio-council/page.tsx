import PackPage from '@/components/giveaways/PackPage'
import { DALIO_PACK } from './pack'

// Ray Dalio Council giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Install the Ray Dalio Council Skill for Claude Code and Codex',
  description:
    'A free Claude Code and Codex skill that runs a Ray Dalio-style believability-weighted decision council. Five scouts argue your question. One synthesizer weighs them. You get PROCEED, HOLD, or INVESTIGATE.',
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Copy the install command', text: 'Copy the one-line install command from this page.', position: 1 },
    {
      '@type': 'HowToStep',
      name: 'Run it in your terminal',
      text: 'Paste and run the command in your terminal. It downloads one file into your Claude Code and Codex skills folders. No git needed.',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: 'Type /dalio in Claude Code or $dalio in Codex',
      text: 'Open Claude Code and type /dalio followed by any decision, or open Codex and type $dalio. The council runs immediately.',
      position: 3,
    },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Claude Code' },
    { '@type': 'HowToTool', name: 'Codex' },
    { '@type': 'HowToTool', name: 'Terminal' },
  ],
  totalTime: 'PT2M',
}

export default function RayDalioCouncilPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="ray-dalio-council" content={DALIO_PACK} />
    </>
  )
}
