import PackPage from '@/components/giveaways/PackPage'
import { freeAiToolJsonLd, freeAiToolPack } from '@/lib/free-ai-tool-pack'

// Week 5 reel giveaway, keyword PHOTO ("Compositor setup notes"), Mon 9 Nov 2026, Illy approved 2026-11-07.
// Words live in src/lib/free-ai-tools.ts, shared with the delivery email.
const SLUG = 'free-ai-compositor'

export default function FreeAiCompositorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(freeAiToolJsonLd(SLUG)) }} />
      <PackPage slug="free-ai-compositor" content={freeAiToolPack(SLUG)} />
    </>
  )
}
