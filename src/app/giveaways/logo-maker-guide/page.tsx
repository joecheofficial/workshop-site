import PackPage from '@/components/giveaways/PackPage'
import { LOGO_MAKER_GUIDE_PACK } from './pack'

// Logo maker guide, on the pack page template (Illy approved 15 Oct 2026).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

export default function LogoMakerGuidePage() {
  return <PackPage slug="logo-maker-guide" content={LOGO_MAKER_GUIDE_PACK} />
}
