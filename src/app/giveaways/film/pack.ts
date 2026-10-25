import type { PackPageContent } from '@/lib/pack-page'
import { FILM_PROMPT } from './prompt'

// Words for the Make-a-Film pack page (IG keyword FILM, Sun 1 Nov 2026).
// Layout, the email ask and the end offer live in src/components/giveaways/PackPage.tsx.
// Tool: Lemo-Opuscar by LemoLab, github.com/lemomo-ai/lemo-opuscar (MIT code; demo films CC BY 4.0).
// Facts come from a real test on 25 Oct 2026: workspace agents/give-first-studio/jobs/day20-film/TEST-REPORT.md.
// Tested: clone + setup.sh deps + one 20 s film (about 11 minutes, Claude Code + Opus, Mac).
// Not tested: the plugin install route, voice and music tiers, a Mac with none of the tools installed.
// Illy 23 Oct: every instruction in very simple words, like for a 5-year-old.

export const GALLERY = 'https://lemomo-ai.github.io/lemo-opuscar/'
export const REPO = 'https://github.com/lemomo-ai/lemo-opuscar'

export const FILM_CONTENT: PackPageContent = {
  slug: 'film',
  level: 'builder',
  hero: {
    title: 'Tell Claude a story. Get a short film.',
    free: 'It is free.',
    lede: 'Claude Code can draw, add sound to and make a short animated film from your story idea. All on your Mac. It is for fun stories, not for everyday work. The first set-up takes a little while. Your first film can be done in about 10 minutes after that.',
    button: {
      label: 'Take me to it',
      meta: 'free · on this page',
      target: 'get',
    },
    ticks: ['No sign-up', 'Needs Claude Code on a Mac', 'Short, simple films'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get it',
      text: 'The free film library, in one prompt.',
    },
    {
      target: 'use',
      label: 'The prompt',
      text: 'Copy it, paste it in Claude Code, done.',
    },
    {
      target: 'stuck',
      label: 'Stuck?',
      text: 'Easy fixes for common problems.',
    },
  ],
  get: {
    heading: 'Get your film maker',
    intro:
      'This is a free library of 59 film looks, like crayon picture book, watercolor, paper cut-out and pixel game. You tell Claude Code your story. It picks a look, draws every picture with code, adds sound and makes the video file. You copy one prompt. Claude Code does the set-up for you.',
    note: {
      lead: 'It only works in Claude Code, on a Mac.',
      link: { label: 'See what you need, step by step.', target: 'guide' },
      rest: 'Claude Code comes with the Claude app. You need a paid Claude plan (Pro or more). It does not work in normal Claude chat or in ChatGPT.',
    },
    secondary: [
      { label: 'Watch the film gallery', href: GALLERY },
      { label: 'See it on GitHub', href: REPO },
    ],
  },
  promise: {
    heading: 'What to expect. The honest version.',
    doesNot: [
      'Make long films. The films here are short, about 20 seconds for a first one',
      'Make real people, or look like a big studio movie. The pictures are simple, drawn with code',
      'Work for everyday business jobs. It is for fun stories',
      'Set up with one click. You need Claude Code, Node, ffmpeg and Python first',
      'Work as well in other AI tools. It is made for Claude, and works best with Claude Opus',
    ],
    does: [
      'Turn one story idea into a finished video file',
      'Draw it in a look you pick, like crayon picture book',
      'Add sound effects. Voice and music are an extra step',
      'Make a 20 second film in about 10 to 15 minutes, in our test',
      'Make films that are yours. No watermark, no credit needed',
    ],
  },
  guide: {
    eyebrow: 'How it works',
    heading: 'From your story idea to a video',
    intro:
      'You paste one prompt into Claude Code. Claude checks your Mac, gets the free film library, and sets it up. Then it asks you for your story idea and makes the film.',
    sections: [
      {
        title: 'What you need',
        bullets: [
          'A Mac.',
          'Claude Code. It comes with the Claude app. You need a paid Claude plan (Pro or more).',
          'Node (version 20 or newer), ffmpeg, and Python 3.11 or newer. The Python that comes with a Mac is too old. Claude will check each one and ask before it installs anything. If you have none of them, this set-up is the slowest part.',
          'A story idea. Something fun, like a cat that opens a bakery.',
          'A little patience. A short film takes Claude about 10 to 15 minutes to make.',
        ],
      },
      {
        title: 'Step by step',
        text: 'The easy way. No coding.',
        steps: [
          'Get the Claude app for Mac at claude.com/download. Log in.',
          'Click Code at the top of the app. Pick a new empty folder to work in.',
          'On this page, click Copy on the prompt. Paste it into the chat and press Enter.',
          'Say yes when Claude asks to install anything that is missing. If a box about "command line tools" pops up, click Install and wait.',
          'When Claude asks for your story idea, type it. Pick one of its 3 looks. Say you want a short film with no voice and no music for your first one.',
          'Wait. Claude draws, adds sound and makes the video. Then it tells you where the file is and opens it.',
        ],
      },
      {
        title: 'Make it better',
        text: 'Your first film will be simple. That is normal. Ask Claude to change the look, the story or the length, and make it again. Voice and music are extras that need more set-up. Ask Claude about them once your first film works.',
      },
      {
        title: 'Credit',
        text: 'This is the free Lemo-Opuscar library, made by LemoLab (github.com/lemomo-ai/lemo-opuscar). The code is MIT licensed. The sample films in their gallery are CC BY 4.0, so credit LemoLab if you reuse those. Films you make yourself with it are yours.',
      },
    ],
  },
  use: {
    heading: 'The prompt',
    intro:
      'Copy this and paste it into Claude Code, in an empty folder. Claude does the rest.',
    cards: [
      {
        label: 'Claude Code · Mac',
        title: 'Set up my film maker',
        text: 'Claude checks your Mac, gets the free film library, sets it up, asks for your story idea and makes a short film.',
        prompt: FILM_PROMPT,
      },
    ],
    openLinks: [],
  },
  stuck: [
    {
      q: 'I have Windows, or I am on my phone',
      a: 'This page is for a Mac. Send it to yourself and open it on a Mac.',
    },
    {
      q: 'Claude says Python is too old, or it is missing',
      a: 'A Mac comes with an old Python. You need Python 3.11 or newer. Tell Claude "yes, install it", or ask it to walk you through installing Homebrew first.',
    },
    {
      q: 'A box pops up about "command line tools"',
      a: 'Click Install. Wait a few minutes. Then tell Claude it is done.',
    },
    {
      q: 'The set-up is taking a long time',
      a: 'The first set-up downloads a lot. It can take a few minutes. Later films skip it.',
    },
    {
      q: 'The video file is huge',
      a: 'Tell Claude: "make the video file smaller, under 50 MB". The default setting makes a very big file.',
    },
    {
      q: 'The letters look plain, not like the gallery',
      a: 'Some fonts in the gallery films are not included. Claude uses one that is installed. The film still works. Ask Claude to try another look if you do not like it.',
    },
    {
      q: 'My film looks simple or stiff',
      a: 'It is a short film drawn with code, so it is simple. Ask Claude to add more detail, change the look, or make the characters bigger. Claude Opus does best.',
    },
    {
      q: 'Can I use normal Claude chat or ChatGPT?',
      a: 'No. It has to build and run files on your Mac. Only Claude Code can do that. It comes with the Claude app, in Code. You need a paid Claude plan (Pro or more).',
    },
    {
      q: 'How do I remove it?',
      a: 'Delete the ~/lemo-opuscar folder from your Mac. That is all.',
    },
    {
      q: 'Still stuck?',
      email: 'joe@mastermindshq.business',
      a: 'Tell us which step you were on and what Claude said.',
    },
  ],
  bridge:
    'Claude Code made a whole film from one sentence. It can build the things your business needs too.',
  emailHeading: 'Want more free things like this from Claude Code?',
}
