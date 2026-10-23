import type { PackPageContent } from '@/lib/pack-page'
import { POSTURE_COACH_PROMPT } from './prompt'

// Words for the Posture Coach pack page (IG keyword POSTURE, 23 Oct 2026).
// Layout, the email ask and the end offer live in src/components/giveaways/PackPage.tsx.
// Facts come from the app's own files (README.md, START-HERE-PROMPT.md, macos/Sources/Core.swift)
// in workspace agents/repo-giveaways/posture-buddy/app. Mac only. Not a medical product.

export const ZIP_PATH = '/posture-coach.zip'
export const PROMPT_PATH = '/posture-coach-prompt.txt'
export const EXAMPLE_PATH = '/posture-coach-example.png'
export const ONE_LINE_COMMAND = `claude "$(curl -fsSL 'https://workshop.mastermindshq.business${PROMPT_PATH}')"`

export const POSTURE_COACH_CONTENT: PackPageContent = {
  slug: 'posture-coach',
  level: 'builder',
  hero: {
    title: 'A cartoon of you that gets you stretching.',
    free: 'It is free.',
    lede: 'Every 20 minutes a little cartoon of you pops up on your Mac with a quick desk stretch. Claude Code draws the cartoon from your photo and builds the app for you. About 10 minutes.',
    button: {
      label: 'Take me to it',
      meta: 'free · on this page',
      target: 'get',
    },
    ticks: ['No sign-up', 'Made by your own Claude Code', 'Nothing leaves your Mac'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get it',
      text: 'One line to paste into Terminal, or the folder.',
    },
    {
      target: 'use',
      label: 'The prompt',
      text: 'The whole setup in one message to Claude Code.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual snags, and the fix for each.',
    },
  ],
  get: {
    heading: 'Your Posture Coach',
    intro:
      "Free, from Joe Che's AI class. Open Terminal on your Mac and paste the line below. Claude Code downloads the app, asks for a photo of you (or 5 quick questions), shows you your cartoon, then builds it on your Mac.",
    note: {
      lead: 'Needs a Mac with Claude Code.',
      link: { label: 'See how it works.', target: 'guide' },
      rest: 'macOS 13 or newer. Windows is not supported yet.',
    },
    command: {
      label: 'Paste this into Terminal',
      text: ONE_LINE_COMMAND,
    },
    primary: {
      label: 'Download the folder',
      meta: 'posture-coach.zip · 1 MB',
      href: ZIP_PATH,
      download: 'posture-coach.zip',
    },
    secondary: [{ label: 'See an example cartoon', href: EXAMPLE_PATH }],
  },
  promise: {
    heading: 'It nudges. It never nags.',
    doesNot: [
      'Send anything off your Mac. It reads one small file and keeps your tally on your computer',
      'Store your photo. Your Claude only looks at it to pick your cartoon',
      'Steal your typing. The card shows up without taking the keyboard',
      'Pop up in meetings. One switch holds every stretch until you are out',
      'Replace a physio. These are simple desk stretches, not treatment',
    ],
    does: [
      'Show a cartoon of you with a quick stretch every 20 minutes (or 15, 30, 45, 60)',
      'Time your reps, with a short how-to for each of the 12 moves',
      'Start the clock over when you step away from your Mac',
      'Time a stretch for while Claude Code is working, if one is due soon anyway',
      'Count your stretches for today and the last 7 days',
    ],
  },
  guide: {
    eyebrow: 'How it works',
    heading: 'From photo to stretching in about 10 minutes',
    intro:
      'The app is a little card that floats at the top right of your screen. The cartoon on it is drawn from a few choices, like your hair, skin tone, beard, glasses and clothes. Claude Code picks those choices from your photo, shows you a preview, and builds the app on your Mac.',
    sections: [
      {
        title: 'What you need',
        bullets: [
          'A Mac on macOS 13 or newer.',
          'Claude Code. The Claude Pro plan is enough.',
          "Apple's free command line tools. If you don't have them, Claude Code installs them for you (one click).",
          'A photo of yourself, or 2 minutes to answer 5 questions.',
        ],
      },
      {
        title: 'The steps',
        text: 'Claude Code does the work. You answer a few questions.',
        steps: [
          'Open Terminal (Cmd + Space, type Terminal, press Enter).',
          'Paste the line from the top of this page and press Enter. It starts Claude Code with the prompt.',
          'When Claude asks, drag a photo of yourself into the Terminal window and press Enter. Or type "describe" and answer 5 quick questions.',
          'Claude opens a preview of your cartoon in every stretch pose. Say what to change, or say it looks good.',
          'Claude reads the build files, tells you what they do, and builds the app. Say yes when it asks to run things.',
          'Your cartoon appears in the menu bar. Click it, then "Stretch now" to try one straight away.',
        ],
      },
      {
        title: 'Stretch while Claude works',
        text: 'If you say yes, Claude Code tells the app when it starts and stops working. When Claude starts a long task and your next stretch is due within 8 minutes, you get it right then, while you would only be waiting. Switch it off any time in the menu.',
      },
      {
        title: 'The 12 moves',
        text: 'Neck, back, chest, wrists, hips, legs and eyes: chin tucks, neck side stretch, doorway chest stretch, wrist and forearm stretch, a walk around the room and more. Switch off any you do not want.',
      },
    ],
  },
  inside: {
    heading: 'What is in the folder',
    files: {
      heading: 'The files',
      items: [
        { name: 'START-HERE-PROMPT.md', text: 'The prompt to paste into Claude Code. The same one is on this page.' },
        { name: 'shared/avatar.js', text: 'Your cartoon: hair, skin, beard, glasses, clothes and name. Claude fills it in.' },
        { name: 'shared/preview.html', text: 'Shows your cartoon in all 16 poses before you build.' },
        { name: 'shared/moves.json', text: 'The 12 stretches and what your coach says. Change them if you like.' },
        { name: 'macos/', text: 'The Mac app, built on your own Mac with Apple\'s free tools. 68 automatic checks.' },
        { name: 'claude-code/', text: 'The optional hooks that let it time stretches around Claude Code.' },
      ],
    },
  },
  use: {
    heading: 'The whole setup in one prompt',
    intro:
      'This is what the one line above sends to Claude Code. If you prefer, type claude in Terminal and paste this as one message instead.',
    cards: [
      {
        label: 'one message to Claude Code',
        title: 'Build my Posture Coach',
        text: 'Claude Code downloads the app, makes your cartoon from a photo or 5 questions, shows you a preview, then builds it on your Mac.',
        prompt: POSTURE_COACH_PROMPT,
      },
    ],
    openLinks: [],
  },
  stuck: [
    {
      q: 'I am on Windows or my phone',
      a: 'Posture Coach is Mac only for now. Send yourself this page and open it on a Mac with Claude Code.',
    },
    {
      q: 'It says "command not found: claude"',
      a: 'Claude Code is not installed yet. Install it (the guide is at code.claude.com), sign in, then paste the line again.',
    },
    {
      q: 'A window pops up about command line tools',
      a: 'Click Install and wait a few minutes. Then tell Claude Code it is finished and it carries on.',
    },
    {
      q: 'The cartoon does not look like me',
      a: 'Tell Claude what to change, like "my hair is longer" or "warmer skin tone". It updates your cartoon and opens the preview again. You can change it later too: ask Claude to edit shared/avatar.js and rebuild.',
    },
    {
      q: 'I do not see it in the menu bar',
      a: 'On a full menu bar, macOS hides some icons. Close a few menu bar apps, or open Posture Coach from Applications and it shows its card.',
    },
    {
      q: 'Two pop-ups at once',
      a: 'You may have another stretch app running. Quit the one you do not want from its menu.',
    },
    {
      q: 'How do I remove it?',
      a: 'Quit it from the menu and delete Posture Coach from Applications. If you turned on the Claude Code option, run bash claude-code/install-hooks.sh --remove in the PostureCoach folder.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what Claude Code said.',
    },
  ],
  bridge:
    'You came for a small thing Claude Code built for you in 10 minutes. The same tools can build what your business runs on.',
  emailHeading: 'Want more free Claude Code builds like this in your inbox?',
}
