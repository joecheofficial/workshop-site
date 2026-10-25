import type { PackPageContent } from '@/lib/pack-page'

// Words for the Chat to Flowchart pack page (IG keyword DIAGRAM, Mon 2 Nov 2026).
// Layout, the email ask and the end offer live in src/components/giveaways/PackPage.tsx.
// Tool: next-ai-draw-io by Dayuan Jiang, Apache-2.0, github.com/DayuanJiang/next-ai-draw-io.
// Every fact below was seen working on 25 Oct 2026 (hosted demo: draw, change by chat, export dialog;
// local install without a key: stops with "AI_MODEL environment variable is required"). Notes in
// agents/give-first-studio/jobs/day21-diagram/_test-notes.md.

export const DEMO_URL = 'https://next-ai-drawio.jiang.jp/'
export const GITHUB_URL = 'https://github.com/DayuanJiang/next-ai-draw-io'

export const CHAT_TO_FLOWCHART_CONTENT: PackPageContent = {
  slug: 'chat-to-flowchart',
  level: 'beginner',
  hero: {
    title: 'Type your steps. Get a flowchart.',
    free: 'It is free to try.',
    lede: 'You write what happens, step by step, in plain words. An AI draws the flowchart for you in about 15 seconds. Then you change it by chatting, like "make the boxes bigger". Nothing to install.',
    button: {
      label: 'Show me how',
      meta: '5 steps · on this page',
      target: 'guide',
    },
    ticks: ['Nothing to install', 'Free demo, with a daily limit', 'Your own AI key if you want no limit'],
  },
  jumps: [
    { target: 'get', label: 'Open it', text: 'The free online tool, from its maker.' },
    { target: 'guide', label: 'Set it up', text: 'Your first flowchart in 5 steps.' },
    { target: 'stuck', label: 'Stuck?', text: 'Easy fixes for common problems.' },
  ],
  get: {
    heading: 'Next AI Draw.io',
    intro:
      'Made by Dayuan Jiang and free to use (Apache 2.0 open source). I did not make it and nobody pays me to share it. The free online demo works with no sign-up and no key. It has a usage limit. If you hit it, you can add your own AI key and keep going. The steps are below.',
    primary: { label: 'Open the free tool', meta: 'next-ai-drawio.jiang.jp', href: DEMO_URL },
    secondary: [{ label: 'See it on GitHub', href: GITHUB_URL }],
  },
  promise: {
    heading: 'What it does and does not do',
    does: [
      'Draws a flowchart from a sentence or two (I tried: a keyword comment, a DM, an email ask, a free gift, one reminder)',
      'Lets you change the drawing by chatting: bigger boxes, new colours, move this, add a step',
      'Keeps every version, so you can go back with one click',
      'Saves your drawing as a PNG, an SVG, or a draw.io file you can keep editing',
    ],
    doesNot: [
      'Get it perfect the first time. My first drawing had an arrow running through a box. One chat message fixed it',
      'Work with no limit on the free demo. There is a daily limit and I did not hit it, so I cannot tell you the number',
      'Keep what you type private. Your words go to the demo site and its AI. Do not type client secrets or passwords',
      'Install on a Mac as an app with no warning. The Mac app is not signed by Apple, so Mac blocks it at first. The website needs nothing',
    ],
  },
  guide: {
    eyebrow: 'How it works',
    heading: 'Your first flowchart in 5 steps',
    intro:
      'The easy way is the website. You do not install anything, you do not need Claude or ChatGPT, and you do not need a key to start.',
    sections: [
      {
        title: 'What you need',
        bullets: [
          'A web browser on a computer. It works best on a bigger screen.',
          'Your steps in plain words. Even a rough list is fine.',
          'An AI key from an AI company only if you hit the free limit. Details in "No limit?" below.',
        ],
      },
      {
        title: 'The steps',
        steps: [
          'Go to next-ai-drawio.jiang.jp.',
          'Click the box that says "What would you like to draw?" and type your steps. Example: "When someone comments a keyword on my Instagram post they get a DM. I ask for their email. They get the free gift. If they do not reply I send one reminder."',
          'Press Enter. In my test the drawing took about 15 seconds.',
          'Look at it. Not right? Type the fix into the chat box at the bottom, like "make the boxes bigger and the stop box red". Each change is saved as a new version.',
          'Click the download icon at the top of the chat. Pick PNG (for a slide or post), SVG (sharp at any size) or draw.io (keeps everything editable).',
        ],
      },
      {
        title: 'Things worth drawing first',
        bullets: [
          'Your client journey, from first hello to result.',
          'What happens after someone buys.',
          'Your weekly process, so you can hand it to a helper.',
        ],
      },
      {
        title: 'No limit? Add your own AI key',
        text: 'The demo has a daily limit. To keep going, click the settings icon in the chat panel, then "Use your own API key", then pick a company (OpenAI, Anthropic, Google, DeepSeek, OpenRouter and about 20 more) and paste your key. The tool says your key stays in your browser. A key is a long password from that AI company. You make an account on their site, add a few dollars of credit or use their free tier if they have one, and copy the key. You pay that company for what you use, not the tool. The AI counts its work in small chunks called tokens. In my test one drawing used about 6,000 in and 1,700 out, which should cost a few cents or less on a mid-priced model. Check their price page, because prices change. Never paste your key into a chat, a comment or a DM.',
      },
      {
        title: 'The other ways to get it (not for beginners)',
        text: 'There is a Mac app on the GitHub releases page. It is not signed by Apple, so your Mac will block it the first time and you have to allow it in Privacy & Security. It is a 300 MB download and you still need your own AI key. You can also run it on your own computer with Node and a settings file, but without a key set it stops with "AI_MODEL environment variable is required". The website is the simple way.',
      },
    ],
  },
  stuck: [
    {
      q: 'It says I used up the free limit',
      a: 'The free demo has a limit. Come back tomorrow, or add your own AI key (see "No limit?" above).',
    },
    {
      q: 'An arrow goes through a box, or boxes overlap',
      a: 'Tell it in the chat box: "make sure no arrow crosses a box". It fixes the drawing and keeps the old version so you can go back.',
    },
    {
      q: 'I did not like the change it made',
      a: 'Click "Undo change" under that message, or pick the old version at the top of the chat.',
    },
    {
      q: 'The drawing did not come out at all',
      a: 'Click Retry, or try again with fewer steps. Shorter, clearer steps give better drawings.',
    },
    {
      q: 'Where did my drawing go when I closed the page?',
      a: 'Save it before you leave. Use the download icon and pick draw.io to keep it editable.',
    },
    {
      q: 'Is it safe to type my business steps in?',
      a: 'Your words go to the demo site and the AI it uses. Describe the steps, but leave out names, prices you do not share, passwords and client details.',
    },
    {
      q: 'Still stuck?',
      email: 'joe@mastermindshq.business',
      a: 'Tell us which step you were on and what you saw.',
    },
  ],
  bridge:
    'You just told an AI what you wanted and it built it. That is the same skill you use to build the rest of your business with AI.',
  emailHeading: 'Want more free tools like this, with the honest setup notes?',
}
