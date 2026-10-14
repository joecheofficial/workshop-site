import PackPage from '@/components/giveaways/PackPage'
import { FABLE_PACK } from './pack'

// Fable Worth-It Audit giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Audit your codebase for where Claude Fable 5 is worth using',
  description: 'A free Claude Code prompt that ranks where to use Sonnet, Fable, or Managed Agents in a real codebase.',
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Score your task', text: 'Score your workflow for risk, context, duration, ambiguity, and verification difficulty.', position: 1 },
    { '@type': 'HowToStep', name: 'Copy the prompt', text: 'Paste the Fable Worth-It Audit prompt into Claude Code from your repository root.', position: 2 },
    { '@type': 'HowToStep', name: 'Pick the first experiment', text: 'Use the ranked output to decide whether Sonnet, Fable, Opus, or Managed Agents is the right tool.', position: 3 },
  ],
  tool: [{ '@type': 'HowToTool', name: 'Claude Code' }],
  totalTime: 'PT10M',
}

export default function FableWorthItAuditPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="fable-worth-it-audit" content={FABLE_PACK} />
    </>
  )
}
