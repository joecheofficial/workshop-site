import type { PackPageContent } from '@/lib/pack-page'
import {
  FLOW_STEPS,
  LANE_CARDS,
  MIGRATION_PROMPT,
  PROBLEM_POINTS,
  ROUTING_TITLE,
  RULE_SECTIONS,
  WHY_IT_SCALES,
} from '@/app/giveaways/cross-cli-compatibility-routing/content'

// Words for the Cross CLI Compatibility Routing pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx. The long texts are imported from ./content (the old
// page's own module) so they stay in one place; nothing is copied or reworded here.

export const PDF_URL = '/cross-cli-compatibility-routing-guide.pdf'
export const PROMPT_FILE_URL = '/giveaways/cross-cli-compatibility-routing-prompt.md'

export const ROUTING_PACK: PackPageContent = {
  slug: 'cross-cli-compatibility-routing',
  level: 'builder',
  hero: {
    title: `Here is ${ROUTING_TITLE}.`,
    free: 'It is free.',
    lede: 'A way to organize a big pile of AI agents, skills and workflows so each request goes to the right one, without loading the whole catalog into every call. A PDF guide and a prompt you can hand to your own orchestrator.',
    button: {
      label: 'Take me to it',
      meta: 'free · PDF and prompt',
      target: 'get',
    },
    ticks: ['No sign-up', 'No card', 'Works with any orchestrator'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get it',
      text: 'The PDF guide and the prompt file.',
    },
    {
      target: 'use',
      label: 'Use it now',
      text: 'Copy the migration prompt and hand it to your orchestrator.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  get: {
    heading: 'The guide and the prompt',
    intro:
      "Free, from Joe Che's AI class. A public guide, a direct-download PDF, and a universal migration prompt you can hand to any orchestrator. The PDF holds the architecture, the visible decision tree, the lane rules and the full migration prompt in one clean file.",
    primary: {
      label: 'Download the PDF',
      meta: 'cross-cli-compatibility-routing-guide.pdf',
      href: PDF_URL,
    },
    secondary: [{ label: 'Download the prompt file', href: PROMPT_FILE_URL }],
  },
  promise: {
    heading: 'It audits first. Then it plans.',
    doesNot: [
      'Start by changing your files. The prompt says audit first',
      'Rewrite your whole system at once. It migrates in phases',
      'Throw away a working recipe system. It keeps your deterministic lane',
    ],
    does: [
      'Inventory what you have: recipes, skills, workflows, agents and helpers',
      'Find where context bloat and routing mix-ups come from',
      'Lay out a target design and a lane for each capability',
      'Give you migration phases, validation rules, test cases and a checklist',
    ],
  },
  guide: {
    eyebrow: 'The idea',
    heading: 'Big capability systems get slower before they get smarter',
    intro:
      'The failure mode is rarely raw model intelligence. It is almost always architecture: too much context, too many ambiguous surfaces, and no clean authority boundary between deterministic operations and judgment-heavy work. This is not about stuffing more intelligence into the prompt. It is about shrinking the top of the system so the runtime can load only what is necessary.',
    sections: [
      {
        title: 'What this fixes',
        text: 'Without this, more agents and more skills eventually make the system slower, noisier and less reliable. With this, requests get routed by lane, execution stays authoritative, and the top of the stack stays tiny.',
      },
      {
        title: 'The real problem',
        bullets: PROBLEM_POINTS.map((p) => `${p.title}: ${p.body}`),
      },
      {
        title: 'The architecture: tiny bootstrap first, lane-native execution second',
        steps: FLOW_STEPS.map((s) => `${s.title}. ${s.summary} ${s.detail}`),
      },
      {
        title: 'The decision tree',
        text: 'The outer router chooses the lane. The lane system chooses the executor. That is the whole trick.',
        steps: [
          'Incoming request.',
          'Bootstrap: read ROUTING-SLIM.md.',
          'Discovery: load the compact capability index.',
          'Lane selector. Is it deterministic operational work? Route to the recipe lane. Is it a named orchestration pattern? Route to the workflow lane. Otherwise, is it ambiguous or compositional? Route to the worker or skill lane.',
          'Finish: return one normalized result envelope.',
        ],
      },
      ...LANE_CARDS.map((lane) => ({
        title: `${lane.lane}: ${lane.label}`,
        text: `${lane.why} ${lane.body}`,
        bullets: [...lane.points],
      })),
      {
        title: 'Why this scales: it grows by breadcrumbing, not by preloading everything',
        bullets: [...WHY_IT_SCALES],
      },
      {
        title: 'Build rules: the system only stays clean if new capabilities enter cleanly',
        bullets: RULE_SECTIONS.map((r) => `${r.title}: ${r.body}`),
      },
    ],
  },
  use: {
    heading: 'Hand this to your orchestrator',
    intro:
      'This prompt is written to force an audit-first migration. It makes the system inspect what already exists, preserve deterministic infrastructure, and only then restructure toward the lane-based model. Tap Copy, then paste it to your own orchestrator.',
    cards: [
      {
        label: 'the universal migration prompt',
        title: 'Migrate to lane-based routing',
        text: 'Audit first, plan second, change things only after the plan holds up.',
        prompt: MIGRATION_PROMPT,
      },
    ],
    openLinks: [],
  },
  stuck: [
    {
      q: 'I am not sure which download I need',
      a: 'The PDF is the guide: the architecture, the decision tree, the lane rules and the full prompt. The prompt file is only the migration prompt, ready to hand to your own orchestrator.',
    },
    {
      q: 'The PDF will not open',
      a: 'Tap Download the PDF again in a normal browser tab. The same ideas, and the full prompt, are also on this page.',
    },
    {
      q: 'I do not know where to give it the prompt',
      a: 'Hand it to your orchestrator: the top-level AI that runs your agents, skills and workflows. The prompt is written to that role. It is meant to work across different CLIs and orchestrators.',
    },
    {
      q: 'Will it change my files right away?',
      a: 'No. The prompt tells the AI to inspect the current system first, produce a migration plan, and only then execute once the plan is validated. It also says not to start by mutating files.',
    },
    {
      q: 'I do not follow the three lanes',
      a: 'The recipe lane is for repeatable, validated, code-backed work. The worker or skill lane is for ambiguous, new or mixed work that needs judgment. The workflow lane is for named orchestration patterns, like a council or a structured review flow.',
    },
    {
      q: 'It is trying to change too much at once',
      a: 'The prompt says not to migrate everything at once. The phases start with the busiest capabilities and leave the long tail for later. Ask it to follow those phases.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    'You came for a cleaner way to run a growing AI setup. The next step is building out the rest of that system, step by step, in a course made for people already building with Claude Code.',
  emailHeading: 'Want more free tools like this in your inbox?',
}
