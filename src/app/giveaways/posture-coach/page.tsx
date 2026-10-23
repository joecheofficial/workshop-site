import PackPage from '@/components/giveaways/PackPage'
import { POSTURE_COACH_CONTENT } from './pack'

// Posture Coach giveaway (IG keyword POSTURE, 23 Oct 2026), on the pack page template.
// A cartoon of the user, made by their own Claude Code, pops up every 20 minutes with a desk stretch.
// Source app: workspace agents/repo-giveaways/posture-buddy (built on Ravi the Ravioli, MIT).

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Build your own Posture Coach with Claude Code',
  description:
    'A free Mac app where a cartoon of you pops up every 20 minutes with a quick desk stretch. Claude Code makes the cartoon from your photo and builds the app on your Mac.',
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Open Claude Code', text: 'Open Terminal on your Mac and type claude.', position: 1 },
    { '@type': 'HowToStep', name: 'Paste the prompt', text: 'Paste the Posture Coach prompt from the page.', position: 2 },
    { '@type': 'HowToStep', name: 'Make your cartoon', text: 'Drag in a photo of yourself, or answer 5 quick questions, and check the preview.', position: 3 },
    { '@type': 'HowToStep', name: 'Stretch', text: 'Claude Code builds the app. Your cartoon appears in the menu bar and nudges you every 20 minutes.', position: 4 },
  ],
  tool: [{ '@type': 'HowToTool', name: 'Claude Code' }],
  totalTime: 'PT10M',
}

export default function PostureCoachPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="posture-coach" content={POSTURE_COACH_CONTENT} />
    </>
  )
}
