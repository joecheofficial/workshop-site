// DRAFT, NOT DEPLOYED. Goes to workshop-site src/app/giveaways/free-ai-salesman/page.tsx
// after Illy's go. Same shape as the live Free AI Tools pages (e.g. free-ai-handy): PackPage + freeAiToolPack.
import PackPage from '@/components/giveaways/PackPage'
import { freeAiToolJsonLd, freeAiToolPack } from '@/lib/free-ai-tool-pack'

// Joe's Salesman, keyword SALESMAN, on the pack page template.
// Words live in src/lib/free-ai-tools.ts, shared with the delivery email.
const SLUG = 'free-ai-salesman'

export default function FreeAiSalesmanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(freeAiToolJsonLd(SLUG)) }} />
      <PackPage slug="free-ai-salesman" content={freeAiToolPack(SLUG)} />
    </>
  )
}
