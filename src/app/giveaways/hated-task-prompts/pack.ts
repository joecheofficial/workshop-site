import type { PackPageContent } from '@/lib/pack-page'
import { HATED_TASK_CARDS } from './prompts'

// Hated-Task Prompt Pack giveaway (keyword TASK), on the pack page template (Illy, 2026-10-14).
// Replaces the static public/hated-task-prompts.html; next.config redirects the old address here.

export const HATED_TASK_PROMPTS_PACK: PackPageContent = {
  slug: 'hated-task-prompts',
  level: 'beginner',
  hero: {
    title: 'Here is the Hated-Task Prompt Pack.',
    free: 'It is free.',
    lede: "Nine prompts for the work you'd rather never do again. Fill in the blanks, then send it straight to Claude or ChatGPT in one click.",
    button: { label: 'Take me to the prompts', meta: 'free · on this page', target: 'use' },
    ticks: ['No sign-up', 'No card', 'Works in Claude or ChatGPT'],
  },
  jumps: [
    { target: 'guide', label: 'Start here', text: 'Name the one task you hate most.' },
    { target: 'use', label: 'Use it now', text: 'Nine prompts. Fill in the blanks, send in one click.' },
    { target: 'stuck', label: 'Get unstuck', text: 'The usual problems, and the fix for each.' },
  ],
  guide: {
    eyebrow: 'Start here',
    heading: "What's the one task you'd pay to never do again?",
    intro:
      'Name it now, while it stings. Keep it in mind as you go. The nine tools below handle the everyday stuff so you have room to think about the big one.',
    sections: [
      {
        title: "There's a task you dread. Good. That's the whole point.",
        text: 'Here are the everyday ones most people quietly hate. Type your details into each, and it builds the finished prompt for you. Then one click drops it into Claude or ChatGPT, ready to run. None of these are clever. They just work, and they take a minute instead of an hour.',
      },
    ],
  },
  use: {
    heading: 'Nine tools for the work you hate',
    intro: 'Type your details into a card and it builds the finished prompt. Then copy it, or open it straight in Claude or ChatGPT.',
    cards: HATED_TASK_CARDS,
    openLinks: [
      { label: 'Open in Claude', href: 'https://claude.ai/new?q={prompt}' },
      { label: 'Open in ChatGPT', href: 'https://chatgpt.com/?q={prompt}' },
    ],
  },
  stuck: [
    { q: 'Where do I put my emails or notes?', a: 'In the box on each card. It drops your text into the right place in the prompt.' },
    {
      q: 'Open in Claude opened an empty chat',
      a: 'A very long prompt can be too big for a link. Tap Copy instead, then paste it into a new chat.',
    },
    { q: 'I use a different AI chat', a: 'Tap Copy and paste it into any AI chat. It is plain instructions.' },
    { q: 'Can I change a prompt?', a: 'Yes. Edit the finished prompt in the chat before you send it.' },
    { q: 'None of these fixed it', email: 'joe@mastermindshq.business', a: 'Say which card you used and paste what you saw.' },
  ],
  bridge: 'You came to get rid of the work you hate. The next step is building one thing that keeps working for you: your own website.',
  emailHeading: 'Want more free tools like this in your inbox?',
}
