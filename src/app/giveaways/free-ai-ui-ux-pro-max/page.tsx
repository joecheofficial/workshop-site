import PackPage from '@/components/giveaways/PackPage'
import { freeAiToolJsonLd, freeAiToolPack } from '@/lib/free-ai-tool-pack'

// Week 2 reel giveaway, keyword STYLE ("UI UX Pro Max setup notes"), Illy approved 2026-10-16.
// Words live in src/lib/free-ai-tools.ts, shared with the delivery email.
const SLUG = 'free-ai-ui-ux-pro-max'

export default function FreeAiUiUxProMaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(freeAiToolJsonLd(SLUG)) }} />
      <PackPage slug="free-ai-ui-ux-pro-max" content={freeAiToolPack(SLUG)} />
    </>
  )
}
