import PackPage from '@/components/giveaways/PackPage'
import { VIRAL_HOOKS_PACK } from './pack'

// Visual Hooks giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

const MASTERMIND_URL = 'https://www.mastermindshq.business'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Understanding Visual Hooks',
  description: 'A free guide covering 7 visual techniques found in scroll-stopping reels, with 22 real examples to study.',
  author: { '@type': 'Person', name: 'Joe Che', url: MASTERMIND_URL },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: MASTERMIND_URL },
}

export default function ViralHooksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="viral-hooks" content={VIRAL_HOOKS_PACK} />
    </>
  )
}
