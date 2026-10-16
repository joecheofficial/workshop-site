import PackPage from '@/components/giveaways/PackPage'
import { FREE_AI_TOOLS_HUB_URL, freeAiSwapRows } from '@/lib/free-ai-tools-hub'
import { FREE_AI_TOOLS_HUB_PACK } from './pack'

// Free AI Tools hub, keyword SWAP (paid app vs free swap carousel, 21 Oct 2026).
// Words in ./pack.ts, swaps in src/lib/free-ai-tools-hub.ts.

const SITE = 'https://workshop.mastermindshq.business'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '10 free swaps for the paid apps you use',
  url: FREE_AI_TOOLS_HUB_URL,
  itemListElement: freeAiSwapRows().map((r, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${r.paid} to ${r.tool.name}`,
    url: `${SITE}${r.path}`,
  })),
}

export default function FreeAiToolsHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="free-ai-tools" content={FREE_AI_TOOLS_HUB_PACK} />
    </>
  )
}
