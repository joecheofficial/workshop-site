import type { PackPageContent } from '@/lib/pack-page'

// Founder-readiness quiz giveaway (keyword WIN), on the pack page template (Illy, 2026-10-14).
// The quiz itself is ./BusinessBuilderQuiz.tsx, shown inside the guide block.

export const BUSINESS_BUILDER_QUIZ_PACK: PackPageContent = {
  slug: 'business-builder-quiz',
  level: 'beginner',
  hero: {
    title: 'Here is the founder readiness quiz.',
    free: 'It is free.',
    lede: '6 questions. No fluff. Find out where you actually stand.',
    button: { label: 'Take me to the quiz', meta: 'free · on this page', target: 'guide' },
    ticks: ['No sign-up', '6 questions', 'Your result right here'],
  },
  jumps: [
    { target: 'guide', label: 'Take the quiz', text: '6 questions, your result on this page.' },
    { target: 'stuck', label: 'Get unstuck', text: 'The usual problems, and the fix for each.' },
  ],
  guide: {
    eyebrow: 'The quiz',
    heading: 'Do you have what it takes to build your own business?',
    intro:
      'Most people either overestimate their readiness to build something of their own, or talk themselves out of it before they start. This quiz scores you across five research-backed levels of founder readiness, from not yet to built for this.',
    sections: [],
  },
  stuck: [
    { q: 'The Next button does nothing', a: 'Pick one answer first. Next works once you choose.' },
    { q: 'I want to change my answers', a: 'Finish the quiz, then use Retake the quiz at the bottom of your result.' },
    { q: 'My result surprised me', a: 'Read the research line under your result. It explains what the level is based on, and none of the levels is fixed.' },
    { q: 'None of these fixed it', email: 'joe@mastermindshq.business', a: 'Say which question you were on and paste what you saw.' },
  ],
  bridge: 'You came to see if you have what it takes. The fastest way to find out is to build something real: your own website.',
  emailHeading: 'Want your full founder-readiness breakdown?',
}
