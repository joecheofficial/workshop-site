import type { PackPageContent } from '@/lib/pack-page'
import { DALIO_INSTALL_COMMAND } from './prompts'

// Words for the Ray Dalio Council pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx.

export const GITHUB_URL = 'https://github.com/josephtandle/ray-dalio-council'

export const DALIO_PACK: PackPageContent = {
  slug: 'ray-dalio-council',
  level: 'builder',
  hero: {
    title: 'Here is the Ray Dalio Council.',
    free: 'It is free.',
    lede: 'A skill for Claude Code and Codex. Type /dalio and a decision. Five scouts argue it, and you get PROCEED, HOLD, or INVESTIGATE with a confidence score.',
    button: {
      label: 'Take me to the install',
      meta: 'free · one command',
      target: 'get',
    },
    ticks: ['No sign-up', 'No card', 'Works in Claude Code and Codex'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get it',
      text: 'One command installs the skill.',
    },
    {
      target: 'use',
      label: 'Use it now',
      text: 'Type /dalio and your question.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  get: {
    heading: 'Install the Dalio skill',
    intro:
      'One line in your terminal downloads one file into your Claude Code and Codex skills folders. No git needed, just curl.',
    note: {
      lead: 'Your skills live somewhere else?',
      rest: 'The README on GitHub has the manual install path.',
    },
    secondary: [{ label: 'Open the GitHub page and README', href: GITHUB_URL }],
    command: { label: 'Terminal', text: DALIO_INSTALL_COMMAND },
  },
  promise: {
    heading: 'One file, two folders.',
    doesNot: ['Need git'],
    does: [
      'Download one file, SKILL.md, from the GitHub repo',
      'Put it at ~/.claude/skills/dalio/SKILL.md for Claude Code',
      'Put a copy at ~/.codex/skills/dalio/SKILL.md for Codex',
    ],
  },
  guide: {
    eyebrow: 'How it works',
    heading: 'Five scouts. One verdict.',
    intro:
      'Five scouts with fixed lenses, a believability weighting system, and a synthesizer that produces one clean verdict. Modeled on how Ray Dalio ran decisions at Bridgewater.',
    sections: [
      {
        title: 'Set up once',
        steps: [
          'Copy the install command above.',
          'Paste it in your terminal and run it. It downloads one file into your Claude Code and Codex skills folders.',
          'Open Claude Code and type /dalio, or open Codex and type $dalio, followed by any decision. The council argues the question and gives you a verdict.',
        ],
      },
      {
        title: 'Why Ray Dalio',
        text: 'Ray Dalio founded Bridgewater Associates in 1975. His book Principles lays out the idea behind this skill: believability weighting. Not all opinions deserve equal weight. The people with the strongest track record in a given domain should carry more influence over a decision than those without one. He also believed you should never trust your own thinking unchallenged. The best decisions come from stress-testing your position against people who disagree, each arguing their strongest case, before you commit. That is what this skill runs: five specialists, fixed lenses, weighted synthesis, one verdict.',
      },
      {
        title: 'The five scouts',
        table: {
          head: ['Scout', 'Weight', 'What it does'],
          rows: [
            ['Optimist', 'w1.0', 'Makes the strongest case FOR proceeding. Upside, momentum, and the cost of inaction. It never raises risks. That is not its job.'],
            ['Skeptic', 'w1.0', 'Makes the strongest case AGAINST. What are you missing? Which assumption is wrong? What would cause this to fail in 90 days?'],
            ['Strategist', 'w1.2', 'Evaluates long-term alignment. Is this the right move at the right time? Does it serve your core goals 6 to 12 months out?'],
            ['Risk Analyst', 'w1.1', 'Identifies specific failure modes and worst-case scenarios. For each risk: how likely is it, and what is the blast radius if it hits?'],
            ['Domain Expert', 'w1.3', 'Uses any context you provide to evaluate the decision from the ground level. If no context is given, it applies general business principles.'],
          ],
        },
      },
      {
        title: 'Believability weighting',
        bullets: [
          'Not a vote count. Three scouts saying PROCEED does not override one Domain Expert (w1.3) and one Strategist (w1.2) saying HOLD. Higher weight means more influence on the final verdict.',
          'Weighted confidence. Confidence is a weighted average across all scouts. A 9/10 from the Domain Expert moves the number more than a 9/10 from the Optimist.',
          'Consensus or split. STRONG consensus means weighted confidence 6.0 or higher and 3 or more scouts agree. SPLIT means a close vote or low confidence, and the synthesizer names the dissent explicitly.',
        ],
      },
      {
        title: 'The three verdicts',
        bullets: [
          'PROCEED: The weighted council agrees this is the right move. It still includes the strongest objection so you go in with eyes open.',
          'HOLD: The risks or strategic misalignment outweigh the upside right now. Often comes with a specific condition: "Proceed when X is resolved."',
          'INVESTIGATE: You do not have enough information to decide well. The council flags exactly what you need to find out before calling it.',
        ],
      },
    ],
  },
  use: {
    heading: 'Ask it a decision',
    intro:
      'In Claude Code, type /dalio and your question. In Codex, type $dalio instead. Start with the plain question. Add context when you want the Domain Expert to use it.',
    cards: [
      {
        label: 'a bare question',
        title: 'Ask the council cold',
        text: 'Five scouts argue it with no context needed. Works for any decision.',
        prompt: '/dalio Should we launch the referral program this week?',
      },
      {
        label: 'with context',
        title: 'Give the Domain Expert context',
        text: 'The Domain Expert uses your context. The other four still argue their fixed lens.',
        prompt: '/dalio context: "bootstrapped SaaS, 150 users, $5k MRR" -- Should we hire a salesperson?',
      },
    ],
    openLinks: [],
  },
  stuck: [
    {
      q: '/dalio does nothing',
      a: 'Check that the file is at ~/.claude/skills/dalio/SKILL.md for Claude Code, or ~/.codex/skills/dalio/SKILL.md for Codex. If your skills live somewhere else, the README on GitHub has the manual install path.',
    },
    {
      q: 'I use Codex, not Claude Code',
      a: 'The same command installs both. In Codex, type $dalio instead of /dalio.',
    },
    {
      q: 'I do not have git',
      a: 'You do not need it. The command uses curl to download one file.',
    },
    {
      q: 'I have no background to give it',
      a: 'Ask the bare question. If no context is given, the Domain Expert applies general business principles.',
    },
    {
      q: 'The council came back SPLIT',
      a: 'SPLIT means a close vote or low confidence. The synthesizer names the dissent so you can see who disagreed and why.',
    },
    {
      q: 'It said HOLD or INVESTIGATE',
      a: 'HOLD often comes with a condition, like "Proceed when X is resolved." INVESTIGATE lists exactly what you need to find out before you decide.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    'You came for a better way to make a hard call. The next step is building more skills like this one for your own work, and learning to wire them into the way you run things.',
  emailHeading: 'Want more free tools like this in your inbox?',
}
