import PackPage from '@/components/giveaways/PackPage'
import { COST_STACK_PACK } from './pack'

// Cost Stack Audit giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Run the Cost Stack Audit on your business software',
  description:
    'Add up what you pay for business software, hosting and people every year, then paste one prompt into an AI chat to see which parts you could run yourself.',
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'List what you pay for', text: 'Write down each tool, hosting bill and person you pay, with the real price.', position: 1 },
    { '@type': 'HowToStep', name: 'Total it for the year', text: 'Multiply monthly costs by 12 and add them up.', position: 2 },
    { '@type': 'HowToStep', name: 'Paste the audit prompt', text: 'Add your list to the prompt and paste it into Claude, Claude Code or ChatGPT.', position: 3 },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Claude' },
    { '@type': 'HowToTool', name: 'ChatGPT' },
  ],
}

export default function CostStackPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="cost-stack" content={COST_STACK_PACK} />
    </>
  )
}
