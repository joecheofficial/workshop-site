import PackPage from '@/components/giveaways/PackPage'
import { AI_LEVELS_QUIZ_PACK } from './pack'

// Quiz giveaway on the pack page template (Illy, 2026-10-14). Words in ./pack.ts.

export default function AiLevelsQuizPage() {
  return <PackPage slug="ai-levels-quiz" content={AI_LEVELS_QUIZ_PACK} />
}
