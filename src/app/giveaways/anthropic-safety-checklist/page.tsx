import PackPage from '@/components/giveaways/PackPage'
import { SAFETY_PACK } from './pack'

// Anthropic Ban Risk Audit giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Anthropic Ban Risk Audit Prompt',
  description:
    'A free prompt that audits a codebase for Claude, Claude Code, profile switching, account rotation, and API routing risks.',
  author: { '@type': 'Person', name: 'Joe Che', email: 'joe@mastermindshq.business', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Copy the audit prompt', text: 'Copy the free Anthropic safety audit prompt.', position: 1 },
    { '@type': 'HowToStep', name: 'Run it in your project', text: 'Paste the prompt into Claude Code, Codex, or Gemini CLI at the project root.', position: 2 },
    { '@type': 'HowToStep', name: 'Refactor risky automation', text: 'Move unattended work to APIs, remove profile switching, and keep consumer Claude use human-operated.', position: 3 },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Claude Code' },
    { '@type': 'HowToTool', name: 'Codex' },
    { '@type': 'HowToTool', name: 'Gemini CLI' },
  ],
}

export default function AnthropicSafetyChecklistPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="anthropic-safety-checklist" content={SAFETY_PACK} />
    </>
  )
}
