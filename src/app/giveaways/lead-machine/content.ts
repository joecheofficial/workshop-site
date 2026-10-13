import type { PackPageContent } from '@/lib/pack-page'
import { LEAD_MACHINE_PROMPT } from './prompt'

// Words for the Lead Machine pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx. Approved by Illy, 2026-10-13
// (prototype https://claude.ai/artifact/E689VgFsvKySijVw1bt64W).

export const ZIP_URL = 'https://workshop.mastermindshq.business/lead-machine-starter.zip'
export const PDF_URL = 'https://workshop.mastermindshq.business/lead-machine-quick-start.pdf'

export const LEAD_MACHINE_CONTENT: PackPageContent = {
  slug: 'lead-machine',
  level: 'beginner',
  hero: {
    title: 'Here is the Lead Machine.',
    free: 'It is free.',
    lede: 'Paste one prompt into ChatGPT or Claude and get 25 real businesses that fit who you serve, each with a real public way to reach them.',
    button: { label: 'Take me to it', meta: 'free · on this page' },
    ticks: ['No sign-up', 'No card', 'Works in ChatGPT or Claude'],
  },
  jumps: {
    get: 'The folder and the 2-page guide.',
    use: 'Copy one prompt into any AI chat. About a minute.',
    stuck: 'The usual problems, and the fix for each.',
  },
  get: {
    heading: 'The Lead Machine folder',
    intro: "Free, from Joe Che's AI class. One zip, one prompt, and a 2-page guide. It is yours to keep and change.",
    phone: {
      lead: 'On your phone?',
      link: 'Start with the prompt below.',
      rest: 'It works in the ChatGPT and Claude apps. The folder needs a computer.',
    },
    primary: { label: 'Download the folder', meta: 'lead-machine-starter.zip · 31 KB', href: ZIP_URL },
    secondary: { label: 'Open the 2-page PDF guide', href: PDF_URL },
  },
  doesHeading: 'It finds. You decide and send.',
  doesNot: ['Send a message, email or DM for you', 'Guess or make up an email', 'Use private personal details'],
  does: [
    'Find 25 businesses that fit who you serve',
    "Give each one's public way to reach them",
    'Find a fresh 25 when you say "more"',
    'Draft first messages in your voice, in warm mode',
  ],
  example: {
    heading: 'One question. Then 25 people to talk to.',
    chatTitle: 'ChatGPT or Claude · new chat',
    label: 'Example chat: you drop in the file, it asks cold, warm or both, you say cold, it lists 25 businesses with a public contact for each',
    messages: [
      { from: 'me', file: 'PASTE-INTO-CHATGPT-OR-CLAUDE.txt' },
      { from: 'ai', text: 'What do you want: cold outreach, warm network, or both?' },
      { from: 'me', text: 'cold' },
      {
        from: 'ai',
        text: 'Going with: you sell 8-week breathwork coaching to burned-out founders, mostly US and UK. Say "change" if that is off.',
        list: [
          { line: 'Aiden Cross, founder coach at Cross Peak Consulting', contact: 'hello@crosspeakconsulting.com' },
          { line: 'Marla Vance, wellness studio owner in Austin', contact: 'marlavance.com/contact' },
        ],
        after: '...23 more. That is 25. Say "more" for another fresh 25, no repeats.',
      },
    ],
    note: 'Example run, made-up names.',
  },
  words: [
    { word: 'cold', text: '25 new leads from the web' },
    { word: 'warm', text: 'People you already know, through your own accounts' },
    { word: 'both', text: 'Cold first, then warm' },
    { word: 'more', text: 'A fresh 25, no repeats' },
    { word: 'change', text: 'Fix who it thinks you serve' },
    { word: 'show my list', text: 'Everyone you approved so far, in warm mode' },
  ],
  files: [
    { name: 'START-HERE.txt', text: 'The two simple ways to run it, on one page.' },
    { name: 'PASTE-INTO-CHATGPT-OR-CLAUDE.txt', text: 'The prompt. Drag it into a chat, or copy and paste it.' },
    { name: 'README.md', text: 'What it does, with an example run.' },
    {
      name: 'CLAUDE.md, AGENTS.md, .claude/commands',
      text: 'For Claude Code, Codex and Gemini CLI: setup, leads, hunt, screen, draft and advanced.',
    },
    { name: 'scripts/find-leads.mjs', text: 'Finds leads without an API key, for the coding-tool way.' },
    {
      name: 'templates/',
      text: 'Your clients, your do-not-contact list and who you already messaged, so it never shows you those people.',
    },
  ],
  use: {
    heading: 'Start in a minute, in any AI chat',
    intro: 'No install. Tap Copy, open ChatGPT or Claude, paste it into a new chat and send. It asks you what it needs.',
    cardLabel: 'the whole Lead Machine in one prompt',
    cardTitle: 'Find my first 25 leads',
    cardText: 'It asks one question, then hands you 25 real businesses with a public way to reach each one.',
    prompt: LEAD_MACHINE_PROMPT,
    openLinks: [
      { label: 'Open ChatGPT', href: 'https://chatgpt.com/' },
      { label: 'Open Claude', href: 'https://claude.ai/new' },
    ],
  },
  ways: [
    {
      title: 'Paste the prompt into a chat',
      sub: 'The card above. Fastest.',
      tags: [
        { label: 'Any AI chat', tone: 'easy' },
        { label: 'Phone OK', tone: 'plain' },
        { label: '1 minute', tone: 'plain' },
      ],
      steps: [
        'Tap Copy the prompt, above.',
        'Open ChatGPT or Claude and start a new chat.',
        'Paste it and send.',
        'Answer its one question: cold, warm, or both.',
      ],
    },
    {
      title: 'Drag the file into a chat',
      sub: 'Same prompt, from the folder.',
      tags: [
        { label: 'Computer', tone: 'plain' },
        { label: 'No install', tone: 'easy' },
      ],
      steps: [
        'Download the folder and unzip it.',
        'Open ChatGPT or Claude in your browser and start a new chat.',
        'Drag PASTE-INTO-CHATGPT-OR-CLAUDE.txt into the chat and send.',
        'Say "cold", or "both".',
      ],
      note: 'Drag the .txt file, not the .zip. Unzip it first.',
    },
    {
      title: 'Open the folder in a coding tool',
      sub: 'Remembers everyone it showed you, across days.',
      tags: [
        { label: 'Needs a terminal', tone: 'warn' },
        { label: 'Computer', tone: 'plain' },
      ],
      steps: ['Unzip the folder.', 'Open it in Claude Code, Codex or Gemini CLI.', 'Say "go".'],
      after:
        'It remembers everyone it has shown you, so "more" never repeats a name, even days later. If a terminal is not your thing, use way 01. Both do the same job.',
    },
  ],
  stuck: [
    {
      q: 'I am on my phone',
      a: 'Use way 01. Copy the prompt on this page and paste it into the ChatGPT or Claude app. The folder needs a computer, so send yourself this page to open it there later.',
    },
    {
      q: 'My email blocked the zip, or it will not open',
      a: 'Email apps often block zip files, which is why we send a link. Use the Download button on this page. On a Mac, double-click the zip. On Windows, right-click it and pick Extract All.',
    },
    {
      q: 'It refused, or said it cannot search the web',
      a: 'Start a new chat and paste the prompt as your very first message. Check that web search is on in that app. It only uses contact details that businesses publish so customers can reach them. Still stuck? Try the other app.',
    },
    {
      q: 'It stopped before 25',
      a: 'Type "keep going". It skips anyone without a public way to reach them and keeps looking until it has 25.',
    },
    {
      q: 'The leads are the wrong kind of business',
      a: 'Type "change", then tell it who you serve in one line. Or paste your website link and it works it out.',
    },
    {
      q: 'I want people I already know',
      a: 'Type "warm". It walks you through connecting your browser, one step at a time, then works from your own accounts: LinkedIn, Instagram, your inbox. You approve and send every message yourself.',
    },
    { q: 'None of these fixed it', email: 'joe@mastermindshq.business', a: 'Say which way you used and paste what the AI said.' },
  ],
  bridge: 'You came for the Lead Machine. It finds the people. When they click your link, they need a good place to land.',
  emailHeading: 'Want more free tools like this in your inbox?',
}
