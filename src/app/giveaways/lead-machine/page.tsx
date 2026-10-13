import PackPage from '@/components/giveaways/PackPage'
import { LEAD_MACHINE_CONTENT } from './content'

// Lead Machine giveaway, on the pack page template (Illy, 2026-10-13).
// Email ask, layout and the end offer live in PackPage; words in ./content.ts.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Get 25 real leads with the Lead Machine',
  description:
    'Paste one prompt into ChatGPT or Claude and get 25 real businesses that fit who you serve, each with a real public way to reach them.',
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Copy the prompt', text: 'Copy the Lead Machine prompt from the page.', position: 1 },
    { '@type': 'HowToStep', name: 'Paste it into a new chat', text: 'Open ChatGPT or Claude, start a new chat, paste it and send.', position: 2 },
    { '@type': 'HowToStep', name: 'Answer one question', text: 'Say cold, warm, or both. You get 25 leads back in the chat.', position: 3 },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'ChatGPT' },
    { '@type': 'HowToTool', name: 'Claude' },
  ],
  totalTime: 'PT2M',
}

export default function LeadMachinePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="lead-machine" content={LEAD_MACHINE_CONTENT} />
    </>
  )
}
