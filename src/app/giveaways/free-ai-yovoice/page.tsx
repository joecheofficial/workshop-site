import PackPage from '@/components/giveaways/PackPage'
import { freeAiToolJsonLd, freeAiToolPack } from '@/lib/free-ai-tool-pack'

// Week 5 reel giveaway, keyword SONG ("yovoice setup notes"), Tue 10 Nov 2026, Illy approved 2026-11-07.
// Words live in src/lib/free-ai-tools.ts, shared with the delivery email.
const SLUG = 'free-ai-yovoice'

export default function FreeAiYovoicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(freeAiToolJsonLd(SLUG)) }} />
      <PackPage slug="free-ai-yovoice" content={freeAiToolPack(SLUG)} />
    </>
  )
}
