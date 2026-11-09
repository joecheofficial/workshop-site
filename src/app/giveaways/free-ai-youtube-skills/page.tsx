import PackPage from '@/components/giveaways/PackPage'
import { freeAiToolJsonLd, freeAiToolPack } from '@/lib/free-ai-tool-pack'

// Week 5 Sunday reel giveaway, keyword YOUTUBE ("YouTube Agent Skill setup notes"), Sun 15 Nov 2026, PREVIEW, awaits Illy.
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
