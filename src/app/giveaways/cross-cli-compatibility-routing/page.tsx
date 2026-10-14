import PackPage from '@/components/giveaways/PackPage'
import { ROUTING_PACK } from './pack'

// Cross CLI Compatibility Routing giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts and ./content.ts.

export default function CrossCliCompatibilityRoutingPage() {
  return <PackPage slug="cross-cli-compatibility-routing" content={ROUTING_PACK} />
}
