import PackPage from '@/components/giveaways/PackPage'
import BusinessBuilderQuiz from './BusinessBuilderQuiz'
import { BUSINESS_BUILDER_QUIZ_PACK } from './pack'

// Founder-readiness quiz on the pack page template (Illy, 2026-10-14). Words in ./pack.ts,
// the quiz in ./BusinessBuilderQuiz.tsx.

export default function BusinessBuilderQuizPage() {
  return (
    <PackPage slug="business-builder-quiz" content={BUSINESS_BUILDER_QUIZ_PACK}>
      <BusinessBuilderQuiz />
    </PackPage>
  )
}
