import type { PackPageContent } from '@/lib/pack-page'

// Words for the Cult Brand Playbook pack page (moved onto PackPage 15 Oct 2026).
// Layout, the email ask and the end offer live in src/components/giveaways/PackPage.tsx.
// The playbook used to arrive only by email. The whole playbook (the 7 elements,
// the "your job" exercises and the 30-day sprint) now sits on the page, word for
// word from the cult-brand-playbook email in src/app/api/lead-magnet/route.ts.

export const CULT_BRAND_PLAYBOOK_PACK: PackPageContent = {
  slug: 'cult-brand-playbook',
  level: 'beginner',
  hero: {
    title: 'Here is the Cult Brand Playbook.',
    free: 'It is free.',
    lede: 'Most brands compete on features, price and specs. The brands with the most devoted customers compete on identity, belief and meaning. This playbook shows you the 7 elements they all share, and a 30-day plan to build them into your brand.',
    button: {
      label: 'Read the playbook',
      meta: 'free · on this page',
      target: 'guide',
    },
    ticks: ['No sign-up', 'No card', 'Nothing to download'],
  },
  jumps: [
    {
      target: 'guide',
      label: 'The 7 elements',
      text: 'What each one is, with real brands and a job for you.',
    },
    {
      target: 'ways',
      label: 'The 30-day sprint',
      text: 'One week at a time, from diagnosis to community.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'Where to start, and what to do when you feel stuck.',
    },
  ],
  promise: {
    heading: 'Stop selling products. Start building a world.',
    doesNot: [
      'Compete on features, price and specs (the Visible Market, a race to the bottom)',
      'Lead with what the product is',
      'Try to please everyone',
    ],
    does: [
      'Compete on beliefs, identity and meaning (the Mental Market)',
      'Lead with who the customer becomes when they buy',
      'Connect customers to each other, not only to you',
    ],
  },
  guide: {
    eyebrow: 'The playbook',
    heading: 'The 7 elements of a cult brand',
    intro:
      'Starbucks sells sophistication, not coffee. Nike sells belief in personal greatness, not shoes. Liquid Death sells rebellion against corporate wellness culture, not water. None of them lead with specs. They lead with who you become when you buy.',
    sections: [
      {
        title: '01. Shared beliefs',
        text: 'The manifesto that makes some people nod hard and others disagree. Disagreement is the signal. A belief that everyone agrees with is a platitude, not a position.',
        bullets: ['Your job: complete the sentence "We believe that..." so that some people would push back.'],
      },
      {
        title: '02. The common enemy',
        text: 'Cult brands define themselves as much by what they oppose as by what they stand for. The enemy creates unity. It does not have to be a competitor. It can be a behavior, an institution or a mindset.',
        bullets: [
          "Apple's enemy: IBM, corporate conformity.",
          "Liquid Death's enemy: plastic, boring wellness.",
          "CrossFit's enemy: complacency, big box gyms.",
        ],
      },
      {
        title: '03. Identity',
        text: 'The most powerful thing you can sell is an answer to "who am I?". Watch how people talk about cult brands. They say "I am a CrossFit person," not "I use CrossFit." The brand becomes part of who they are.',
        bullets: ['Your job: write the identity sentence your customer feels. "When I use [brand], I am [identity]."'],
      },
      {
        title: '04. Rituals',
        text: 'Repeated actions that build belonging. They can be product rituals (how you use it), community rituals (events, challenges) or language rituals (words only members use). They separate insiders from outsiders without a word.',
        bullets: [
          'CrossFit: posting your workout time on the whiteboard.',
          'SoulCycle: the candle, the darkness.',
          'Harley: the group ride.',
        ],
      },
      {
        title: '05. Sacred language',
        text: 'Every tribe grows its own words. Shared words are a sign of belonging: know the words, and you are in. CrossFit calls it a "box," not a gym. Apple calls its support staff "Geniuses." The naming matters.',
        bullets: ['Your job: replace 3 generic words in your brand with words that belong only to you.'],
      },
      {
        title: '06. Symbols',
        text: 'Visual and verbal badges that let members recognize each other. The Nike swoosh on your shoes. The Patagonia fleece in certain work circles. Symbols are shorthand for belonging. They say "I am one of you" without a word.',
        bullets: ['Your job: what is the one symbol your most devoted customers already use to show they belong?'],
      },
      {
        title: '07. Community',
        text: 'Competitors can copy your product. They cannot copy your people. The brand is where it starts. The community is where people want to be. The key question: are you building connections between customers, or only between customers and you? The second is fragile. The first grows stronger over time.',
        bullets: ['Audience, then fans, then community, then tribe. Each stage is harder to copy.'],
      },
    ],
  },
  ways: {
    heading: 'The 30-day sprint',
    intro: 'A week-by-week plan to see where you are and build all 7 elements from scratch. Tap a week to see its steps.',
    items: [
      {
        title: 'Week 1: Diagnose',
        sub: 'Where is your brand today?',
        tags: [{ label: 'Start here', tone: 'easy' }],
        steps: [
          'Write your current elevator pitch.',
          'Is it Visible Market (features, price, specs) or Mental Market (beliefs, identity, meaning)?',
          'Find your 3 most devoted customers and ask them: "What does this brand say about you?"',
        ],
      },
      {
        title: 'Week 2: Build the foundation',
        sub: 'Beliefs, enemy and identity.',
        tags: [{ label: 'Elements 1 to 3', tone: 'plain' }],
        steps: [
          'Write your manifesto.',
          'Name your enemy. Be specific.',
          'Write the identity sentence: "When I use [brand], I am [identity]."',
        ],
      },
      {
        title: 'Week 3: Build the language',
        sub: 'Words, rituals and symbols.',
        tags: [{ label: 'Elements 4 to 6', tone: 'plain' }],
        steps: [
          'Replace 3 generic words with words that belong only to your brand.',
          'Design one ritual.',
          'Find or design one symbol.',
        ],
      },
      {
        title: 'Week 4: Activate the community',
        sub: 'Connect your customers to each other.',
        tags: [{ label: 'Element 7', tone: 'plain' }],
        steps: [
          'Find where your most devoted customers already gather.',
          'Create one touchpoint that connects customers to each other, not just to you.',
          'Start measuring how often people recommend you, not just whether they are happy.',
        ],
        after: 'The one-sentence version: stop selling products. Start building a world that people want to live in.',
      },
    ],
  },
  stuck: [
    {
      q: 'Where do I start?',
      a: 'Week 1. Write your elevator pitch and ask your 3 most devoted customers what your brand says about them. Their answers tell you where you are.',
    },
    {
      q: 'I do not want to have an enemy',
      a: 'The enemy does not have to be a person or a competitor. It can be a behavior, an institution or a mindset, like boring wellness or corporate conformity.',
    },
    {
      q: 'I am a small business, not Nike',
      a: 'Start with the identity sentence and one ritual. Community is the one thing a bigger competitor cannot copy.',
    },
    {
      q: 'My manifesto sounds like everyone else',
      a: 'Then it is a platitude, not a position. Rewrite "We believe that..." until some people would push back.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Tell me what you sell and which element you are stuck on.',
    },
  ],
  bridge:
    'A cult brand needs a home: one place where your beliefs, your words and your people live. That place is a website you own.',
  emailHeading: 'Want the playbook in your inbox too?',
}
