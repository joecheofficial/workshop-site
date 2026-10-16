import PackPage from '@/components/giveaways/PackPage'
import { freeAiToolJsonLd, freeAiToolPack } from '@/lib/free-ai-tool-pack'

// Week 2 reel giveaway, keyword MEMORY ("MemPalace setup notes"), Illy approved 2026-10-16.
// Words live in src/lib/free-ai-tools.ts, shared with the delivery email.
const SLUG = 'free-ai-mempalace'

export default function FreeAiMempalacePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(freeAiToolJsonLd(SLUG)) }} />
      <PackPage slug="free-ai-mempalace" content={freeAiToolPack(SLUG)} />
    </>
  )
}
