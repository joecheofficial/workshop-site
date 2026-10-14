import PackPage from '@/components/giveaways/PackPage'
import { LEAD_MAGNET_PACK } from './pack'

// Lead magnet giveaway (17 stories PDF), on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

export default function LeadMagnetPage() {
  return <PackPage slug="lead-magnet" content={LEAD_MAGNET_PACK} />
}
