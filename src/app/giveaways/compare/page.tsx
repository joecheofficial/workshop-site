import PackPage from '@/components/giveaways/PackPage'
import { COMPARE_PACK } from './pack'

// Compare giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

export default function ComparePage() {
  return <PackPage slug="compare" content={COMPARE_PACK} />
}
