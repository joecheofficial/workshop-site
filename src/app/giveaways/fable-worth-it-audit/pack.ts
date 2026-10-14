import type { PackPageContent } from '@/lib/pack-page'
import { FABLE_AUDIT_PROMPT } from './prompts'

// Words for the Fable Worth-It Audit pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx.

export const FABLE_PACK: PackPageContent = {
  slug: 'fable-worth-it-audit',
  level: 'builder',
  hero: {
    title: 'Here is the Fable Worth-It Audit.',
    free: 'It is free.',
    lede: 'Paste one prompt into Claude Code. It finds where the expensive Claude Fable 5 model is worth it in your codebase, and where Sonnet is enough.',
    button: {
      label: 'Take me to the prompt',
      meta: 'free · copy and paste',
      target: 'use',
    },
    ticks: ['No sign-up', 'No card', 'Works in Claude Code'],
  },
  jumps: [
    {
      target: 'use',
      label: 'Use it now',
      text: 'Copy the prompt and run it from your repository root.',
    },
    {
      target: 'guide',
      label: 'Score a task first',
      text: 'A points guide: Sonnet or Fable?',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  guide: {
    eyebrow: 'Sonnet or Fable',
    heading: 'Do not hire a surgeon to open a pickle jar.',
    intro:
      'Use Sonnet to decide when to use Fable. If failure costs minutes, use Sonnet. If failure costs days, consider Fable.',
    sections: [
      {
        title: 'Rule of thumb',
        bullets: ['Sonnet for minutes.', 'Fable for days saved.'],
      },
      {
        title: 'Use Sonnet for',
        text: 'Fast, smart, affordable, and usually enough.',
        bullets: [
          'Rename a button',
          'Summarize a short email',
          'Clean up copy',
          'Fix a contained component bug',
          'Generate ten post ideas',
        ],
      },
      {
        title: 'Use Fable for',
        text: 'Long, risky, expensive to redo, or painful to reason about.',
        bullets: [
          'Migrating a messy codebase without breaking production',
          'Planning architecture before a three-month build',
          'Debugging a failure across multiple services',
          'Reviewing hundreds of pages where missing one clause matters',
          'Running an agent that plans, tests, revises, and keeps going',
        ],
      },
      {
        title: 'Score a task before you pay premium tokens for it',
        text: 'Pick one row from each line for your task and add up the points. The answers go from 1 point (low) to 6 points (high).',
        table: {
          head: ['Question', '1 point', '2 points', '4 points', '6 points'],
          rows: [
            [
              'Cost if it gets it wrong',
              'Annoying, easy to fix',
              'A few hours lost',
              'A day or two lost',
              'Production, customers, or serious money',
            ],
            ['Context it must understand', 'One file', 'One module', 'Several packages or services', 'Whole system architecture'],
            ['Work length', 'Under 20 minutes', 'One focused session', 'Several stages', 'Hours or days of agent work'],
            ['Ambiguity', 'Very clear', 'Some product judgment', 'Architecture decisions', 'Messy and high-context'],
            [
              'Verification difficulty',
              'Simple test or visual check',
              'Several tests',
              'Regression thinking required',
              'Failures hide in edge cases',
            ],
          ],
        },
      },
      {
        title: 'What your total means',
        table: {
          head: ['Your total', 'Verdict', 'What to do'],
          rows: [
            [
              '10 or less',
              'Use Sonnet. This is a pickle jar.',
              'Fable would probably solve it, but that is not the same as being worth it. Start cheaper and escalate only if Sonnet stalls.',
            ],
            [
              '11 to 20',
              'Start with Sonnet. Escalate with evidence.',
              'Run the audit prompt on Sonnet first. If it finds architecture risk, unclear verification, or too much cross-repo context, then bring in Fable.',
            ],
            [
              '21 to 30',
              'Fable is probably justified.',
              'This has enough risk, context, ambiguity, or duration to justify the expensive specialist. Give it a tight task spec and a verification plan.',
            ],
          ],
        },
      },
    ],
  },
  use: {
    heading: 'Copy it into Claude Code.',
    intro:
      'Run this from your repository root. The output should rank Fable opportunities, pickle jars, Managed Agent candidates, and the first safe prototype.',
    cards: [
      {
        label: 'the Fable Worth-It Audit',
        title: 'Find where Fable is worth it',
        text: 'It gives you a verdict, a ranked list, a pickle jar list, an agent readiness check, and one task spec to try today.',
        prompt: FABLE_AUDIT_PROMPT,
      },
    ],
    openLinks: [],
  },
  stuck: [
    {
      q: 'Where do I paste it?',
      a: 'Open Claude Code in your project folder, the repository root. Paste the prompt and send.',
    },
    {
      q: 'I do not have a codebase',
      a: 'The prompt reads a code project, so it needs one. The points guide on this page scores any single task and needs no code.',
    },
    {
      q: 'Which model should run the audit?',
      a: 'Sonnet. The idea is to use Sonnet to decide when Fable is worth it, so you do not pay the big-model price just to ask the question.',
    },
    {
      q: 'My total is in the middle',
      a: 'Start with Sonnet. If it finds architecture risk, unclear verification, or too much context across repos, then bring in Fable.',
    },
    {
      q: 'What will I get back?',
      a: 'Five parts: an executive verdict, ranked Fable opportunities, a pickle jar list of tasks that should stay on Sonnet, an agent readiness check, and one copy-paste task spec to test the best Fable use case safely.',
    },
    {
      q: 'It says I need a Managed Agent',
      a: 'The audit flags work that needs Claude Managed Agents or another agent harness when it needs memory, tools, permissions, sandboxes, tracing, or long-running execution.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    'You came to stop paying for the wrong model. The next step is building agent workflows that are cheap to run and easy to check, with other people who are building too.',
  emailHeading: 'Want more free tools like this in your inbox?',
}
