import type { PackPageContent } from '@/lib/pack-page'
import { SAFETY_AUDIT_PROMPT } from './prompts'

// Words for the Anthropic Ban Risk Audit pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx.

export const SAFETY_PACK: PackPageContent = {
  slug: 'anthropic-safety-checklist',
  level: 'builder',
  hero: {
    title: 'Here is the Anthropic Ban Risk Audit.',
    free: 'It is free.',
    lede: 'Paste one prompt into your AI coding tool. It checks whether your setup looks human-operated, whether profile switching exists, and whether automated work goes through APIs.',
    button: {
      label: 'Take me to the prompt',
      meta: 'free · copy and paste',
      target: 'use',
    },
    ticks: ['No sign-up', 'No card', 'Works in Claude Code, Codex and Gemini CLI'],
  },
  jumps: [
    {
      target: 'use',
      label: 'Use it now',
      text: 'Copy the prompt and run it at your project root.',
    },
    {
      target: 'guide',
      label: 'See what it checks',
      text: 'The three rules and every check.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  guide: {
    eyebrow: 'What it checks',
    heading: 'Find the risky pattern before the platform does',
    intro:
      'It audits behavior, code, credentials, automation, and the exact boundary between human work and API work. It asks for evidence, file paths, and a risk rating instead of vague safety advice.',
    sections: [
      {
        title: 'The steps',
        steps: [
          'Copy the prompt. Use it as-is. It tells your AI coding tool exactly what to inspect and how to score the risk.',
          'Run it inside your project. Paste it into Claude Code, Codex, or Gemini CLI at the root of the codebase you want checked.',
          'Fix the risky paths. Delete profile switching, keep human work human, and move unattended workflows to provider APIs.',
        ],
      },
      {
        title: 'The three rules it enforces',
        bullets: [
          'Do not switch profiles, accounts, sessions, devices, or browser identities to keep Claude usage alive.',
          'Ensure everything done through consumer Claude or Claude Code is done by a human in the foreground.',
          'Direct automated tasks to APIs with real keys, budgets, rate limits, logging, and kill switches.',
        ],
      },
      {
        title: 'Which tool to use',
        bullets: [
          'Claude Code (primary): Best for the full repository and local setup audit.',
          'Codex: Use it to inspect code, configs, scripts, and automation paths.',
          'Gemini CLI: Use it to run the same structured safety review.',
        ],
      },
      {
        title: 'Check area 1: Human operation',
        bullets: [
          'Human-visible usage: Confirms Claude Code is used by a human in the foreground, not as a hidden backend.',
          'No unattended jobs: Looks for cron, launchd, CI, queues, daemons, and scripts that run Claude without a human.',
          'No product shell: Flags browser wrappers, relays, embedded terminals, or app interfaces that hide consumer Claude use.',
          'Operator approval points: Checks that risky actions require a human decision before execution.',
          'Clear usage boundary: Separates personal assistant work from automation, customer workflows, and production jobs.',
        ],
      },
      {
        title: 'Check area 2: Profile and account risk',
        bullets: [
          'Do not switch profiles: Finds account rotation, profile switching, token sync, failover accounts, and session swapping.',
          'One human account: Checks that each human uses their own account only for human-operated work.',
          'No shared session files: Looks for copied browser profiles, exported cookies, synced OAuth files, and shared Claude sessions.',
          'No account exhaustion logic: Flags logic that switches users after rate limits, caps, bans, or usage limits.',
          'No device laundering: Checks for multi-device or multi-browser tricks meant to keep consumer usage alive.',
          'No identity masking: Flags proxies, profile scripts, or automation designed to make one operator look like many humans.',
        ],
      },
      {
        title: 'Check area 3: API routing',
        bullets: [
          'Automated tasks go to APIs: Verifies bots, agents, queues, scheduled jobs, and product workflows use provider APIs.',
          'No OAuth as infrastructure: Flags personal Claude OAuth, local sessions, and browser cookies used as automation credentials.',
          'Provider-backed execution: Checks for Anthropic API, Bedrock, Vertex, Foundry, or another approved provider path.',
          'Budget and rate limits: Looks for API spend controls, quotas, retry limits, and alerting on automated paths.',
          'Credential separation: Separates human auth, development keys, production keys, and customer-facing automation.',
          'MyOS dispatch safety: Confirms shared routing sends model work through the intended provider lane.',
        ],
      },
      {
        title: 'Check area 4: Codebase evidence',
        bullets: [
          'Scripts and package commands: Reviews package scripts, shell scripts, Makefiles, task runners, and agent launchers.',
          'Environment variables: Inspects variable names for Claude OAuth, sessions, browser profile paths, API keys, and provider routing.',
          'Scheduled automation: Checks cron, launchd plists, GitHub Actions, workers, queues, and deployment hooks.',
          'Browser control: Flags CDP, Playwright, Puppeteer, browser profile reuse, and automated Claude web sessions.',
          'LLM routers: Inspects model dispatchers, provider abstractions, fallback chains, and direct provider calls.',
          'Agent frameworks: Reviews autonomous loops, retries, memory workers, task agents, and background orchestration.',
          'Documentation drift: Checks README files, handoffs, recipes, and runbooks for instructions that encourage unsafe use.',
        ],
      },
      {
        title: 'What you get back',
        text: 'Four short sections: the files it inspected, an overall ban-risk rating with a confidence percentage, a scorecard (each line is Pass, Warning, or Fail), and a final plain-English verdict on whether you are probably safe, need cleanup, or need urgent refactoring.',
      },
      {
        title: 'If you land on medium or high risk',
        text: "Take the time to refactor your code. If you'd like me and my team to do this for you, please reach out at joe@mastermindshq.business. This is practical technical guidance, not legal advice. When in doubt, use supported provider APIs for automation.",
      },
    ],
  },
  use: {
    heading: 'Copy. Paste. Get your risk rating.',
    intro:
      'Paste this into your AI coding tool at the root of the project you want checked. It looks at your real files, then gives you the rating.',
    cards: [
      {
        label: 'the ban risk audit',
        title: 'Check my ban risk',
        text: 'It checks your code, scripts, credentials and habits, then gives you a plain-English risk rating and a Pass, Warning or Fail scorecard.',
        prompt: SAFETY_AUDIT_PROMPT,
      },
    ],
    openLinks: [],
  },
  stuck: [
    {
      q: 'Where do I paste it?',
      a: 'In Claude Code, Codex, or Gemini CLI, opened at the root of the codebase you want checked. Paste the prompt and send.',
    },
    {
      q: 'Which tool is best?',
      a: 'Claude Code is the primary one, best for the full repository and local setup audit. Codex and Gemini CLI can run the same structured review.',
    },
    {
      q: 'It says it could not inspect something',
      a: 'The prompt tells the AI not to guess. If it cannot look at something, it says what it could not inspect and why, so check that folder and try again.',
    },
    {
      q: 'It gave me more or fewer sections than I expected',
      a: 'The prompt asks for exactly four sections: files inspected, overall ban-risk rating, scorecard, and a final verdict. Nothing else.',
    },
    {
      q: 'It rated me medium or high',
      a: 'Delete profile switching, keep human work human, and move unattended workflows to provider APIs. Then run the audit again to see the new rating.',
    },
    {
      q: 'I want help fixing it',
      a: 'Email me. My team and I can do a full safety audit and the code refactoring for you.',
      email: 'joe@mastermindshq.business',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    'You came to check your setup before it costs you. The next step is learning to build agent workflows the safe way, with real API routing, budgets and checks, alongside other people who build.',
  emailHeading: 'Want more free tools like this in your inbox?',
}
