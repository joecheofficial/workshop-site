import PackPage from '@/components/giveaways/PackPage'
import { freeAiToolJsonLd, freeAiToolPack } from '@/lib/free-ai-tool-pack'

// Free AI Tools batch, keyword SKILL, on the pack page template (Illy, 2026-10-14).
// Words live in src/lib/free-ai-tools.ts, shared with the delivery email.
const SLUG = 'free-ai-claude-skills'

export default function FreeAiClaudeSkillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(freeAiToolJsonLd(SLUG)) }} />
      <PackPage slug="free-ai-claude-skills" content={freeAiToolPack(SLUG)} />
    </>
  )
}
