import PackPage from '@/components/giveaways/PackPage'
import { MACCLEANER_PACK } from './pack'

// MacCleaner giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

export default function MacCleanerPage() {
  return <PackPage slug="maccleaner" content={MACCLEANER_PACK} />
}
