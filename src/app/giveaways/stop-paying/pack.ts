import type { PackPageContent } from '@/lib/pack-page'

// Stop Paying bundle, Instagram keyword FREE (Week 6 anchor reel, Mon 16 Nov 2026,
// Nick Saraev "5 free repos" listicle format, approved by Illy 9 Nov 2026).
// Five paid AI tools and the free swap for each. Layout, the email ask and the end
// offer live in src/components/giveaways/PackPage.tsx.
//
// Facts: tested 7 to 9 Nov 2026 on the Studio, reports in the MyOS workspace at
// tasks/swarms/2026-11-09-free-tools-replace-paid/tests/ (OpenCode built a site with
// a free model, no account; VoiceStudio 0.5.8 Mac build is Developer ID signed and
// notarized; Concat, Compositor and yovoice from the Week 3 and Week 5 tests).
// No prices on the page on purpose: paid plans change and this page lives for months.
// The reel carries the prices that were checked on the day it was made.
//
// Level: beginner. The tools are everyday apps for people who are not technical.
// The end offer is the Video Agent (offerId), because the people who come for a free
// video editor and voiceover tool are the ones who film their own videos.

export const STOP_PAYING_PACK: PackPageContent = {
  slug: 'stop-paying',
  level: 'beginner',
  offerId: 'video-agent-swaps',
  hero: {
    title: 'Here are the 5 free swaps.',
    free: 'They are free.',
    lede: 'Five paid AI tools a lot of small businesses pay for every month, and the free tool I would use instead of each one. For every swap: what it does, how to set it up, the catch, and the official link.',
    button: { label: 'Show me the 5 swaps', meta: '5 swaps · on this page', target: 'guide' },
    ticks: ['No card for any of them', 'Free and open source', 'The catch for each one, up front'],
  },
  jumps: [
    { target: 'guide', label: 'The 5 swaps', text: 'Paid tool, free swap, how to set it up.' },
    { target: 'stuck', label: 'Get unstuck', text: 'The usual questions, and the answer to each.' },
  ],
  guide: {
    eyebrow: 'The swaps',
    heading: 'Paid tool, free swap',
    intro: 'Start with the one you pay for and use least. Each swap below has the steps, the catch and the official link.',
    sections: [
      {
        title: 'The 5 swaps at a glance',
        table: {
          head: ['You pay for', 'Free swap', 'What it does'],
          rows: [
            ['CapCut', 'Concat', 'Edits your videos and adds captions, no watermark'],
            ['ElevenLabs', 'VoiceStudio', 'Clones a voice and reads your script out loud'],
            ['Claude Code', 'OpenCode', 'Builds a website from what you type'],
            ['Photoshop', 'Compositor', 'Edits photos, background gone in one click'],
            ['Suno', 'yovoice', 'You type the lyrics, it sings the song'],
          ],
        },
      },
      {
        title: 'Swap 1: CapCut to Concat',
        text: 'Concat is a free, open source video editor for Mac, Windows, Linux and Android. It cuts clips, adds captions and exports up to 4K, with no watermark, no account and no subscription. The catch: it is a beta, and the Mac app is not signed by Apple, so the first time you open it you click Open Anyway in System Settings, Privacy and Security. You only do that once.',
        links: [
          { label: 'My step-by-step setup notes for Concat', href: '/giveaways/free-ai-concat' },
          { label: 'Download Concat (official GitHub releases)', href: 'https://github.com/jub0t/Concat/releases/latest' },
        ],
      },
      {
        title: 'Swap 2: ElevenLabs to VoiceStudio',
        steps: [
          'Open the official download page (link below). On a Mac with an Apple chip (any Mac from late 2020 on), download the file ending in mac-arm64.dmg. Older Intel Macs only get a limited version.',
          'Open the file, drag VoiceStudio into your Applications folder and open it. The Mac app is signed and notarized by Apple, so it should open without a warning.',
          'Open the Model Manager inside the app and download the default VoiceStudio voice model. You only do this once, then it works on your computer.',
          'To clone a voice, add a short, clear recording of that voice, then type what you want it to say.',
        ],
        text: 'Free and open source (AGPL-3.0), for Mac, Windows and Linux, no account. Once the model is downloaded, it runs on your own computer. Usage stats stay off unless you switch them on. The catch: it is a beta, the app is about 260 MB plus the model, and there are paid Pro and Cloud plans you do not need. Only clone your own voice, or a voice you have permission to use.',
        links: [
          { label: 'Download VoiceStudio (official GitHub releases)', href: 'https://github.com/debpalash/VoiceStudio/releases/latest' },
          { label: 'The VoiceStudio website', href: 'https://voicestudio.sh' },
          { label: 'The code on GitHub', href: 'https://github.com/debpalash/VoiceStudio' },
        ],
      },
      {
        title: 'Swap 3: Claude Code to OpenCode',
        steps: [
          'Install OpenCode with the official instructions for Mac (link below). It is one line to paste into Terminal, or a desktop app.',
          'Make an empty folder for your project and open OpenCode in it.',
          'Pick one of the free models: GLM-5.3-Flash Free or DeepSeek V4.1 Flash Free. They need no account and no card.',
          'Type what you want in plain English, like the example below, and watch it build.',
        ],
        prompt: {
          label: 'Try this first (change the business to yours)',
          text: 'Make a one-page website for my yoga studio called Sunny Yoga. Add a class schedule for the week, a short welcome section and a contact form. Save it as index.html.',
        },
        text: 'Free and open source (MIT), for Mac, Windows and Linux. We gave it one sentence like the one above and it built a full studio website in about a minute, with a free model and no account. The catch: the free models are free for a limited time and can change. Some free models may use what you type to improve themselves, but GLM-5.3-Flash Free and DeepSeek V4.1 Flash Free do not keep your data, so use one of those for anything about clients. The free models are good, but they are not Claude. Check every fact on the page it makes: ours made up a star rating.',
        links: [
          { label: 'Install OpenCode (official instructions)', href: 'https://github.com/anomalyco/opencode#installation' },
          { label: 'The OpenCode website', href: 'https://opencode.ai' },
        ],
      },
      {
        title: 'Swap 4: Photoshop to Compositor',
        text: 'Compositor is a free, open source photo editor for Mac. It has layers, text on photos, resize and crop, and a Remove Background filter that works on your Mac, so your photos are not uploaded. It is signed and notarized by Apple. The catch: newer Macs only (Apple chip and macOS 26), and it does not do everything Photoshop does.',
        links: [
          { label: 'My step-by-step setup notes for Compositor', href: '/giveaways/free-ai-compositor' },
          { label: 'Download Compositor (official GitHub releases)', href: 'https://github.com/robbietilton/Compositor/releases/latest' },
        ],
      },
      {
        title: 'Swap 5: Suno to yovoice',
        text: 'yovoice is a free, open source app for Mac and Windows. Type your lyrics, pick a style, and it makes a song with singing, on your own computer, with no fee per song. For anything for your business, use the ACE-Step 1.5 model inside it: the people who made that model say its music can be used commercially. The catch: short, simple lyrics come out clearest, and it is not as polished as Suno.',
        links: [
          { label: 'My step-by-step setup notes for yovoice', href: '/giveaways/free-ai-yovoice' },
          { label: 'Download yovoice (official GitHub releases)', href: 'https://github.com/leemysw/yovoice/releases/latest' },
        ],
      },
      {
        title: 'Before you cancel anything',
        bullets: [
          'All five are free and open source. None of them need a card to start.',
          'A free tool does not always do everything the paid one does. Each swap above says what the catch is.',
          'Try the free tool for a week next to the paid one. Cancel only when you have stopped opening the old one.',
        ],
      },
      {
        title: 'Why I share them',
        text: "I don't make any of these tools and nobody pays me to share them. They are free tools I think are worth ten minutes of your time. Pick one this week and tell me which subscription you cancelled first.",
      },
    ],
  },
  stuck: [
    { q: 'I do not know which one to start with', a: 'Start with the paid tool you use least. Open its swap above and do the first step only.' },
    { q: 'My Mac says it cannot open the app', a: 'For Concat that is normal the first time: open System Settings, then Privacy and Security, scroll down and click Open Anyway. VoiceStudio and Compositor are notarized by Apple, so if your Mac blocks them, download them again from the official link above.' },
    { q: 'Is there a catch?', a: 'Each swap says its catch right under it. The big ones: Concat is a beta, Compositor needs a newer Mac, and the free OpenCode models are free for a limited time.' },
    { q: 'My screen looks different from the steps', a: 'Apps change their screens. Use the official links above, which the people who make each tool keep up to date.' },
    { q: 'None of these fixed it', email: 'joe@mastermindshq.business', a: 'Say which tool and which step you were on, and paste what you saw.' },
  ],
  bridge: 'You came for free tools. If you film your own videos, the next step is letting Claude do the editing for you.',
  emailHeading: 'Want all 5 swaps in your inbox?',
}
