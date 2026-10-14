import PackPage from '@/components/giveaways/PackPage'
import { IG_SETTINGS_PACK } from './pack'

// Instagram Settings Checklist giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

export default function IgSettingsPage() {
  return <PackPage slug="ig-settings" content={IG_SETTINGS_PACK} />
}
