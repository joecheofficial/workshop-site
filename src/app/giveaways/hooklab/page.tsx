import PackPage from '@/components/giveaways/PackPage'
import { HOOKLAB_PACK } from './pack'

// HookLab giveaway, on the pack page template (Illy approved 15 Oct 2026).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts,
// the install prompt in ./content.ts.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Install HookLab for Claude Code',
  description:
    'A free Claude Code skill that writes five scored Instagram Reel hooks, with a full script for each, from your brand voice profile.',
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Copy the install prompt', text: 'Copy the install prompt from this page.', position: 1 },
    { '@type': 'HowToStep', name: 'Paste it into Claude Code', text: 'Paste it into the Claude Code chat. It creates the hook-lab skill file for you.', position: 2 },
    { '@type': 'HowToStep', name: 'Type /hook-lab', text: 'Start a new session, type /hook-lab, then paste your brand voice profile and this week\'s topic.', position: 3 },
  ],
  tool: [{ '@type': 'HowToTool', name: 'Claude Code' }],
  totalTime: 'PT4M',
}

export default function HookLabPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="hooklab" content={HOOKLAB_PACK} />
    </>
  )
}
