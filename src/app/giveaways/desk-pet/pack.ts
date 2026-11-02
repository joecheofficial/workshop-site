import type { PackPageContent } from '@/lib/pack-page'
import { DESK_PET_PROMPT } from './prompt'

// Words for the Desk Pet pack page (IG keyword PET, 30 Oct 2026).
// Layout, the email ask and the end offer live in src/components/giveaways/PackPage.tsx.
// Facts come from the app's own files (README.md, START-HERE-PROMPT.md, shared/mood.js)
// in workspace agents/desk-pet/app. Mac only. Same simple words as Posture Coach.

export const ZIP_PATH = '/desk-pet.zip'
export const PROMPT_PATH = '/desk-pet-prompt.txt'
export const EXAMPLE_PATH = '/desk-pet-example.png'
export const ONE_LINE_COMMAND = `claude "$(curl -fsSL 'https://workshop.mastermindshq.business${PROMPT_PATH}')"`

export const DESK_PET_CONTENT: PackPageContent = {
  slug: 'desk-pet',
  level: 'builder',
  hero: {
    title: 'A cute puppy that watches Claude work.',
    free: 'It is free.',
    lede: 'A little puppy sits on your Mac screen. It types while Claude works. It cheers when Claude is done. It waves when Claude needs you. Pick from 10 dogs and give yours a name. It takes about 10 minutes. It only works in Claude Code, on a Mac.',
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
      label: 'The Terminal prompt',
      text: 'For Way 2. Copy it, paste it, done.',
    },
    {
      target: 'stuck',
      label: 'Stuck?',
      text: 'Easy fixes for common problems.',
    },
  ],
  get: {
    heading: 'Get your Desk Pet',
    intro:
      "Free, from Joe Che's AI class. There are two ways. Way 1 is the easy way. Download the folder, drag it into Claude Code, and type 'set it up'. Way 2 is for people who already use Claude Code in Terminal. Paste one line. Either way, you pick your dog and name it, Claude shows it to you, then makes the app.",
    note: {
      lead: 'It only works in Claude Code, on a Mac.',
      link: { label: 'See both ways, step by step.', target: 'guide' },
      rest: 'Claude Code comes with the Claude app. You need a paid Claude plan (Pro or more). It does not work in normal Claude chat, in ChatGPT, or on Windows.',
    },
    primary: {
      label: 'Way 1: download the folder',
      meta: 'then drag it into Claude Code',
      href: ZIP_PATH,
      download: 'desk-pet.zip',
    },
    secondary: [{ label: 'See all 10 dogs', href: EXAMPLE_PATH }],
    command: {
      label: 'Way 2: paste this into Terminal',
      text: ONE_LINE_COMMAND,
    },
  },
  promise: {
    heading: 'It keeps you company. It does not spy.',
    doesNot: [
      'Send anything off your Mac',
      'See what you write to Claude. It only knows busy, done or waiting',
      'Make noise',
      'Get stuck in one place. Drag it anywhere',
    ],
    does: [
      'Type on a little laptop while Claude works',
      'Cheer when Claude is done, so you know to look',
      'Wave at you when Claude is waiting for you',
      'Curl up for a nap when you walk away, and sleep at night',
      'Tell you how many jobs Claude finished today when you click it',
    ],
  },
  guide: {
    eyebrow: 'How it works',
    heading: 'From picking your dog to a puppy on your screen in 10 minutes',
    intro:
      'A little puppy sits at the bottom of your screen. You pick the breed: Golden Retriever, Chocolate Lab, Dalmatian, Beagle, Corgi, Husky, Shiba Inu, Pug, French Bulldog or Poodle. Claude shows it to you, then puts the app on your Mac.',
    sections: [
      {
        title: 'What you need',
        bullets: [
          'A Mac.',
          'Claude Code. It comes with the Claude app. You need a paid Claude plan (Pro or more).',
          'Normal Claude chat and ChatGPT can not do this. Only Claude Code can.',
        ],
      },
      {
        title: 'Way 1: the easy way',
        text: 'For everyone. No Terminal.',
        steps: [
          'Get the Claude app for Mac at claude.com/download. Log in.',
          'On this page, click "Way 1: download the folder".',
          'In the Claude app, click Code at the top.',
          'Drag the DeskPet folder into the chat. (The zip works too.)',
          'Type "set it up" and press Enter. Claude does the rest.',
        ],
      },
      {
        title: 'Way 2: the Terminal way',
        text: 'For people who already use Claude Code in Terminal.',
        steps: [
          'Open Terminal. (Press Cmd and Space. Type Terminal. Press Enter.)',
          'On this page, click Copy next to "Way 2". Paste it into Terminal. Press Enter.',
          'Terminal says "command not found: claude"? Claude Code is not set up yet. Use Way 1. Or paste curl -fsSL https://claude.ai/install.sh | bash into Terminal, press Enter, open a new Terminal window, and try again.',
          'Then it is just like Way 1: pick your dog, name it, done.',
        ],
      },
      {
        title: 'How your pet knows what Claude is doing',
        text: 'It works in the Claude app and in Terminal, right away. Claude adds 4 tiny helpers that write one word on your Mac: busy, done or waiting. Your pet also notices when Claude is busy in any chat. It never sees what you write. You can take the helpers out any time.',
      },
      {
        title: 'The moods',
        text: 'Typing while Claude works. Cheering when Claude is done. Waving when Claude needs you. Napping when you are away for 10 minutes. Sleeping from 11 at night to 6 in the morning. Click it any time to say hi.',
      },
    ],
  },
  inside: {
    heading: 'What is in the folder',
    files: {
      heading: 'The files',
      items: [
        { name: 'CLAUDE.md', text: 'Tells Claude what to do when you drag the folder in.' },
        { name: 'START-HERE-PROMPT.md', text: 'The steps for both ways. The same ones are on this page.' },
        { name: 'shared/avatar.js', text: 'Your dog: which breed, its name and its collar. Claude fills it in for you.' },
        { name: 'shared/looks.html', text: 'All 10 dogs, so you can pick one.' },
        { name: 'shared/preview.html', text: 'Shows your pet in every mood, before Claude makes the app.' },
        { name: 'shared/mood.js', text: 'The rules for when your pet types, cheers, waves or naps.' },
        { name: 'macos/', text: 'The Mac app. Claude builds it on your Mac.' },
        { name: 'claude-code/', text: 'The 4 tiny helpers that tell your pet busy, done or waiting.' },
      ],
    },
  },
  use: {
    heading: 'The Terminal prompt',
    intro:
      'Only for Way 2. The line at the top sends this for you. Or type claude in Terminal and paste it yourself. Way 1 does not need it.',
    cards: [
      {
        label: 'Way 2 · Terminal',
        title: 'Build my Desk Pet',
        text: 'Claude gets the app, helps you pick your dog, shows it to you, then puts it on your Mac.',
        prompt: DESK_PET_PROMPT,
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
      q: 'Does it work in the Claude app?',
      a: 'Yes. It works in the Code tab of the Claude app and in Terminal, at the same time. Your pet reacts the moment Claude starts working.',
    },
    {
      q: 'I want a different dog',
      a: 'Tell Claude. Like "make it the Pug" or "a blue collar". Claude changes it and builds the app again.',
    },
    {
      q: 'My pet does not react to Claude',
      a: 'Send Claude a new message. Your pet starts reacting from the next message after setup. Still nothing? Ask Claude to run bash claude-code/install-hooks.sh in the DeskPet folder again.',
    },
    {
      q: 'I can not find my pet',
      a: 'Click the little paw at the top of your screen, then "Put it back in the corner".',
    },
    {
      q: 'How do I remove it?',
      a: 'Click the little paw and click Quit. Delete Desk Pet from Applications. Then ask Claude to run bash claude-code/install-hooks.sh --remove in the DeskPet folder.',
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
