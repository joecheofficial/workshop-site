import type { PackPageContent } from '@/lib/pack-page'
import { LINKEDIN_KIT_PROMPT } from './prompt'

// Words for the Joe's LinkedIn Kit pack page (IG keyword KIT, Thu 29 Oct 2026).
// Layout, the email ask and the end offer live in src/components/giveaways/PackPage.tsx.
// Facts come from the kit's own files (kit/README.md, the five SKILL.md files, kit/skills/linkedin-profile/scorecard.md)
// in workspace agents/linkedin/joe-linkedin-kit. Nothing logs in to LinkedIn. Nothing posts. Never promise
// "beats AI detectors" or "runs your LinkedIn".

export const ZIP_PATH = '/downloads/joes-linkedin-kit-v1.0.zip'

export const LINKEDIN_KIT_CONTENT: PackPageContent = {
  slug: 'linkedin-kit',
  level: 'beginner',
  hero: {
    title: "Here is Joe's LinkedIn Kit.",
    free: 'It is free.',
    lede: 'Five Claude skills for LinkedIn posts that sound like you. It writes down how you really talk, then helps with your posts, your profile, your comments and your week. It drafts. You read it, change it, and post it yourself.',
    button: {
      label: 'Take me to the kit',
      meta: 'free · on this page',
      target: 'get',
    },
    ticks: ['No sign-up', 'Never logs in to LinkedIn', 'You post it yourself'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get the kit',
      text: 'Download it, or paste one prompt. Your pick.',
    },
    {
      target: 'guide',
      label: 'What is inside',
      text: 'The five skills, and what each one does.',
    },
    {
      target: 'stuck',
      label: 'Stuck?',
      text: 'Easy fixes for common problems.',
    },
  ],
  get: {
    heading: "Get Joe's LinkedIn Kit",
    intro:
      'There are three ways. Pick the one that fits you. The first two use the zip below. The third needs nothing to install: you paste one prompt into a Claude chat.',
    note: {
      lead: 'It works with Claude.',
      link: { label: 'See the three ways, step by step.', target: 'guide' },
      rest: 'The Claude app skills need a paid Claude plan. The paste-in prompt works in a normal Claude chat.',
    },
    primary: {
      label: 'Download the kit',
      meta: 'zip · about 40 KB',
      href: ZIP_PATH,
      download: 'joes-linkedin-kit-v1.0.zip',
    },
  },
  promise: {
    heading: 'It drafts. You post.',
    doesNot: [
      'Log in to LinkedIn',
      'Post, comment or message for you',
      'Promise to beat AI detectors',
      'Make up your stories. If it needs a fact only you know, it leaves a gap for you to fill',
    ],
    does: [
      'Write down how you sound, from things you really wrote',
      'Turn one real idea into three opening lines and one full post',
      'Score your profile out of 100 and name the 3 fixes that matter most',
      'Draft comments for other people\'s posts, and replies to people on yours',
      'Plan three posts for your week',
    ],
  },
  guide: {
    eyebrow: 'The five skills',
    heading: 'What is inside the kit',
    intro:
      'Start with your voice. Every other skill reads your voice notes first, so the drafts sound like you and not like everyone else.',
    sections: [
      {
        title: '1. sound-like-me',
        text: 'You say "Set up my voice". Claude asks you a few questions and for two or three things you wrote. It writes your voice notes from those. It takes about five minutes, once. After that you can also ask "Does this sound like me?" and it fixes the lines that do not.',
      },
      {
        title: '2. linkedin-post',
        text: 'Give it one real idea. You get three different opening lines and one full draft, ready to copy. A small checker looks for long dashes, stock phrases, exclamation marks and blanks you have not filled in.',
      },
      {
        title: '3. linkedin-profile',
        text: 'Paste in your profile. You get a score out of 100 on a 10-part scorecard, the 3 fixes that matter most, and a new headline and About section. You make the changes yourself.',
      },
      {
        title: '4. linkedin-replies',
        text: 'Paste someone else\'s post and get two comments to pick from. Or paste the comments on your own post and get replies, with the ones that matter most first.',
      },
      {
        title: '5. linkedin-week',
        text: 'Get three posts for the week from your real work, the day for each, and a short comment routine. Nothing is scheduled for you.',
      },
      {
        title: 'Way 1: Claude Code',
        text: 'For people who already use Claude Code on a Mac or Linux.',
        steps: [
          'Download the kit and unzip it.',
          'Open Terminal in the unzipped folder and type: bash install.sh',
          'Open Claude Code and say "Set up my voice".',
        ],
      },
      {
        title: 'Way 2: the Claude app',
        text: 'You need a paid Claude plan to use skills.',
        steps: [
          'In the Claude app, go to Settings, then Capabilities, and turn on Skills.',
          'Download the kit and unzip it. Open the claude-app folder. Upload each of the five zips under Skills.',
          'Start a chat and say "Set up my voice". The app cannot save files on your computer, so Claude gives you your voice notes as text. Paste them into a Claude Project\'s instructions.',
        ],
      },
      {
        title: 'Way 3: no install',
        text: 'Copy the prompt below into a new Claude chat. You lose the shortcuts, not the results.',
      },
      {
        title: 'Where the idea comes from',
        text: 'The idea for a LinkedIn skill pack comes from Jake Schincariol\'s open-source LinkedIn skill (MIT license). The words in this kit are written fresh. The credit is inside the kit.',
      },
    ],
  },
  use: {
    heading: 'The paste-in prompt',
    intro: 'Way 3. Copy it, paste it into a new Claude chat, and answer the questions it asks you.',
    cards: [
      {
        label: 'Way 3 · no install',
        title: 'Teach Claude my voice, then write my posts',
        text: 'Claude asks about you and what you wrote, writes your voice notes, then turns each idea into a post you read and post yourself.',
        prompt: LINKEDIN_KIT_PROMPT,
      },
    ],
    openLinks: [],
  },
  stuck: [
    {
      q: 'Does it post to LinkedIn for me?',
      a: 'No. It never logs in to LinkedIn and never posts, comments or sends anything. You copy the draft and post it yourself.',
    },
    {
      q: 'Will it make me undetectable to AI checkers?',
      a: 'No, and it does not try. It helps you get a draft faster that sounds like you. Read it out loud, change what you want, then post it.',
    },
    {
      q: 'I do not have a paid Claude plan',
      a: 'Use Way 3. Copy the prompt on this page into a Claude chat. It does the voice questions and then writes posts with you. Skills in the Claude app need a paid plan.',
    },
    {
      q: 'The draft has a {{fill this in}} gap',
      a: 'That is on purpose. It needs a real fact from you, like a number or a client story. Add it, or take the line out. It will not make one up.',
    },
    {
      q: 'The draft still does not sound like me',
      a: 'Add more of your own writing to your voice notes. Old posts, emails and long messages work well. Say which line is wrong and Claude fixes it.',
    },
    {
      q: 'How do I remove it?',
      a: 'In Claude Code, run bash install.sh --uninstall in the kit folder. In the Claude app, remove the five skills in Settings, Capabilities.',
    },
    {
      q: 'Still stuck?',
      email: 'joe@mastermindshq.business',
      a: 'Tell us which way you used, which step you were on, and what Claude said.',
    },
  ],
  bridge:
    'Better LinkedIn posts bring people to you. When they click, they need a good place to land, and a website you own is that place.',
  emailHeading: 'Want more free things like this from Claude?',
}
