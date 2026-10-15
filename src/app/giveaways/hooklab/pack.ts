import type { PackPageContent } from '@/lib/pack-page'
import { INSTALL_PROMPT } from './content'

// Words for the HookLab pack page (moved onto PackPage 15 Oct 2026).
// Layout, the email ask and the end offer live in src/components/giveaways/PackPage.tsx.
// Facts come from the install prompt in ./content.ts (the quick hook-lab skill) and
// the README + skill/SKILL.md of github.com/josephtandle/ultimate-hooklab-skill (the
// full HookLab). The old page mixed the two; this page names which one does what.

export const HOOKLAB_REPO = 'https://github.com/josephtandle/ultimate-hooklab-skill'
export const HOOKLAB_INSTALL_COMMAND = 'curl -fsSL https://raw.githubusercontent.com/josephtandle/ultimate-hooklab-skill/main/install.sh | bash'

export const HOOKLAB_PACK: PackPageContent = {
  slug: 'hooklab',
  level: 'builder',
  hero: {
    title: 'Here is HookLab.',
    free: 'It is free.',
    lede: 'A free Claude Code skill that writes Instagram Reel hooks in your own voice. You get five hooks, each one scored, a full script for every hook, and the two to test first. You paste one prompt and Claude Code installs it.',
    button: {
      label: 'Take me to it',
      meta: 'free · on this page',
      target: 'get',
    },
    ticks: ['No sign-up', 'No card', 'Made for Claude Code'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get it',
      text: 'One prompt to paste. Claude Code writes the skill file.',
    },
    {
      target: 'use',
      label: 'Use it now',
      text: 'Type /hook-lab, paste your voice and your topic.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  get: {
    heading: 'Install HookLab',
    intro:
      'Free, from Joe Che. Paste the prompt below into your Claude Code chat. It creates the hook-lab skill file for you, so there is nothing to set up by hand. Want the full version with niche research and a CTA-first mode? That one installs from GitHub, see way 02.',
    note: {
      lead: 'Needs Claude Code.',
      link: { label: 'See both ways to install.', target: 'ways' },
      rest: 'The Claude desktop app works too.',
    },
    secondary: [{ label: 'The full HookLab on GitHub', href: HOOKLAB_REPO }],
    command: { label: 'Paste into your Claude Code chat', text: INSTALL_PROMPT },
  },
  promise: {
    heading: 'It writes the hooks. You stay the voice.',
    doesNot: [
      'Write a single hook before it has your brand voice profile and your topic',
      'Invent a better credential than the one you gave it',
      'Use any word or tone on your no-go list',
      'Post anything for you',
    ],
    does: [
      'Write five hooks, each one built on a different reason people stop scrolling',
      'Score every hook and write a 60 to 90 second Reel script for each',
      'Pick two winners that work in different ways, and say which to test first',
      'Offer to save the winner to a log you fill in at 48 hours',
    ],
  },
  guide: {
    eyebrow: 'What you get each run',
    heading: 'Five hooks, scored, with a script for each',
    intro:
      'Every hook has to pass the Friend Test: it must sound like something you would say out loud to a friend who is in your audience. If it sounds like a copywriter wrote it, it gets rewritten.',
    sections: [
      {
        title: 'The five hooks',
        table: {
          head: ['Hook', 'Why people stop'],
          rows: [
            ['1. The curiosity gap', 'A specific claim with the answer held back. The brain wants to close the gap.'],
            ['2. The pattern interrupt', 'It breaks what the viewer expects, so they stop scanning.'],
            ['3. Loss aversion', 'What they are losing or getting wrong. A loss pulls harder than a gain.'],
            ['4. The belief reversal', '"I used to believe X. I was wrong." It has to be a belief you really held.'],
            ['5. Direct address', 'It names the viewer\'s exact situation, so they think "that is me".'],
          ],
        },
      },
      {
        title: 'How each hook is scored',
        text: 'Three scores out of 10, for a total out of 30. A hook that breaks your no-go list scores zero on voice, whatever else it does well.',
        table: {
          head: ['Score', 'What it checks'],
          rows: [
            ['Specificity', 'Real details: a number, a name, a real situation.'],
            ['Mechanism strength', 'How well the hook uses its reason to stop the scroll.'],
            ['Brand voice match', 'Does it sound like you, checked against your voice sample.'],
          ],
        },
      },
      {
        title: 'What it gives back',
        steps: [
          'A quick list of all five hooks with their scores, and the one it recommends.',
          'Each hook in full: the hook line (10 words or fewer), its scores, one line on why it works for your audience, and a full Reel script of 120 to 160 words in your voice.',
          'The two winners, chosen to work in different ways so you can test them against each other.',
          'Which one to test first, and the one number to watch: saves, comments or shares.',
          'One thing to notice about how you naturally talk.',
        ],
      },
      {
        title: 'What to put in your brand voice profile',
        text: 'A few lines on each of these is enough. Your words, not polished ones.',
        bullets: [
          'The change you help people make, in your exact words.',
          'The mistake your audience makes that keeps them stuck, the way they would say it.',
          'Your credibility: years, number of clients or one real result.',
          'Three words for your tone, plus one sentence that sounds like you.',
          'This week\'s topic, and any detail, number or example you want in the hooks.',
          'Your no-go list: words, phrases and tones you would never use.',
        ],
      },
      {
        title: 'The full HookLab on GitHub',
        text: 'The bigger version of the same idea. It lives in ~/.hooklab/ and you run it with /hooklab.',
        table: {
          head: ['Mode', 'Use it when'],
          rows: [
            ['Standard', 'You want hooks from your brand voice and this week\'s topic. It writes 15, scores them all and keeps the best 5, with 2 winners.'],
            ['Mode 1: Reverse engineer', 'You want to see what is working in your niche first, then rebuild the best hooks in your voice.'],
            ['Mode 2: CTA first', 'You know your giveaway or lead magnet and want hooks that lead to it.'],
          ],
        },
        bullets: [
          'Scores every hook out of 50 on five things: concreteness, mechanism, voice fidelity, self-recognition and thumb stop.',
          'Keeps a kill list of tired openers it never uses.',
          'Needs Claude Code, Node.js for the niche research, and 3 to 5 Instagram accounts in your niche to study.',
        ],
        links: [{ label: 'josephtandle/ultimate-hooklab-skill', href: HOOKLAB_REPO }],
      },
    ],
  },
  use: {
    heading: 'After it is installed, run it',
    intro: 'Type the command into Claude Code. It asks for your brand voice profile and your topic, then writes the hooks.',
    cards: [
      {
        label: 'start a run',
        title: 'Run HookLab',
        text: 'Type this into Claude Code. If it does not show up, start a new Claude Code session first.',
        prompt: '/hook-lab',
      },
      {
        label: 'your answer when it asks',
        title: 'Your voice and this week\'s topic',
        text: 'Fill in the boxes, copy, and paste it when HookLab asks. Paste your full brand voice profile if you have one.',
        prompt: 'My brand voice profile:\n{{profile}}\n\nThis week\'s topic: {{topic}}\n\nDetails, numbers or examples to use: {{details}}',
        fields: [
          { key: 'profile', label: 'Your brand voice profile', token: 'who you help, the change you teach, your tone, your no-go words', multiline: true },
          { key: 'topic', label: 'This week\'s topic', token: 'the topic of this week\'s Reel' },
          { key: 'details', label: 'Details to weave in', token: 'any detail, number or example', multiline: true },
        ],
      },
    ],
    openLinks: [],
  },
  ways: {
    heading: 'Two ways to install it',
    intro: 'Pick the one that matches how you work. Tap a way to see its steps.',
    items: [
      {
        title: 'Paste the prompt into Claude Code',
        sub: 'The quick hook-lab skill. Claude Code writes the file.',
        tags: [
          { label: 'Easiest', tone: 'easy' },
          { label: 'No Terminal needed', tone: 'plain' },
        ],
        steps: [
          'Copy the install prompt, above.',
          'Open Claude Code. The Claude desktop app works too.',
          'Paste it into the chat and send. It creates ~/.claude/skills/hook-lab/SKILL.md.',
          'Start a new session and type /hook-lab.',
        ],
      },
      {
        title: 'Install the full HookLab from GitHub',
        sub: 'Niche research, CTA-first mode and a 50 point score.',
        tags: [
          { label: 'Needs a terminal', tone: 'warn' },
          { label: 'Node.js', tone: 'plain' },
        ],
        steps: [
          `In Terminal, run: ${HOOKLAB_INSTALL_COMMAND}`,
          'Fill in ~/.hooklab/personal/my-brand-voice.md completely. Every blank field makes a weaker hook.',
          'Add 3 to 5 Instagram accounts in your niche to ~/.hooklab/personal/research-accounts.md.',
          'Add this week\'s topic to ~/.hooklab/personal/this-week.md.',
          'In Claude Code, type /hooklab and pick Standard, Mode 1 or Mode 2.',
        ],
        note: 'It is for your own use: the license says never sell or share it. It updates itself every week and backs up your own files first.',
      },
    ],
  },
  stuck: [
    {
      q: 'Where do I paste the install prompt?',
      a: 'Into the chat of Claude Code or the Claude desktop app, not into Terminal. Claude Code then writes the skill file for you.',
    },
    {
      q: '/hook-lab does not show up',
      a: 'Start a new Claude Code session so it loads new skills. Then check the file exists at ~/.claude/skills/hook-lab/SKILL.md. If it does not, paste the install prompt again.',
    },
    {
      q: 'I do not have a brand voice profile',
      a: 'Write a few lines on the six things under "What to put in your brand voice profile" above. One real sentence in your own voice matters most.',
    },
    {
      q: 'The hooks do not sound like me',
      a: 'Add a sentence you really said or wrote, and a no-go list. HookLab checks every hook against both.',
    },
    {
      q: 'I use ChatGPT, not Claude Code',
      a: 'HookLab is built as a Claude Code skill, so it needs Claude Code or the Claude desktop app.',
    },
    {
      q: 'Where is my hook log?',
      a: 'The quick skill saves it to ~/hook-lab/hooks-log.md when you say yes. Fill in your results at 48 hours.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    'You came for better hooks. Every good hook sends people somewhere, and the best place to send them is a website people can find.',
  emailHeading: 'Want the HookLab install prompt by email too?',
}
