import PackPage from '@/components/giveaways/PackPage'
import { freeAiToolJsonLd, freeAiToolPack } from '@/lib/free-ai-tool-pack'

// 20 effects reel giveaway, keyword EDIT ("FX Pack setup notes"), Wed 2 Dec 2026. Illy 25 Nov: "package all the effects in this video and give them as a giveaway".
// Words live in src/lib/free-ai-tools.ts, shared with the delivery email.
const SLUG = 'free-ai-fx-pack'

export default function FreeAiFxPackPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(freeAiToolJsonLd(SLUG)) }} />
      <PackPage slug="free-ai-fx-pack" content={freeAiToolPack(SLUG)} />
    </>
  )
}
