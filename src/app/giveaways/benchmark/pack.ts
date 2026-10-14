import type { PackPageContent } from '@/lib/pack-page'

// Words for the AI Model Benchmark Comparison pack page. Layout and behaviour
// live in src/components/giveaways/PackPage.tsx.

export const BENCHMARK_PACK: PackPageContent = {
  slug: 'benchmark',
  level: 'builder',
  hero: {
    title: 'Here is the AI Model Benchmark Comparison.',
    free: 'It is free.',
    lede: 'Anthropic and OpenAI models side by side: the price of each, what each pairing is for, and what to test before you pick one.',
    button: {
      label: 'Take me to the table',
      meta: 'free · on this page',
      target: 'guide',
    },
    ticks: ['No sign-up', 'No card', 'Nothing to install'],
  },
  jumps: [
    {
      target: 'guide',
      label: 'See the prices',
      text: 'Four pairings, side by side.',
    },
    {
      target: 'guide',
      label: 'What to test',
      text: 'The checks to run on your own work.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual questions, and the answer for each.',
    },
  ],
  guide: {
    eyebrow: 'Anthropic vs OpenAI',
    heading: 'Arranged for direct comparison',
    intro:
      'Each pairing shows the two models, the pricing, what the benchmark should test, and the question you are trying to answer.',
    sections: [
      {
        title: 'Read this correctly',
        bullets: [
          'The "tier" labels here are vendor positioning, not measured benchmark scores.',
          'Benchmark the models on your actual workloads. Pricing is objective. Capability claims are not.',
          'The most important practical test is Sonnet 4.6 vs GPT-5.4, with GPT-5.4-mini acting as the value pressure test.',
        ],
      },
      {
        title: 'The prices side by side',
        table: {
          head: ['Pairing', 'Claude model', 'Claude input', 'Claude output', 'OpenAI model', 'OpenAI input', 'OpenAI output'],
          rows: [
            ['Flagship', 'Claude Opus 4.6', '$5 / 1M', '$25 / 1M', 'GPT-5.4', '$2.50 / 1M', '$15 / 1M'],
            ['Balanced default', 'Claude Sonnet 4.6', '$3 / 1M', '$15 / 1M', 'GPT-5.4', '$2.50 / 1M', '$15 / 1M'],
            ['Value pressure test', 'Claude Sonnet 4.6', '$3 / 1M', '$15 / 1M', 'GPT-5.4-mini', '$0.75 / 1M', '$4.50 / 1M'],
            ['Fast / cheap', 'Claude Haiku 4.5', '$1 / 1M', '$5 / 1M', 'GPT-5.4-nano', '$0.20 / 1M', '$1.25 / 1M'],
          ],
        },
      },
      {
        title: 'Flagship: deep reasoning, long-form writing, coding quality, and high-stakes synthesis',
        text: 'OpenAI is materially cheaper on both input and output here. Opus only stays justified if it wins clearly on quality for your hardest real workloads.',
        bullets: [
          'Claude Opus 4.6 (vendor top tier): Anthropic positions this as its most intelligent option for agents and coding.',
          'GPT-5.4 (vendor top tier): OpenAI flagship lane for broad, high-capability work.',
          'Test it on: Architectural reasoning across multiple files',
          'Test it on: High-quality code edits with low supervision',
          'Test it on: Dense business memos and recommendation writing',
        ],
      },
      {
        title: 'Balanced default: everyday agent use, drafting, editing, and practical internal workflows',
        text: 'Output pricing is the same. OpenAI is slightly cheaper on input. This is the most important premium-vs-premium benchmark to run.',
        bullets: [
          'Claude Sonnet 4.6 (vendor premium default): Anthropic positions this as the best speed-to-intelligence tradeoff.',
          'GPT-5.4 (vendor flagship): Closest premium OpenAI comparison for deciding a serious default.',
          'Test it on: Document summarization and synthesis',
          'Test it on: Internal planning and agent orchestration',
          'Test it on: Business copy that still sounds sharp and human',
        ],
      },
      {
        title: 'Value pressure test: is a premium default worth paying for versus a smaller cheaper model',
        text: 'Sonnet costs about 4x more on input and over 3x more on output. It needs a visible quality advantage to survive this benchmark.',
        bullets: [
          'Claude Sonnet 4.6 (vendor premium default): Good candidate if you want one Anthropic default to test seriously.',
          'GPT-5.4-mini (small capable model): Likely strongest value benchmark for day-to-day internal automation.',
          'Test it on: Email and memo drafting',
          'Test it on: Routine extraction and formatting',
          'Test it on: Cheap but capable interactive assistant tasks',
        ],
      },
      {
        title: 'Fast / cheap: classification, extraction, summaries, and high-volume utility work',
        text: 'Haiku is still much more expensive. It needs to beat Nano convincingly on quality, reliability, or output cleanliness.',
        bullets: [
          'Claude Haiku 4.5 (fast model): Fastest Anthropic option in this set, but not ultra-cheap.',
          'GPT-5.4-nano (cheapest small model): Lowest-cost OpenAI option listed here.',
          'Test it on: Structured extraction from messy source text',
          'Test it on: Short summaries at scale',
          'Test it on: Simple tagging, labeling, and triage',
        ],
      },
      {
        title: 'Judge every pairing on the same workload set',
        bullets: [
          'Coding and editing quality',
          'Structured extraction accuracy',
          'Summarization clarity',
          'Long-context synthesis',
          'Agentic tool use',
          'Business writing quality',
        ],
      },
    ],
  },
  stuck: [
    {
      q: 'So which one should I pick?',
      a: 'This page does not pick a winner. Prices are facts. Quality is not. Run the same set of your own tasks through both models and judge them on the six checks above.',
    },
    {
      q: 'What do the tier labels mean?',
      a: 'They are vendor positioning, not measured benchmark scores. Do not read them as a ranking.',
    },
    {
      q: 'Where do I start?',
      a: 'With Sonnet 4.6 vs GPT-5.4. That is the most important premium-vs-premium test. Then run GPT-5.4-mini against Sonnet as the value pressure test.',
    },
    {
      q: 'Are these prices current?',
      a: 'The page shows the prices as listed, with no date or source given. Check each vendor pricing page before you decide.',
    },
    {
      q: 'The table is cut off on my phone',
      a: 'Swipe the table sideways to see every column.',
    },
    {
      q: 'The cheaper model costs so much less',
      a: 'Cheaper only wins if the quality holds. A pricier model has to show a visible quality advantage, or beat the small model on quality, reliability, or clean output, for your work.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    'You came to compare models on price. The next step is learning to pick the right model for each job inside a real workflow, and to prove it with tests on your own work.',
  emailHeading: 'Want this kind of comparison in your inbox?',
}
