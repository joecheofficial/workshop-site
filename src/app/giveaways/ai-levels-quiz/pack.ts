import type { PackPageContent } from '@/lib/pack-page'

// AI Capability Levels Quiz giveaway (keyword LEVEL), on the pack page template (Illy, 2026-10-14).
// The quiz itself runs on mastermindshq.business and asks for the email there, so this page never asks.

export const QUIZ_URL = 'https://mastermindshq.business/ai-capability-levels'

export const AI_LEVELS_QUIZ_PACK: PackPageContent = {
  slug: 'ai-levels-quiz',
  level: 'beginner',
  noEmailAsk: true,
  hero: {
    title: 'Here is the AI Capability Levels Quiz.',
    free: 'It is free.',
    lede: 'Find your place on the 0 to 40 ladder. In a few minutes you see how you use AI today, your level, and your next three moves.',
    button: { label: 'Take me to the quiz', meta: 'free · about three minutes', target: 'get' },
    ticks: ['Free', 'About three minutes', 'Your level and next three moves'],
  },
  jumps: [
    { target: 'get', label: 'Take the quiz', text: 'It opens in a new tab.' },
    { target: 'guide', label: 'See the levels', text: 'What each score means.' },
    { target: 'stuck', label: 'Get unstuck', text: 'The usual problems, and the fix for each.' },
  ],
  get: {
    heading: 'Take the quiz',
    intro: 'It opens on mastermindshq.business in a new tab. At the end you get your personalized level report and next three moves.',
    primary: { label: 'Take the quiz', meta: 'free · about three minutes · new tab', href: QUIZ_URL },
  },
  guide: {
    eyebrow: 'The framework',
    heading: 'A clear view of your AI capability',
    intro:
      'The 0 to 40 framework turns a vague question into a practical baseline. Your report shows your current level, the capability behind it, and three focused actions to help you move up.',
    sections: [
      {
        title: 'The four bands',
        table: {
          head: ['Score', 'Level', 'What it means'],
          rows: [
            ['0-10', 'Exploring', 'You are learning what AI can do and where it fits.'],
            ['11-20', 'Applying', 'You are using AI for useful work, with room to make it repeatable.'],
            ['21-30', 'Integrating', 'AI is becoming part of how your work gets done.'],
            ['31-40', 'Compounding', 'Your AI setup gets better every time you use it.'],
          ],
        },
      },
    ],
  },
  stuck: [
    {
      q: 'The quiz will not open',
      a: 'Use the Take the quiz button. It opens a new tab. If nothing happens, type mastermindshq.business/ai-capability-levels into your browser.',
    },
    { q: 'How long does it take?', a: 'About three minutes.' },
    { q: 'What do I get at the end?', a: 'Your personalized level report and your next three moves.' },
    { q: 'None of these fixed it', email: 'joe@mastermindshq.business', a: 'Say which step you were on and paste what you saw.' },
  ],
  bridge: 'You came to find your level. If you are near the start, the best next step is building one real thing with AI: your own website.',
  emailHeading: 'Want more AI capability guidance in your inbox?',
}
