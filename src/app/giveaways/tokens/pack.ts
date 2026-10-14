import type { PackPageContent } from '@/lib/pack-page'
import { RTK_COMMANDS, STARTUP_TEMPLATE } from './prompts'

// Words for the Token Diet pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx. Numbers and how they are qualified are
// copied exactly from the old page. Commands and the prompt are verbatim.

export const RTK_URL = 'https://www.rtk-ai.app/'
export const TYPESAFE_URL = 'https://typesafe.ai'
export const DISPATCH_URL = 'https://github.com/josephtandle/myos-dispatch'

export const TOKENS_PACK: PackPageContent = {
  slug: 'tokens',
  level: 'builder',
  hero: {
    title: 'Here is the Token Diet.',
    free: 'It is free.',
    lede: 'Before you pay more, stop burning what you already pay for. These are the four changes I made so my agents waste less on the same plan. Start with the first one today.',
    button: {
      label: 'Take me to it',
      meta: 'free · on this page',
      target: 'guide',
    },
    ticks: ['No sign-up', 'No card', 'Works in Claude Code and Codex'],
  },
  jumps: [
    {
      target: 'guide',
      label: 'The four changes',
      text: 'Start with the 2-minute one, no terminal.',
    },
    {
      target: 'use',
      label: 'Use it now',
      text: 'Copy one prompt into Claude Code to audit your CLAUDE.md.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  guide: {
    eyebrow: 'The four changes',
    heading: 'Four changes. Start with the first one today.',
    intro:
      'Most of us are not short on plan. We are wasting it. These are the four changes that stopped my agents wasting 1.4 billion tokens on the same plan.',
    sections: [
      {
        title: 'Why now',
        text: "OpenAI just made ChatGPT's top plan $500 a month. From October 30, the $200 plan gets half the usage it had, 10x the Plus plan instead of 20x.",
        links: [
          {
            label: 'Source: Business Insider',
            href: 'https://www.businessinsider.com/chatgpt-new-plan-pro-500-cost-compute-allowance-2026-9',
          },
        ],
      },
      {
        title: 'My real numbers: 1.4 billion tokens my agents never had to read.',
        text: 'rtk gain showed that RTK trimmed 70% of the noisy command output before my agents read it. These are test logs, file listings and git logs, not total plan usage.',
        bullets: [
          '1.4B: tokens my agents never had to read',
          '70.7%: of noisy command output trimmed',
        ],
      },
      {
        title: 'Do this first (2 minutes, no terminal)',
        text: 'In Claude Code, type /model and pick Sonnet as your everyday model. Switch to Opus only when a job actually fails. In ChatGPT, use the regular model for everyday work and save the Pro and thinking models for hard problems.',
      },
      {
        title: 'Words on this page, in plain English',
        bullets: [
          "Token: the unit AI reads and writes; your plan's limit is counted in tokens.",
          "Claude Code: Anthropic's AI assistant that works in your project folder.",
          'Terminal: the app on your Mac where you type commands. Open it with Cmd+Space, type Terminal, press Enter.',
          "Codex: OpenAI's coding assistant, the ChatGPT version of Claude Code.",
          'Hook: a small rule that runs automatically before the AI does something.',
        ],
        links: [{ label: 'Get Claude Code', href: 'https://claude.com/claude-code' }],
      },
      {
        title: 'Change 1: Filter the noise before AI reads it',
        text: 'Every time your agent runs a command, the whole output goes back into the model. Test runs, git logs, file listings. Most of it is noise: hundreds of passing tests, the same headers over and over, folders nobody asked about. You pay for every line of it, and it crowds out the stuff that matters. RTK sits between your agent and the terminal and trims that output down to what the model actually needs before it reads it. You do not change how you work. It just happens. To be clear, RTK is not my tool. It is free and open source, made by the team at rtk-ai.app. I just use it every day. It trimmed 70% of noisy command output before my agents read it.',
        links: [{ label: 'rtk-ai.app', href: RTK_URL }],
      },
      {
        title: 'Change 1: the commands',
        text: "Don't have Homebrew? Install it from brew.sh first (one command). Needs Homebrew on a Mac. Other platforms and agents (Cursor, Gemini CLI and more) are covered on the RTK site.",
        table: {
          head: ['Step', 'What it does'],
          rows: [
            ['brew install rtk', 'Installs RTK on your Mac.'],
            ['mkdir -p ~/.claude', "Makes sure Claude Code's settings folder exists."],
            ['rtk init -g --auto-patch', "Installs RTK's hook into Claude Code with no questions asked."],
            ['quit and reopen Claude Code', 'The hook loads when Claude Code starts. Then work normally for a day or two.'],
            ['rtk gain', 'Run this later to see your own savings.'],
          ],
        },
        prompt: { label: 'Terminal', text: RTK_COMMANDS },
        links: [
          { label: 'Get Homebrew (brew.sh)', href: 'https://brew.sh' },
          { label: 'The RTK site', href: RTK_URL },
        ],
      },
      {
        title: 'Change 2: The cheapest model that can do each job',
        text: 'Running the top model on everything is like hiring a surgeon to put on a bandage. It works. It is also the fastest way to hit your limit by Wednesday.',
        table: {
          head: ['The job', 'Use', 'For example'],
          rows: [
            ['Quick lookups, renames, formatting, summaries', 'Small, fast model', 'Claude Haiku'],
            ['Everyday coding and writing', 'Mid model', 'Claude Sonnet'],
            ['Architecture, hard debugging, high-stakes writing', 'Top model', 'Claude Opus'],
          ],
        },
      },
      {
        title: 'Change 2: the tip',
        text: 'Set your default to the mid model. Step up to the top model only when a task fails, then step back down. Most days you will barely touch it, and you will not miss it.',
      },
      {
        title: 'Change 3: Audit your CLAUDE.md against mine',
        text: 'Your CLAUDE.md gets read at the start of every session, so every extra line costs you every time. But short is not the goal, right is. I keep an Ultimate CLAUDE.md that I give away. The prompt in the Use it now box below goes into Claude Code in your project folder. It audits yours against mine and upgrades only what fits your business. Review the changes before saving your updated CLAUDE.md.',
        bullets: [
          'Before: rules that do not fit your business',
          'Before: stale, repeated or overly long instructions',
          'Before: useful rules from the Ultimate CLAUDE.md may be missing',
          'After: only rules relevant to your business',
          'After: short startup instructions with detail files linked',
          'After: you review the changes before saving',
        ],
        links: [{ label: 'Get the full Ultimate CLAUDE.md', href: '/giveaways/claude-md' }],
      },
      {
        title: 'Change 4: Put a receptionist in front of your AI (advanced, optional)',
        text: "For developers: how I route every request. If you use Claude Code, you can install it from the GitHub page; if not, skip this one. Most people send every request straight to the most expensive model. That's like having your CEO answer the phone. So I built a receptionist. I call it MyOS Dispatch. Before any AI runs, it looks at the request and sends it to the cheapest place that can handle it.",
        steps: [
          'Simple stuff: checking a file or a status. Handled instantly, no AI at all.',
          "Jobs I've done before: it runs the saved recipe. No AI needed.",
          'Real work: goes to the cheapest model that can do it, with only the files it needs.',
        ],
        links: [{ label: 'MyOS Dispatch is free and open source: github.com/josephtandle/myos-dispatch', href: DISPATCH_URL }],
      },
      {
        title: 'Change 4: who makes the calls',
        text: 'To make those calls fast, Dispatch uses Jev, a tiny model from TypeSafe AI (not mine) that only picks from a short list of answers. It costs me about 18 cents a day. The point: use a classifier for choices, and save the big model for real work. Picking a lane is not a job for the smartest model you pay for.',
        links: [{ label: 'TypeSafe AI', href: TYPESAFE_URL }],
      },
      {
        title: 'One habit that lasts',
        text: 'Prices will keep moving. Usage limits will keep moving. The habit that holds up either way is the same one: do not pay a model to read things it does not need.',
      },
    ],
  },
  use: {
    heading: 'Audit your CLAUDE.md in a minute',
    intro:
      'Tap Copy, open Claude Code in your project folder, paste it and send. It compares your CLAUDE.md to my Ultimate CLAUDE.md and shows you the changes before it saves anything.',
    cards: [
      {
        label: 'Change 3 in one prompt',
        title: 'Audit and upgrade my CLAUDE.md',
        text: 'It keeps only what fits how you work, and moves long details into separate docs files.',
        prompt: STARTUP_TEMPLATE,
      },
    ],
    openLinks: [],
  },
  stuck: [
    {
      q: 'I do not know what the terminal is',
      a: 'It is the app on your Mac where you type commands. Open it with Cmd+Space, type Terminal, press Enter. If you would rather skip it, do the first change instead: in Claude Code, type /model and pick Sonnet. No terminal needed.',
    },
    {
      q: 'It says brew: command not found',
      a: 'The RTK commands need Homebrew on a Mac. Install Homebrew from brew.sh first (one command), then run the commands again.',
    },
    {
      q: 'I am not on a Mac, or I do not use Claude Code',
      a: 'The commands here are for Homebrew on a Mac. Other platforms and agents (Cursor, Gemini CLI and more) are covered on the RTK site, rtk-ai.app.',
    },
    {
      q: 'rtk gain shows nothing',
      a: 'Quit and reopen Claude Code so the hook loads. Then work normally for a day or two before you run rtk gain.',
    },
    {
      q: 'I use ChatGPT, not Claude Code',
      a: 'The model tip works there too: use the regular model for everyday work and save the Pro and thinking models for hard problems. The audit prompt is for Claude Code.',
    },
    {
      q: 'Will this cut my whole plan by 70%?',
      a: 'No. The 70% is for noisy command output only: test logs, file listings and git logs. It is not total plan usage.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    'You came to waste less of the AI plan you already pay for. The next step is putting that plan to work on bigger things, building with Claude Code.',
  emailHeading: 'Want The Token Diet in your inbox?',
}
