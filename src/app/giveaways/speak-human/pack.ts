import type { PackPageContent } from '@/lib/pack-page'
import { SPEAK_HUMAN_INSTALL } from './prompts'

// Words for the Speak Human pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx.

export const GITHUB_URL = 'https://github.com/josephtandle/speak-human'
export const INSTALL_URL = 'https://github.com/josephtandle/speak-human/blob/main/INSTALL.md'

export const SPEAK_HUMAN_PACK: PackPageContent = {
  slug: 'speak-human',
  level: 'beginner',
  hero: {
    title: 'Here is Speak Human.',
    free: 'It is free.',
    lede: 'A free skill for Claude Code. It takes out the patterns that make writing sound like AI, and rewrites your text so it sounds like a person wrote it. You paste one request to install it.',
    button: {
      label: 'Take me to it',
      meta: 'free · on this page',
      target: 'get',
    },
    ticks: ['No sign-up', 'No card', 'Made for Claude Code and Codex'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get it',
      text: 'One request to paste. Your assistant does the install.',
    },
    {
      target: 'use',
      label: 'Use it now',
      text: 'Paste a draft and ask for a rewrite.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  get: {
    heading: 'Install Speak Human',
    intro:
      "Free, from Joe's public GitHub repo. It is a local skill that runs in your assistant, not an outside service. Paste the request below into your assistant's chat and it installs the skill for you.",
    note: {
      lead: 'Using ChatGPT or claude.ai in the browser?',
      link: { label: 'See way 02 below.', target: 'ways' },
      rest: 'There is a different way to add it.',
    },
    primary: {
      label: 'Open the repo on GitHub',
      meta: 'github.com/josephtandle/speak-human',
      href: GITHUB_URL,
    },
    secondary: [{ label: 'Read INSTALL.md', href: INSTALL_URL }],
    command: {
      label: 'Paste into your Claude Code or Codex chat',
      text: SPEAK_HUMAN_INSTALL,
    },
  },
  promise: {
    heading: 'It rewrites the writing. It leaves the rest alone.',
    doesNot: [
      'Change code blocks, commands or prompt text',
      'Change your facts or your meaning',
      'Rewrite anything when you say "check this without changing it"',
      'Work as an outside service: it is a local skill, not an external API',
    ],
    does: [
      'Ask your permission before it downloads and installs',
      'Check that it works, and tell you the version and where it installed it',
      'Tell you briefly what it changed',
      'Edit only the writing you asked about, when you name a file',
    ],
  },
  guide: {
    eyebrow: 'What is inside',
    heading: 'Everything inside this skill',
    intro:
      'Five parts. The voice profile is the part that makes it yours. The rest takes the AI out. Together they handle website copy, Instagram hooks, email sequences, and any copy that needs to sound human.',
    sections: [
      {
        title: 'Voice Profile Builder',
        bullets: [
          'One-time setup: Point it at your podcast transcripts, book chapters, or Instagram captions once. It finds your real voice patterns and saves them. Never asks again.',
          'What gets extracted: Sentence length and rhythm, paragraph structure, signature vocabulary, recurring phrases, perspective (I/you/we), hedging level, tone markers, and what you never say.',
          'Gold standard examples: Picks 3-5 sentences from your content that best show your voice at its best. Uses them as the target for every future rewrite.',
          "Works with any content: Podcast transcripts, book chapters, Instagram captions, newsletter issues, emails you're proud of. One strong file is enough to start.",
        ],
      },
      {
        title: 'AI Pattern Detection (41 patterns)',
        bullets: [
          'Content inflation removal: Strips big claims, vague sources, promotional language, and generic conclusions. "Pivotal moment in history" becomes the thing that actually happened.',
          'AI vocabulary blacklist: Catches words like utilize, delve, foster, pivotal, multifaceted, and 35+ more. Updated for 2025-2026 additions like "I\'ll be honest" and "do a lot of heavy lifting."',
          'Structural problem detection: Finds binary contrasts ("Not because X. Because Y."), dramatic fragmentation, rhetorical setups, false agency, and passive voice. All of them.',
          'Formatting tells: Zero tolerance for em dashes. Catches bold overuse, structured list syndrome, question-format headings, and Markdown bleeding into plain text.',
          'Chatbot artifact removal: "I hope this helps," "Certainly", "Let\'s dive in" are gone. Knowledge-cutoff disclaimers and comprehensive overview openers too.',
          'Code and prompt protection: Detects code blocks, technical commands, and prompt text and skips them entirely. It rewrites the writing around them, never through them. Your logic stays intact.',
        ],
      },
      {
        title: 'Voice Presets (5)',
        bullets: [
          'Casual: Connection, directness, self-awareness. Short and varied sentences. Fragments when they land. No hedging, no formal transitions. Personal experience over cited sources.',
          'Professional: Clarity, concrete examples, earned credibility. Dry wit over jokes. Opinions stated as opinions, not facts. Selective contractions. No jargon.',
          'Technical: Precision, concrete numbers, exact terminology. One point per sentence. File paths, version numbers, specific behavior. Deadpan observations allowed.',
          'Warm: Shared experience, honest acknowledgment of difficulty. Shorter paragraphs. First person. "I struggled with this too" over "many people find this difficult."',
          'Blunt: The shortest path to the point. Everything that is not the point gets cut. Active voice only. No hedging unless genuinely uncertain.',
        ],
      },
      {
        title: 'Three Operation Modes',
        bullets: [
          'Rewrite it: Paste a draft and say "make this sound human" or "make this sound like me". It keeps your facts and meaning, fixes the stiff parts and tells you briefly what changed.',
          'Check it: Say "check this without changing it". You get every pattern it found, where it is and a suggested fix. Nothing gets rewritten.',
          'Edit a file: Name a file and it edits only the prose you asked about, then reads it back so you can see the result. Code and quotes stay untouched.',
        ],
      },
      {
        title: 'Aggressive Mode',
        bullets: [
          'Go harder: Ask for it blunter or shorter and it tightens sentences and cuts hedging, without inventing certainty you did not have.',
        ],
      },
    ],
  },
  use: {
    heading: 'After it is installed, just ask',
    intro:
      'Paste one of these into the same chat, then put your draft under it. It keeps what already sounds real and rewrites the rest.',
    cards: [
      {
        label: 'the rewrite, in your voice',
        title: 'Make this sound like me',
        text: 'Paste your draft under it. Speak Human keeps your facts and meaning, fixes the stiff parts and tells you what changed.',
        prompt: 'Use Speak Human to make this sound like me.',
      },
      {
        label: 'look but do not touch',
        title: 'Check this without changing it',
        text: 'Paste your draft under it. You get every pattern it found, where it is and a suggested fix. Nothing gets rewritten.',
        prompt: 'Use Speak Human to check this without changing it.',
      },
    ],
    openLinks: [],
  },
  ways: {
    heading: 'Two ways to add it',
    intro: 'Pick the one that matches what you use. Tap a way to see its steps.',
    items: [
      {
        title: 'Paste the setup request into Claude Code or Codex',
        sub: 'The request above. Your assistant installs it.',
        tags: [
          { label: 'Easiest', tone: 'easy' },
          { label: 'No Terminal or Git needed', tone: 'plain' },
        ],
        steps: [
          'Copy the setup request, above.',
          'Open Claude Code or Codex. The Claude desktop app works too.',
          'Paste it into the chat, not Terminal, and send.',
          'Your assistant asks permission to download and install. Say yes.',
          'It checks that it works and tells you the version and where it installed it.',
        ],
      },
      {
        title: 'Use it in ChatGPT or claude.ai in the browser',
        sub: 'Attach the skill file to your chat.',
        tags: [
          { label: 'Browser', tone: 'plain' },
          { label: 'By hand', tone: 'plain' },
        ],
        steps: [
          'Open the Speak Human repo on GitHub.',
          'Download speak-human.zip from the latest release.',
          'Attach SKILL.md to your chat.',
        ],
        note: 'The INSTALL.md file in the repo has the details.',
      },
    ],
  },
  stuck: [
    {
      q: 'I use ChatGPT or claude.ai in the browser',
      a: 'Use way 02. Download speak-human.zip from the latest release on GitHub and attach SKILL.md to your chat.',
    },
    {
      q: 'Where do I paste the setup request?',
      a: 'Into the chat of Claude Code or Codex, not into Terminal. The Claude desktop app works too.',
    },
    {
      q: 'It asked for permission',
      a: 'That is normal. Your assistant asks before it downloads and installs. You do not need Terminal or Git.',
    },
    {
      q: 'How do I know it worked?',
      a: 'The request asks your assistant to check that it works and tell you the version and where it installed it. If it did not say, ask it for both.',
    },
    {
      q: 'I do not want it to change my code or prompts',
      a: 'It will not. It finds code blocks, commands and prompt text and skips them. It rewrites the writing around them, never through them.',
    },
    {
      q: 'It does not sound like me yet',
      a: 'Build your voice profile once. Point it at your podcast transcripts, book chapters or Instagram captions. One strong file is enough to start.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    'You came to make your writing sound like you. Your website is the first place people read it, so a site you own is where your own words belong.',
  emailHeading: 'Want the Speak Human install notes by email too?',
}
