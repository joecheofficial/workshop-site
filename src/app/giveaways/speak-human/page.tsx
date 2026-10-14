import PackPage from '@/components/giveaways/PackPage'
import { SPEAK_HUMAN_PACK } from './pack'

// Speak Human giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.
// /giveaways/human re-exports this page and stays as it is.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Install the Speak Human Skill for Claude Code',
  description:
    'A free Claude Code skill that strips AI writing patterns and rewrites in your actual voice. Learns from your podcasts, books, and Instagram content.',
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Copy the setup request', text: 'Copy the setup request from this page.', position: 1 },
    {
      '@type': 'HowToStep',
      name: 'Paste it into Claude Code or Codex',
      text: 'Paste it into the assistant chat, not Terminal. The assistant downloads the current release, installs it in the right skills folder and checks it works.',
      position: 2,
    },
    { '@type': 'HowToStep', name: 'Ask for a rewrite', text: 'Paste a draft and say: Use Speak Human to make this sound like me.', position: 3 },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Claude Code' },
    { '@type': 'HowToTool', name: 'Codex' },
  ],
  totalTime: 'PT2M',
}

export default function SpeakHumanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="speak-human" content={SPEAK_HUMAN_PACK} />
    </>
  )
}
