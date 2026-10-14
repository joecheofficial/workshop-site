import type { PackPageContent } from '@/lib/pack-page'

// Words for the "From Terminal to Claude Desktop" pack page. Promised as a free
// video with no sign-up, so noEmailAsk is on. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx.

const VIDEO_SRC = 'https://media.mastermindshq.business/giveaways/terminal-to-claude-desktop-20260810.mp4'

export const TERMINAL_TO_CLAUDE_DESKTOP_PACK: PackPageContent = {
  slug: 'terminal-to-claude-desktop',
  level: 'builder',
  noEmailAsk: true,
  hero: {
    title: 'Here is the walkthrough.',
    free: 'It is free.',
    lede: 'Follow my walkthrough of using Claude Code inside the Claude Desktop app. About 8 minutes.',
    button: {
      label: 'Watch the video',
      meta: 'free · 8 min 6 sec · on this page',
      target: 'guide',
    },
    ticks: ['No sign-up', 'No card', 'Mac demo, recorded August 2026'],
  },
  jumps: [
    {
      target: 'guide',
      label: 'Watch it',
      text: 'The 8 minute walkthrough, right here.',
    },
    {
      target: 'guide',
      label: 'Follow along',
      text: 'A simple five-step checklist to do it yourself.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  guide: {
    eyebrow: 'The walkthrough',
    heading: 'A practical handoff to the desktop app',
    intro: 'To follow along, sign in to your own Claude account in the app.',
    sections: [
      {
        title: 'Watch the video',
        video: { src: VIDEO_SRC, caption: 'Migrating to Claude Desktop · 8 min 6 sec' },
        text: 'Recording note: this is a Mac demonstration recorded in August 2026. App controls may change over time.',
      },
      {
        title: 'What you will see',
        bullets: [
          'Find Code inside the Claude Desktop app.',
          'Open your existing project folder and review its settings and connectors.',
          'Verify the tools and context your work needs before you rely on them.',
        ],
      },
      {
        title: 'Follow along: a simple checklist',
        steps: [
          "Open the app's Code area.",
          'Select your existing project folder.',
          'Ask Claude to inspect the existing instructions and tools, then report any missing setup.',
          'Approve only the changes you intend.',
          'Run a small, familiar task to check the context.',
        ],
      },
    ],
  },
  stuck: [
    {
      q: 'I cannot find Code in the app',
      a: 'Look for the Code area inside the Claude Desktop app. The video shows where it is. It was recorded in August 2026, so a button may be named or placed a little differently now.',
    },
    {
      q: 'The app asks me to sign in',
      a: 'Sign in to your own Claude account in the app, then follow the steps.',
    },
    {
      q: 'I am not on a Mac',
      a: 'The video is a Mac demonstration. App controls may change over time, so look for the same steps by name: the Code area, your project folder, then the check.',
    },
    {
      q: 'I do not know what to ask Claude',
      a: 'At step 3, ask Claude to inspect the existing instructions and tools in your project, then report any missing setup.',
    },
    {
      q: 'Claude wants to change things I did not ask for',
      a: 'Approve only the changes you intend. You decide what goes through.',
    },
    {
      q: 'How do I know it worked?',
      a: 'Run a small, familiar task. If it behaves the way it did in the terminal, the context came across.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    'You came to see Claude Code in the desktop app. The next step is turning that setup into real work that runs for you, alongside others who build the same way.',
  emailHeading: 'Want more free tools like this in your inbox?',
}
