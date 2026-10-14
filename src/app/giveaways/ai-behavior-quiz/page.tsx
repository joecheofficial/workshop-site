import PackPage from '@/components/giveaways/PackPage'
import { AI_BEHAVIOR_QUIZ_PACK } from './pack'

// Quiz giveaway on the pack page template (Illy, 2026-10-14). Words in ./pack.ts.

export default function AiBehaviorQuizPage() {
  return <PackPage slug="ai-behavior-quiz" content={AI_BEHAVIOR_QUIZ_PACK} />
}
