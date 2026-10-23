import type { PackPageContent } from '@/lib/pack-page'
import { POSTURE_COACH_PROMPT, POSTURE_COACH_EASY_PROMPT } from './prompt'

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
    lede: 'Every 20 minutes a little cartoon of you pops up on your Mac with a quick desk stretch. Claude Code draws the cartoon from your photo and builds the app for you. About 10 minutes. Works only in Claude Code, on a Mac.',
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
      text: 'Two ways: the Claude app (easy) or Terminal.',
    },
    {
      target: 'use',
      label: 'The prompts',
      text: 'The message for each way, ready to copy.',
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
      "Free, from Joe Che's AI class. Pick the way that suits you. Way 1 is for everyone: download the folder, drop it into Claude Code in the Claude desktop app, and send one message. Way 2 is for people who already use Claude Code in Terminal: paste one line. Either way, Claude asks for a photo of you (or 5 quick questions), shows you your cartoon, then builds the app on your Mac.",
    note: {
      lead: 'Works only in Claude Code, on a Mac.',
      link: { label: 'See both ways, step by step.', target: 'guide' },
      rest: 'Claude Code is part of the Claude desktop app and needs a paid Claude plan (Pro or higher). It does not work in the normal Claude chat, in ChatGPT or on Windows yet. macOS 13 or newer.',
    },
    primary: {
      label: 'Way 1: download the folder',
      meta: 'posture-coach.zip · then drop it into Claude Code',
      href: ZIP_PATH,
      download: 'posture-coach.zip',
    },
    secondary: [{ label: 'See an example cartoon', href: EXAMPLE_PATH }],
    command: {
      label: 'Way 2: paste this into Terminal (Claude Code installed)',
      text: ONE_LINE_COMMAND,
    },
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
          'Claude Code, with a paid Claude plan (Pro or higher). It comes with the Claude desktop app. The normal Claude chat and ChatGPT cannot build it.',
          "Apple's free command line tools. If you don't have them, Claude installs them for you (one click).",
          'A photo of yourself, or 2 minutes to answer 5 questions.',
        ],
      },
      {
        title: 'Way 1: the easy way (no Terminal)',
        text: 'For everyone. About 10 minutes.',
        steps: [
          'Install the Claude desktop app for Mac from claude.com/download and sign in with your paid plan.',
          'Click "Way 1: download the folder" at the top of this page. You get posture-coach.zip.',
          'In the Claude app, open the Code tab and pick any folder to work in, like your Desktop.',
          'Drag posture-coach.zip into the chat, paste the Way 1 message from "The prompts" below and send it.',
          'When Claude asks, drag in a photo of yourself, or type "describe" and answer 5 quick questions.',
          'Claude shows you a preview of your cartoon in every pose. Say what to change, or say it looks good.',
          'Say yes when Claude asks to run things. Your cartoon appears in the menu bar. Click it, then "Stretch now".',
        ],
      },
      {
        title: 'Way 2: Terminal (for Claude Code users)',
        text: 'If you already run Claude Code in Terminal.',
        steps: [
          'Open Terminal (Cmd + Space, type Terminal, press Enter).',
          'Click Copy on the "Way 2" line at the top of this page, paste it into Terminal in one piece and press Enter. It starts Claude Code with the prompt.',
          'Not installed yet? Terminal says "command not found: claude". Install it with curl -fsSL https://claude.ai/install.sh | bash, open a new Terminal window, and paste the line again. Or use Way 1.',
          'From here it is the same as Way 1: photo or 5 questions, preview, then Claude builds the app.',
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
    heading: 'The prompts',
    intro:
      'Way 1: send the first message in the Claude app\'s Code tab, with posture-coach.zip attached. Way 2: the one line at the top sends the second prompt for you. You can also type claude in Terminal and paste it yourself.',
    cards: [
      {
        label: 'Way 1 · Claude app, Code tab, zip attached',
        title: 'Set up Posture Coach from the folder',
        text: 'Claude unzips the folder and follows the setup inside it: your cartoon, the preview, then the app.',
        prompt: POSTURE_COACH_EASY_PROMPT,
      },
      {
        label: 'Way 2 · Terminal',
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
      a: 'Claude Code is not installed in your Terminal. Easiest fix: use Way 1 in the Claude desktop app instead. Or install it with curl -fsSL https://claude.ai/install.sh | bash, open a new Terminal window and paste the line again.',
    },
    {
      q: 'The Terminal line gives an error',
      a: 'Use the Copy button and paste the line in one piece. If it gets split over two lines, or a space goes missing (like curl-fsSL), it fails. Or use Way 1.',
    },
    {
      q: 'Can I use the normal Claude chat or ChatGPT?',
      a: 'No. It has to build an app on your Mac, so it only works in Claude Code: the Code tab of the Claude desktop app, or Claude Code in Terminal. Claude Code needs a paid Claude plan (Pro or higher).',
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
