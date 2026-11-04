import type { PackPageContent } from '@/lib/pack-page'

// Words for the Video Editor pack page (IG keyword EDIT, Week 4 Wed 4 Nov, built 2 Nov 2026, PREVIEW until Illy says go).
// Replaces Zoom Cut (cancelled by Illy 2 Nov). Layout, the email ask and the end offer live in
// src/components/giveaways/PackPage.tsx. Facts come from the tool's own files in workspace
// agents/video-editor/video-use (UPSTREAM.md, kit/START-HERE.md): tested 2 Nov on a real raw take of Joe,
// 2.5 min with restarts and someone talking off camera, cut to 1 min, sound in sync at every cut.
// Built on video-use by Browser Use (MIT). 5-year-old English (Illy 23 Oct).

export const ZIP_PATH = '/video-editor.zip'
export const EXAMPLE_PATH = '/video-editor-example.mp4'
export const TERMINAL_LINE = 'cd ~/Downloads/VideoEditor && claude "set it up"'

export const VIDEO_EDITOR_CONTENT: PackPageContent = {
  slug: 'video-editor',
  level: 'builder',
  hero: {
    title: 'Film it messy. Claude edits it for you.',
    free: 'It is free.',
    lede: 'Put your raw videos in a folder and tell Claude what you want. It keeps your best take, cuts the umms, the restarts and the long pauses, and adds captions. Your voice stays in sync with your lips at every cut. It works in Claude Code, on a Mac.',
    button: {
      label: 'Take me to it',
      meta: 'free · on this page',
      target: 'get',
    },
    ticks: ['No sign-up', 'Needs Claude Code on a Mac', 'Your videos stay on your Mac'],
  },
  jumps: [
    { target: 'get', label: 'Get it', text: 'Download the folder. Two ways to start it.' },
    { target: 'guide', label: 'See it', text: 'A real messy take, edited.' },
    { target: 'stuck', label: 'Stuck?', text: 'Easy fixes for common problems.' },
  ],
  get: {
    heading: 'Get the Video Editor',
    intro:
      "Free, from Joe Che's AI class. Download the folder. Drag it into Claude Code and type 'set it up'. Claude gets your Mac ready, then asks where your videos are.",
    note: {
      lead: 'It only works in Claude Code, on a Mac.',
      link: { label: 'See both ways, step by step.', target: 'guide' },
      rest: 'Claude Code comes with the Claude app. You need a paid Claude plan (Pro or more). It does not work in normal Claude chat, in ChatGPT, or on Windows.',
    },
    primary: {
      label: 'Download the folder',
      meta: 'then drag it into Claude Code',
      href: ZIP_PATH,
      download: 'video-editor.zip',
    },
    secondary: [{ label: 'Watch an example', href: EXAMPLE_PATH }],
    command: {
      label: 'Or, if you use Terminal: unzip it in Downloads, then paste this',
      text: TERMINAL_LINE,
    },
  },
  promise: {
    heading: 'It edits like a person who read every word you said.',
    doesNot: [
      'Cut in the middle of a word',
      'Leave your sound out of sync with your lips',
      'Make a pop at the cuts',
      'Change your video before you say yes to the plan',
      'Add music',
    ],
    does: [
      'Write down every word you say, with the exact time',
      'Keep your best take when you said it twice',
      'Cut the umms, the restarts and the long pauses',
      'Add captions',
      'Check every cut itself before it shows you',
    ],
  },
  guide: {
    eyebrow: 'How it works',
    heading: 'From a messy take to a clean video',
    intro:
      'Claude does not watch your video. It reads it: every word, with the exact time it was said. Then it tells you in plain words what it will keep and what it will cut. You say yes, and it makes the video.',
    sections: [
      {
        title: 'A real example',
        text: 'This was a raw 2.5 minute take of Joe. He started over three times and someone talked off camera. Claude kept the clean take, cut the rest and added captions. It came out at 1 minute.',
        video: { src: EXAMPLE_PATH, caption: 'Edited by Claude Code. No hand editing.' },
      },
      {
        title: 'What you need',
        bullets: [
          'A Mac.',
          'Claude Code. It comes with the Claude app. You need a paid Claude plan (Pro or more).',
          'A free ElevenLabs account. It writes down your words. Claude shows you how to get the key.',
          'Your raw videos. Phone videos are fine.',
        ],
      },
      {
        title: 'Way 1: the easy way',
        text: 'For everyone. No Terminal.',
        steps: [
          'Get the Claude app for Mac at claude.com/download. Log in.',
          'On this page, click "Download the folder".',
          'In the Claude app, click Code at the top.',
          'Drag the VideoEditor folder into the chat. (The zip works too.)',
          'Type "set it up" and press Enter. Claude does the rest.',
        ],
      },
      {
        title: 'Way 2: the Terminal way',
        text: 'For people who already use Claude Code in Terminal.',
        steps: [
          'Download the folder. Double-click the zip in Downloads so you get a VideoEditor folder.',
          'Open Terminal. (Press Cmd and Space. Type Terminal. Press Enter.)',
          'Click Copy next to the Terminal line on this page. Paste it into Terminal. Press Enter.',
          'Terminal says "command not found: claude"? Use Way 1.',
        ],
      },
      {
        title: 'Then just ask',
        text: 'Tell Claude where your videos are and what you want. "Make this a 60 second reel." "Cut the part where I lose my words." "Phone shape for Instagram." "Bigger captions." It shows you the plan first.',
      },
      {
        title: 'The first time is slower',
        text: 'The first time, Claude puts a few free tools on your Mac. That takes a few minutes. After that, writing down a 2 minute video takes about 10 seconds.',
      },
    ],
  },
  inside: {
    heading: 'What is in the folder',
    files: {
      heading: 'The files',
      items: [
        { name: 'CLAUDE.md', text: 'Tells Claude what to do when you drag the folder in.' },
        { name: 'START-HERE.md', text: 'The steps Claude follows. You can read them too.' },
        { name: 'SKILL.md', text: 'How Claude edits: the rules it never breaks.' },
        { name: 'helpers/', text: 'The tools Claude uses to write down your words, cut, and make the video.' },
        { name: 'tests/', text: 'Checks that prove it works on your Mac, including the sound-in-sync fix.' },
        { name: 'LICENSE', text: 'Built on video-use by Browser Use. Free to use (MIT).' },
      ],
    },
  },
  stuck: [
    {
      q: 'I have Windows, or I am on my phone',
      a: 'This folder is set up for a Mac. Send this page to yourself and open it on a Mac.',
    },
    {
      q: 'Terminal says "command not found: claude"',
      a: 'Claude Code is not set up in Terminal. Use Way 1 in the Claude app.',
    },
    {
      q: 'Can I use normal Claude chat or ChatGPT?',
      a: 'No. It has to run tools on your Mac. Only Claude Code can do that. It comes with the Claude app, in Code. You need a paid Claude plan (Pro or more).',
    },
    {
      q: 'Do I have to pay ElevenLabs?',
      a: 'The free ElevenLabs plan includes speech to text minutes every month. Check their pricing page for today\'s amount. Your words go to ElevenLabs to be written down. Your video files stay on your Mac.',
    },
    {
      q: 'There are no captions',
      a: 'Ask Claude to run the setup again. It needs the full video tool called ffmpeg-full, not the normal one.',
    },
    {
      q: 'The colours look grey',
      a: 'Your iPhone filmed in HDR. Save the video again from Photos as "Most Compatible" and try again.',
    },
    {
      q: 'Can I add music?',
      a: 'It does not add music. If you add some, use music you have the rights to. Songs from the Instagram or Facebook sound library are only allowed inside Instagram and Facebook.',
    },
    {
      q: 'Still stuck?',
      email: 'joe@mastermindshq.business',
      a: 'Tell us which step you were on and what Claude said.',
    },
  ],
  bridge:
    'Claude Code just edited your video for you. It can take boring jobs off your plate in your business too.',
  emailHeading: 'Want more free things like this from Claude Code?',
}
