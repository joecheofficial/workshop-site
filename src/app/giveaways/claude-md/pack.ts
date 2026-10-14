import type { PackPageContent } from '@/lib/pack-page'
import { CLAUDE_MD_FILE } from './prompts'

// Words for the Ultimate CLAUDE.md pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx. The file text is copied verbatim from the old page
// (it is the same text as public/joe-che-claude.md).

export const FILE_URL = '/joe-che-claude.md'

export const CLAUDE_MD_PACK: PackPageContent = {
  slug: 'claude-md',
  level: 'builder',
  hero: {
    title: 'Here is the Ultimate CLAUDE.md file.',
    free: 'It is free.',
    lede: 'Put one file in your project folder. Claude Code reads it at the start of every session, so your rules, preferences and project notes are loaded before you type a word.',
    button: {
      label: 'Take me to it',
      meta: 'free · on this page',
      target: 'get',
    },
    ticks: ['No sign-up', 'No card', 'Works in Claude Code'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get it',
      text: 'Download the file, or copy it.',
    },
    {
      target: 'guide',
      label: 'Set it up',
      text: 'Three steps, and what is inside the file.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  get: {
    heading: 'The Ultimate CLAUDE.md file',
    intro:
      "Free, from Joe Che's AI class. This is the CLAUDE.md I use. It is the format I put in every new project. Free to use, share and adapt.",
    note: {
      lead: 'Prefer to copy it?',
      link: { label: 'The whole file is further down this page.', target: 'guide' },
      rest: 'Save it as CLAUDE.md, spelled exactly like that.',
    },
    primary: {
      label: 'Download CLAUDE.md',
      meta: 'saves as CLAUDE.md',
      href: FILE_URL,
      download: 'CLAUDE.md',
    },
  },
  guide: {
    eyebrow: 'Set it up',
    heading: 'Set up once. Never explain yourself again.',
    intro:
      'This is the actual CLAUDE.md I use. It took a few iterations to get right. You are getting the finished version.',
    sections: [
      {
        title: 'What is CLAUDE.md?',
        text: "CLAUDE.md is a special file that Claude Code reads at the start of every session. It acts like a standing brief: your rules, preferences and context are loaded before you type a word. Think of it as programming Claude's defaults so you never have to repeat yourself.",
      },
      {
        title: 'Three steps',
        steps: [
          'Get the file. Download it from the Get it box above, or copy it from the box below and save it as CLAUDE.md.',
          'Move it to your project root. That is the root folder of your project, the same level as your package.json or README. It is the only place it needs to be.',
          'Open Claude Code. It reads CLAUDE.md automatically at the start of a session. Your rules, routing and context are loaded before you type a word.',
          'Edit the sections that say "replace this", and delete the notes in brackets. They are just for you.',
        ],
      },
      {
        title: 'The file',
        text: 'Free to use, share and adapt. Customize the sections that are marked as placeholders and delete the ones you do not need.',
        prompt: { label: 'CLAUDE.md', text: CLAUDE_MD_FILE },
      },
      {
        title: 'Inside: Agent Routing',
        bullets: [
          'Background agent routing table: routes tasks to the right agent type automatically. Keeps your main session context lean and cuts API costs.',
          'Model selector guide (Haiku, Sonnet, Opus): tells Claude which model to use for which job. Haiku for research, Sonnet for most tasks, Opus for hard problems.',
          'Parallel agent rule: forces independent tasks to run at the same time instead of one after another. Faster and cheaper.',
        ],
      },
      {
        title: 'Inside: Autonomy and Style',
        text: 'This section controls how much Claude asks and how much it just does. Change the lists to fit how you work.',
        bullets: [
          'Proceed-without-asking list: Claude reads files, edits code and runs commands without stopping to ask. No more "Should I proceed?" interruptions.',
          'Always-confirm list: hard stops before deleting files or branches, pushing to remote, sending external messages or spending money through APIs.',
          'Response style rules: terse, lead-with-the-answer style. No preamble, no trailing summaries. Claude gets to the point immediately.',
        ],
      },
      {
        title: 'Inside: Content Rules',
        bullets: [
          'House style placeholder: add your own style rules here. The template ships with one example: no em dashes in any generated content.',
        ],
      },
      {
        title: 'Inside: Iron Laws (5, pre-written)',
        bullets: [
          'Read before writing: Claude checks your context and memory files before starting any task. No flying blind.',
          'Never report done without verifying: "It should work" is not done. Claude runs the code and checks the output before calling anything complete.',
          'Never commit secrets: no .env files, no API keys in commits. Claude flags it immediately if a secret appears in plaintext.',
          'Stop and explain if blocked: after 2 failed attempts, Claude explains clearly instead of trying risky workarounds like --no-verify or --force.',
          'Never create unnecessary files: prefer editing existing files. No file bloat, no clutter, no ghost files appearing in your project.',
        ],
      },
      {
        title: 'Inside: Session Startup',
        bullets: [
          'Auto-read list (USER.md, SOUL.md): Claude reads your key context files at the start of every session. Your preferences and working identity are loaded before you say a word. Delete this section if you do not have those files yet.',
        ],
      },
      {
        title: 'Inside: Your Project',
        bullets: [
          'Project description placeholder: describe your project once. Claude carries that context into every session without you repeating it.',
          'Stack and key paths: tell Claude your tech stack and folder structure so it navigates your codebase correctly from session one.',
        ],
      },
    ],
  },
  stuck: [
    {
      q: 'I do not know what my project root is',
      a: 'It is the main folder of your project, at the same level as your package.json or README. CLAUDE.md goes there and nowhere else.',
    },
    {
      q: 'The file opened as text in my browser instead of saving',
      a: 'Copy it instead. Use the Copy button on the file box on this page, paste it into a new file, and save it as CLAUDE.md. The name has to be exactly that.',
    },
    {
      q: 'Claude does not seem to use it',
      a: 'Check that the file is in your project root and named exactly CLAUDE.md. Claude Code reads it at the start of every session, so open a new session after you add it.',
    },
    {
      q: 'There are notes in brackets all through it',
      a: 'Those are notes for you. Delete all the notes in brackets before you start using the file.',
    },
    {
      q: 'Some of the rules do not fit me',
      a: 'It is a template. Edit the sections marked as placeholders and delete the ones you do not need. The Autonomy and Style section decides what Claude does without asking, so change those lists to fit how you work.',
    },
    {
      q: 'I do not use Claude Code',
      a: 'This file is made for Claude Code, which is the tool that reads CLAUDE.md automatically.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    "You came for the file that sets Claude's rules once. The next step is learning to build whole projects with Claude Code.",
  emailHeading: 'Want more free tools like this in your inbox?',
}
