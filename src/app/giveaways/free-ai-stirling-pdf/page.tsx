import PackPage from '@/components/giveaways/PackPage'
import { freeAiToolJsonLd, freeAiToolPack } from '@/lib/free-ai-tool-pack'

// Free AI Tools batch, keyword PAPER, on the pack page template (Illy, 2026-10-14).
// Words live in src/lib/free-ai-tools.ts, shared with the delivery email.
const SLUG = 'free-ai-stirling-pdf'

export default function FreeAiStirlingPdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(freeAiToolJsonLd(SLUG)) }} />
      <PackPage slug="free-ai-stirling-pdf" content={freeAiToolPack(SLUG)} />
    </>
  )
}
