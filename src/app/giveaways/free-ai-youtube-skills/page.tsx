import PackPage from '@/components/giveaways/PackPage'
import { freeAiToolJsonLd, freeAiToolPack } from '@/lib/free-ai-tool-pack'

// Week 5 Sunday reel giveaway, keyword YOUTUBE ("Claude Video Skills setup notes"; Illy 9 Nov: no YouTube in the name, too niche), Sun 15 Nov 2026, LIVE.
// Words live in src/lib/free-ai-tools.ts, shared with the delivery email.
const SLUG = 'free-ai-youtube-skills'

export default function FreeAiYoutubeSkillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(freeAiToolJsonLd(SLUG)) }} />
      <PackPage slug="free-ai-youtube-skills" content={freeAiToolPack(SLUG)} />
    </>
  )
}
