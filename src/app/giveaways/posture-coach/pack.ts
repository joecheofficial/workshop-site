import type { PackPageContent } from '@/lib/pack-page'
import { POSTURE_COACH_PROMPT, POSTURE_COACH_EASY_PROMPT } from './prompt'

// Words for the Posture Coach pack page (IG keyword POSTURE, 23 Oct 2026).
// Layout, the email ask and the end offer live in src/components/giveaways/PackPage.tsx.
// Facts come from the app's own files (README.md, START-HERE-PROMPT.md, macos/Sources/Core.swift)
// in workspace agents/repo-giveaways/posture-buddy/app. Mac only. Not a medical product.
// Illy 23 Oct: every instruction in very simple words, like for a 5-year-old.

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
    lede: 'A little cartoon of you pops up on your Mac every 20 minutes. It shows you a quick stretch. Claude Code makes the cartoon from your photo. It takes about 10 minutes. It only works in Claude Code, on a Mac.',
    button: {
      label: 'Take me to it',
      meta: 'free · on this page',
      target: 'get',
    },
    ticks: ['No sign-up', 'Needs Claude Code on a Mac', 'Nothing leaves your Mac'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get it',
      text: 'Two ways. Pick the one you like.',
    },
    {
      target: 'use',
      label: 'The messages',
      text: 'Copy one, paste it, done.',
    },
    {
      target: 'stuck',
      label: 'Stuck?',
      text: 'Easy fixes for common problems.',
    },
  ],
  get: {
    heading: 'Get your Posture Coach',
    intro:
      "Free, from Joe Che's AI class. There are two ways. Way 1 is the easy way. Download the folder, drop it into Claude Code, and send one message. Way 2 is for people who already use Claude Code in Terminal. Paste one line. Either way, Claude asks for a photo of you, shows you your cartoon, then makes the app.",
    note: {
      lead: 'It only works in Claude Code, on a Mac.',
      link: { label: 'See both ways, step by step.', target: 'guide' },
      rest: 'Claude Code comes with the Claude app. You need a paid Claude plan (Pro or more). It does not work in normal Claude chat, in ChatGPT, or on Windows.',
    },
    primary: {
      label: 'Way 1: download the folder',
      meta: 'then drop it into Claude Code',
      href: ZIP_PATH,
      download: 'posture-coach.zip',
    },
    secondary: [{ label: 'See an example cartoon', href: EXAMPLE_PATH }],
    command: {
      label: 'Way 2: paste this into Terminal',
      text: ONE_LINE_COMMAND,
    },
  },
  promise: {
    heading: 'It reminds you. It does not nag you.',
    doesNot: [
      'Send anything off your Mac',
      'Keep your photo. Claude only looks at it to make your cartoon',
      'Take over your typing',
      'Pop up in meetings. Flip one switch and it waits',
      'Replace a doctor. These are simple desk stretches',
    ],
    does: [
      'Show a cartoon of you with a stretch every 20 minutes (or 15, 30, 45, 60)',
      'Count your stretch for you, and show you how to do it',
      'Start the timer again when you walk away',
      'Give you a stretch while Claude is busy working for you',
      'Count your stretches today and this week',
    ],
  },
  guide: {
    eyebrow: 'How it works',
    heading: 'From your photo to stretching in 10 minutes',
    intro:
      'A little card pops up at the top of your screen. On it is a cartoon of you. Claude makes the cartoon from your photo, shows it to you, then puts the app on your Mac.',
    sections: [
      {
        title: 'What you need',
        bullets: [
          'A Mac.',
          'Claude Code. It comes with the Claude app. You need a paid Claude plan (Pro or more).',
          'A photo of you. Or answer 5 quick questions instead.',
          'Normal Claude chat and ChatGPT can not do this. Only Claude Code can.',
        ],
      },
      {
        title: 'Way 1: the easy way',
        text: 'For everyone. No Terminal.',
        steps: [
          'Get the Claude app for Mac at claude.com/download. Log in.',
          'On this page, click "Way 1: download the folder". You get a file called posture-coach.zip.',
          'In the Claude app, click Code at the top. Pick a folder. Your Desktop is fine.',
          'Drag posture-coach.zip into the chat.',
          'Copy the Way 1 message from "The messages" below. Paste it in. Press Enter.',
          'Claude asks for your photo. Drag it in. Or type "describe" and answer 5 questions.',
          'Claude shows you your cartoon. Say what to change, or say "looks good".',
          'Say yes when Claude asks to do things. Then look at the top right of your screen. Your cartoon is there. Click it, then "Stretch now".',
        ],
      },
      {
        title: 'Way 2: the Terminal way',
        text: 'For people who already use Claude Code in Terminal.',
        steps: [
          'Open Terminal. (Press Cmd and Space. Type Terminal. Press Enter.)',
          'On this page, click Copy next to "Way 2". Paste it into Terminal. Press Enter.',
          'Terminal says "command not found: claude"? Claude Code is not set up yet. Use Way 1. Or paste curl -fsSL https://claude.ai/install.sh | bash into Terminal, press Enter, open a new Terminal window, and try again.',
          'Then it is just like Way 1: your photo, your cartoon, done.',
        ],
      },
      {
        title: 'Stretch while Claude works',
        text: 'Claude will ask if you want this. If you say yes, your coach can tell when Claude is busy. If a stretch is due soon anyway, you get it right then, while you wait. You can turn it off any time.',
      },
      {
        title: 'The 12 stretches',
        text: 'For your neck, back, chest, wrists, hips, legs and eyes. Like tucking your chin, stretching your neck, and a walk around the room. Turn off the ones you do not want.',
      },
    ],
  },
  inside: {
    heading: 'What is in the folder',
    files: {
      heading: 'The files',
      items: [
        { name: 'START-HERE-PROMPT.md', text: 'The steps and the messages. The same ones are on this page.' },
        { name: 'shared/avatar.js', text: 'How your cartoon looks. Claude fills it in for you.' },
        { name: 'shared/preview.html', text: 'Shows your cartoon in every pose, before Claude makes the app.' },
        { name: 'shared/moves.json', text: 'The 12 stretches and what your coach says.' },
        { name: 'macos/', text: 'The Mac app. Claude builds it on your Mac.' },
        { name: 'claude-code/', text: 'The extra bit for stretching while Claude works. Only if you say yes.' },
      ],
    },
  },
  use: {
    heading: 'The messages',
    intro:
      'Way 1: send the first message in the Claude app, in Code, with posture-coach.zip dragged in. Way 2: the line at the top sends the second message for you.',
    cards: [
      {
        label: 'Way 1 · Claude app, Code, zip dragged in',
        title: 'Set up Posture Coach from the folder',
        text: 'Claude opens the folder and does all the steps for you.',
        prompt: POSTURE_COACH_EASY_PROMPT,
      },
      {
        label: 'Way 2 · Terminal',
        title: 'Build my Posture Coach',
        text: 'Claude gets the app, makes your cartoon, shows it to you, then puts it on your Mac.',
        prompt: POSTURE_COACH_PROMPT,
      },
    ],
    openLinks: [],
  },
  stuck: [
    {
      q: 'I have Windows, or I am on my phone',
      a: 'It only works on a Mac for now. Send this page to yourself and open it on a Mac.',
    },
    {
      q: 'Terminal says "command not found: claude"',
      a: 'Claude Code is not set up in Terminal. Easy fix: use Way 1 in the Claude app. Or paste curl -fsSL https://claude.ai/install.sh | bash into Terminal, press Enter, open a new Terminal window, and try again.',
    },
    {
      q: 'The Terminal line does not work',
      a: 'Use the Copy button. Paste it in one piece. If it breaks into two lines, or a space goes missing, it will not work. Or use Way 1.',
    },
    {
      q: 'Can I use normal Claude chat or ChatGPT?',
      a: 'No. It has to make an app on your Mac. Only Claude Code can do that. It comes with the Claude app, in Code. You need a paid Claude plan (Pro or more).',
    },
    {
      q: 'A box pops up about "command line tools"',
      a: 'Click Install. Wait a few minutes. Then tell Claude it is done.',
    },
    {
      q: 'My cartoon does not look like me',
      a: 'Tell Claude what to change. Like "my hair is longer" or "make my skin darker". Claude fixes it and shows you again.',
    },
    {
      q: 'I can not find it at the top of my screen',
      a: 'Your top bar may be too full. Close a few apps up there. Or open Posture Coach from your Applications folder.',
    },
    {
      q: 'How do I remove it?',
      a: 'Click the little face and click Quit. Then delete Posture Coach from Applications.',
    },
    {
      q: 'Still stuck?',
      email: 'joe@mastermindshq.business',
      a: 'Tell us which step you were on and what Claude said.',
    },
  ],
  bridge:
    'Claude Code made you a little app in 10 minutes. It can make the things your business needs too.',
  emailHeading: 'Want more free things like this from Claude Code?',
}
