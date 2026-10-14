import PackPage from '@/components/giveaways/PackPage'
import { SQUARESPACE_ESCAPE_PACK } from './pack'

// Squarespace Escape Kit giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

export default function SquarespaceEscapePage() {
  return <PackPage slug="squarespace-escape" content={SQUARESPACE_ESCAPE_PACK} />
}
