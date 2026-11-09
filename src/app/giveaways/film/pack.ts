import type { PackPageContent } from '@/lib/pack-page'
import { FILM_PROMPT } from './prompt'

// Words for the Make-a-Film pack page (IG keyword FILM, Sun 1 Nov 2026; explainer reel update 9 Nov 2026).
// Layout, the email ask and the end offer live in src/components/giveaways/PackPage.tsx.
// Tool: Lemo-Opuscar by LemoLab, github.com/lemomo-ai/lemo-opuscar (MIT code; demo films CC BY 4.0).
// Facts come from real tests. 25 Oct 2026: clone + setup.sh deps + one 20 s film (about 11 minutes,
// Claude Code + Opus, Mac), workspace agents/give-first-studio/jobs/day20-film/TEST-REPORT.md.
// 9 Nov 2026 (library at 66 styles, workspace agents/video-editor/lemo-opuscar, SKILL.md "Known gaps"):
//   Test A: one plain-English idea -> 27 s vertical whiteboard explainer with voiceover (our own voice file,
//     the library's own voice is a computer voice), licensed music and code-made sound, ~30 min wall time,
//     render ~20 s. 9:16 worked but Claude had to adapt the style engine for it.
//   Test B: brand colours, fonts and logo -> Dark Tech Keynote turned into a brand style in ~20 min.
//     Claude reads the reference pictures itself (no tool) and changes an existing style; not a new style.
// Not allowed on this page: "under 10 minutes", "a whole new style", "studio quality", "works with any AI".
// Not tested: the plugin install route, a Mac with none of the tools installed.
// Illy 23 Oct: every instruction in very simple words, like for a 5-year-old.
// End offer: the $27 Video Agent (offerId), the paid video product for people who make videos with Claude.

export const GALLERY = 'https://lemomo-ai.github.io/lemo-opuscar/'
export const REPO = 'https://github.com/lemomo-ai/lemo-opuscar'

export const FILM_CONTENT: PackPageContent = {
  slug: 'film',
  level: 'builder',
  offerId: 'video-agent-film',
  hero: {
    title: 'Tell Claude your idea. It draws the video.',
    free: 'It is free.',
    lede: 'A free skill teaches Claude Code 66 art styles, like whiteboard, cartoon, watercolor and old newsreel. You pick one and describe your idea in plain English. Claude writes the story, adds a voiceover, music and sound, then draws every frame in code. All on your Mac. The first set-up takes a while. After that, a 20 to 30 second film took about 20 to 30 minutes in our tests.',
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
      'It is a free skill for Claude Code, called Lemo-Opuscar. It has 66 art styles, like whiteboard, cartoon, watercolor, old newsreel and crayon picture book. You tell Claude Code your idea. It can be something to explain, or a fun story. Claude helps you pick a style, writes the story, draws every picture with code, adds sound and makes the video file. You copy one prompt. Claude Code does the set-up for you.',
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
      'Make long films. Ours were short, 20 to 30 seconds',
      'Make real people, or look like a big studio movie. The pictures are simple, drawn with code',
      'Sound like a real person on its own. Its own voice is a computer voice. Bring your own recording for a real voice',
      'Make a brand new style from nothing. It changes one of its 66 styles to fit your brand',
      'Set up with one click. You need Claude Code, Node, ffmpeg and Python first',
      'Work as well in other AI tools. It is made for Claude, and works best with Claude Opus',
    ],
    does: [
      'Turn one idea in plain English into a finished video file, like an explainer or a fun story',
      'Draw it in a style you pick, like whiteboard or watercolor',
      'Add a voiceover, music and sound effects. In our test we gave it our own voice recording and our own music',
      'Make a 20 to 30 second film in about 20 to 30 minutes, in our tests, after the set-up',
      'Turn one of its styles into your own, with your brand colors, fonts and logo. About 20 minutes in our test',
      'Make tall videos for Reels (9:16). Claude may change the style a little to fit',
      'Make films that are yours. No watermark, no credit needed',
    ],
  },
  guide: {
    eyebrow: 'How it works',
    heading: 'From your idea to a video',
    intro:
      'You paste one prompt into Claude Code. Claude checks your Mac, gets the free film library, and sets it up. Then it asks you for your idea and makes the film.',
    sections: [
      {
        title: 'What you need',
        bullets: [
          'A Mac.',
          'Claude Code. It comes with the Claude app. You need a paid Claude plan (Pro or more).',
          'Node (version 20 or newer), ffmpeg (version 7 or newer), and Python 3.11 or newer. The Python that comes with a Mac is too old. Claude will check each one and ask before it installs anything. If you have none of them, this set-up is the slowest part.',
          'An idea. Something to explain, like how your service works. Or something fun, like a cat that opens a bakery.',
          'Some patience. In our tests, a 20 to 30 second film took Claude about 20 to 30 minutes to make.',
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
          'When Claude asks for your idea, type it in plain English. Pick one of the 3 styles it offers. Claude will tell you to keep your first film short, with no voice and no music. That is the fastest way to a first film.',
          'Wait. Claude draws, adds sound and makes the video. Then it tells you where the file is and opens it.',
        ],
      },
      {
        title: 'Make it better',
        text: 'Your first film will be simple. That is normal. Ask Claude to change the style, the story or the length, and make it again. Then try these.',
        bullets: [
          'Voice and music. Ask Claude to add a voiceover and music. Its own voice is a computer voice. For a real voice, give it your own recording. You can give it your own music too. This needs a little more set-up, and Claude does it for you.',
          'Your brand. Give Claude your brand colors, fonts and logo, plus a few pictures of the look you want. Pick one of the 66 styles to start from. Claude looks at the pictures itself and changes that style to fit your brand. It is your own version of one style, not a brand new style. In our test it took about 20 minutes.',
          'Tall videos for Reels. Ask for 9:16. It worked in our test, but Claude had to change the style a little to fit.',
        ],
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
    'You came to make a film with Claude. If you also film your own videos on a Mac, the next step is letting Claude do the editing too.',
  emailHeading: 'Want more free things like this from Claude Code?',
}
