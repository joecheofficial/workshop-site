import type { PackPageContent } from '@/lib/pack-page'

// Words for the Cost Stack Audit pack page (keyword STACK), Illy 2026-10-14. The calculator itself is
// ./CostStackCalculator.tsx, shown inside the guide block; it writes the audit prompt as you type.

export const COST_STACK_PACK: PackPageContent = {
  slug: 'cost-stack',
  level: 'beginner',
  hero: {
    title: 'Here is the Cost Stack Audit.',
    free: 'It is free.',
    lede: 'Add up what you pay every year for software, hosting and people. Then paste one prompt into an AI chat and it tells you what you could stop paying for.',
    button: { label: 'Take me to the audit', meta: 'free · on this page', target: 'guide' },
    ticks: ['No sign-up', 'No card', 'Works in Claude or ChatGPT'],
  },
  jumps: [
    { target: 'guide', label: 'Add it up', text: 'Tick what you pay for. It totals your year and writes your prompt.' },
    { target: 'stuck', label: 'Get unstuck', text: 'The usual problems, and the fix for each.' },
  ],
  guide: {
    eyebrow: 'The audit',
    heading: 'What are you paying for right now?',
    intro:
      'Tick what you pay for and change each price to your real one. It adds up your year and writes your audit prompt as you go. Nothing you type leaves this page until you paste it somewhere.',
    sections: [],
  },
  stuck: [
    {
      q: 'I do not know what I really pay',
      a: 'Keep the price that is already in the box. It is the cheapest public plan, so your real bill is probably higher. Change it when you know.',
    },
    { q: 'My tool is not in the list', a: 'Copy the prompt, then add your tool as its own line in the chat, with what you pay, before you send.' },
    { q: 'Where do I paste the prompt?', a: 'Into Claude or ChatGPT. Start a new chat, paste it, and send. Or use the Open in Claude and Open in ChatGPT buttons.' },
    { q: 'The total looks too low', a: 'Every price starts at the cheapest public plan. Change each one to what you really pay.' },
    {
      q: 'Will it tell me to cancel everything?',
      a: 'No. The prompt asks for a direct answer on which ones are not worth replacing. It also flags anything where moving would put your data, your payments or your client relationships at risk.',
    },
    { q: 'None of these fixed it', email: 'joe@mastermindshq.business', a: 'Say which step you were on and paste what you saw.' },
  ],
  bridge: 'You came to see what your software costs you. A website you own and build yourself is one line you stop renting from someone else.',
  emailHeading: 'Want your cost stack breakdown emailed to you?',
}
