import PackPage from '@/components/giveaways/PackPage'
import { freeAiToolJsonLd, freeAiToolPack } from '@/lib/free-ai-tool-pack'

// Week 2 reel giveaway, keyword DATA ("Firecrawl setup notes"), Illy approved 2026-10-16.
// Words live in src/lib/free-ai-tools.ts, shared with the delivery email.
const SLUG = 'free-ai-firecrawl'

export default function FreeAiFirecrawlPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(freeAiToolJsonLd(SLUG)) }} />
      <PackPage slug="free-ai-firecrawl" content={freeAiToolPack(SLUG)} />
    </>
  )
}
