import type { PackPageContent } from '@/lib/pack-page'

// Words for the "What 17 People Had to Un-Learn About Success" pack page.
// Layout and behaviour live in src/components/giveaways/PackPage.tsx.

export const PDF_URL = '/unlearning-success.pdf'

export const LEAD_MAGNET_PACK: PackPageContent = {
  slug: 'lead-magnet',
  level: 'beginner',
  hero: {
    title: 'Here are the 17 stories.',
    free: 'They are free.',
    lede: 'Real stories from a VIP dinner in Manhattan. No theory, no fluff. Just honest answers to one question: what was one thing you had to un-learn about success?',
    button: {
      label: 'Take me to the PDF',
      meta: 'free · on this page',
      target: 'get',
    },
    ticks: ['No sign-up', 'No card', 'One PDF with all 17 stories'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get the PDF',
      text: 'The full PDF with all 17 stories.',
    },
    {
      target: 'guide',
      label: 'See what is inside',
      text: 'The dinner, the one question, and the 17 stories.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'Quick answers about the PDF.',
    },
  ],
  get: {
    heading: 'What 17 People Had to Un-Learn About Success',
    intro: 'The full PDF with all 17 stories. Free, no strings attached.',
    primary: {
      label: 'Get the PDF',
      meta: 'unlearning-success.pdf · about 19 MB',
      href: PDF_URL,
    },
  },
  guide: {
    eyebrow: 'What is inside',
    heading: 'One question, asked at a private dinner',
    sections: [
      {
        title: 'The question',
        text: 'At a private dinner at Mostly Restaurant, we asked every guest one question: "What was one thing you had to un-learn about success?"',
      },
      {
        title: 'What is in the PDF',
        bullets: [
          '17 personal stories from entrepreneurs, creatives, and leaders',
          '1 question that cuts through the noise and gets to what matters',
        ],
      },
    ],
  },
  stuck: [
    {
      q: 'What is in the PDF?',
      a: '17 personal stories from entrepreneurs, creatives, and leaders. Each one answers the same question: what was one thing you had to un-learn about success?',
    },
    {
      q: 'Where did the stories come from?',
      a: 'A private VIP dinner at Mostly Restaurant in Manhattan. We asked every guest the same question.',
    },
    {
      q: 'The PDF is slow to open',
      a: 'The file is about 19 MB, so it can take a moment, especially on a slow connection. Give it a little time after you tap the button.',
    },
    {
      q: 'Is it really free?',
      a: 'Yes. It is free, no strings attached.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say what you tapped and what you saw.',
    },
  ],
  bridge:
    'You came for 17 honest stories about success. The next step is putting your own story out there, and a website you own is the natural place for it.',
  emailHeading: 'Want more from the Mastermind cohort in your inbox?',
}
