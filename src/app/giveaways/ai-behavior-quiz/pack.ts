import type { PackPageContent } from '@/lib/pack-page'

// AI Behavioral Use Quiz giveaway (keyword BEHAVIOR), on the pack page template (Illy, 2026-10-14).
// The quiz itself runs on mastermindshq.business and asks for the email there, so this page never asks.

export const QUIZ_URL = 'https://mastermindshq.business/ai-behavioral-quiz'

export const AI_BEHAVIOR_QUIZ_PACK: PackPageContent = {
  slug: 'ai-behavior-quiz',
  level: 'beginner',
  noEmailAsk: true,
  hero: {
    title: 'Here is the AI Behavioral Use Quiz.',
    free: 'It is free.',
    lede: 'This measures intensity, not skill. It is a different question from what you can build with AI, and nobody wins by scoring high.',
    button: { label: 'Take me to the quiz', meta: 'free · ten questions', target: 'get' },
    ticks: ['Free', 'Ten honest questions', 'From B0 Avoidant to B10'],
  },
  jumps: [
    { target: 'get', label: 'Take the quiz', text: 'It opens in a new tab.' },
    { target: 'guide', label: 'See the scale', text: 'What each band means.' },
    { target: 'stuck', label: 'Get unstuck', text: 'The usual problems, and the fix for each.' },
  ],
  get: {
    heading: 'Take the quiz',
    intro: 'It opens on mastermindshq.business in a new tab. Take it, see where you land, and use the result as a starting point.',
    primary: { label: 'Take the quiz', meta: 'free · ten questions · new tab', href: QUIZ_URL },
  },
  guide: {
    eyebrow: 'The scale',
    heading: 'A more honest look at AI use',
    intro:
      'The scale runs from B0 Avoidant to B10. It is not a scorecard for talent or ambition. It is a quiet way to notice how much space AI is taking up in your work and life.',
    sections: [
      {
        title: 'Where you might land',
        table: {
          head: ['Band', 'Name', 'What it means'],
          rows: [
            ['B0', 'Avoidant', 'AI is mostly outside your day, whether by choice, uncertainty, or simply not needing it yet.'],
            ['B3', 'Testing', 'You are trying it in small, useful moments and learning what feels worth keeping.'],
            ['B6', 'Embedded', 'AI has become a familiar part of your work and your thinking, with clear benefits and tradeoffs.'],
            [
              'B9',
              'Watchful',
              'This is where sleep can start slipping, making it a good moment to pause and check what the pace is asking of you.',
            ],
          ],
        },
      },
    ],
  },
  stuck: [
    {
      q: 'The quiz will not open',
      a: 'Use the Take the quiz button. It opens a new tab. If nothing happens, type mastermindshq.business/ai-behavioral-quiz into your browser.',
    },
    { q: 'Is a high score good?', a: 'No. It measures intensity, not skill, and nobody wins by scoring high.' },
    { q: 'How long is it?', a: 'Ten honest questions.' },
    { q: 'None of these fixed it', email: 'joe@mastermindshq.business', a: 'Say which step you were on and paste what you saw.' },
  ],
  bridge: 'You came to check your pace with AI. If you want AI to do one useful, lasting thing for you, build your own website with it.',
  emailHeading: 'Want thoughtful AI guidance in your inbox?',
}
