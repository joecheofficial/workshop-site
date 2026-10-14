import PackPage from '@/components/giveaways/PackPage'
import CostStackCalculator from './CostStackCalculator'
import { COST_STACK_PACK } from './pack'

// Cost Stack Audit giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts, the calculator in ./CostStackCalculator.tsx.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Run the Cost Stack Audit on your business software',
  description:
    'Add up what you pay for business software, hosting and people every year, then paste one prompt into an AI chat to see which parts you could run yourself.',
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Tick what you pay for', text: 'Tick each tool, hosting bill and person you pay, and change each price to your real one.', position: 1 },
    { '@type': 'HowToStep', name: 'See your yearly total', text: 'The calculator adds up your year as you type.', position: 2 },
    { '@type': 'HowToStep', name: 'Paste the audit prompt', text: 'Copy the prompt it writes from your list and paste it into Claude or ChatGPT.', position: 3 },
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
      <PackPage slug="cost-stack" content={COST_STACK_PACK}>
        <CostStackCalculator />
      </PackPage>
    </>
  )
}
