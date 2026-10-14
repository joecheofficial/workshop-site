import type { PackPageContent } from '@/lib/pack-page'
import { COST_STACK_PROMPT } from './prompts'

// Words for the Cost Stack Audit pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx. The old calculator is not rebuilt: its
// list, its maths and its prompt are written out here instead.

export const COST_STACK_PACK: PackPageContent = {
  slug: 'cost-stack',
  level: 'beginner',
  hero: {
    title: 'Here is the Cost Stack Audit.',
    free: 'It is free.',
    lede: 'Add up what you pay every year for software, hosting and people. Then paste one prompt into an AI chat and it tells you what you could stop paying for.',
    button: {
      label: 'Take me to the audit',
      meta: 'free · on this page',
      target: 'guide',
    },
    ticks: ['No sign-up', 'No card', 'Works in Claude, Claude Code or ChatGPT'],
  },
  jumps: [
    {
      target: 'guide',
      label: 'Add it up',
      text: 'The list of what to count, and how to total it.',
    },
    {
      target: 'use',
      label: 'Use it now',
      text: 'Copy one prompt, add your list, paste it into an AI chat.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  guide: {
    eyebrow: 'Step 1',
    heading: 'What are you paying for right now?',
    intro:
      'Write down every line you pay for. Start with the public prices below, then change each one to what you really pay.',
    sections: [
      {
        title: 'The software list',
        text: 'These are the public list prices, so use them as a starting point. They are the cheapest public plan, so they are almost certainly lower than what you pay. Put in your real number.',
        table: {
          head: ['Tool', 'What it does', 'Public list price'],
          rows: [
            ['GoHighLevel', 'Funnels, CRM, booking, email, all in one', '$97 to $497 a month'],
            ['Kajabi', 'Courses, memberships, landing pages', '$149 to $399 a month'],
            ['Mailchimp', 'Email list and broadcasts', '$13 to $350 a month, depending on list size'],
            ['Shopify', 'Storefront and checkout', '$39 to $105 a month'],
            ['ManyChat', 'DM automation and comment triggers', '$15 to $65 a month'],
            ['Video or VSL hosting', 'Wistia, Vimeo Pro, or similar', '$20 to $99 a month'],
            ['Squarespace or Wix', 'Website builder subscription', '$16 to $49 a month'],
            ['Website hosting', 'Whatever keeps the site up', '$10 to $50 a month'],
          ],
        },
      },
      {
        title: 'And the people',
        text: 'Add these three lines too.',
        table: {
          head: ['Line', 'What to count'],
          rows: [
            ['Web developer or designer', 'What you spent on your site and changes to it in the last year'],
            ['Assistant or VA', 'Only the part that is admin, not the part that is judgement'],
            ['The thing you were quoted for and never built', 'The app, the portal, the tool. One time, kept out of your annual total'],
          ],
        },
      },
      {
        title: 'How to total it',
        text: 'The total is your number, not an estimate. It is whatever you write down, multiplied out to a year.',
        steps: [
          'For each software line, take what you pay each month and multiply by 12.',
          'Add what you spent on a web developer or designer in the last year.',
          'For an assistant or VA, take the monthly cost and multiply by 12.',
          'Add it all up. That is your annual total.',
          'Keep the one-time quote for a build you never made out of the total. Note it on its own.',
        ],
      },
      {
        title: 'What the total means',
        text: 'What you get back is cost you stop carrying. It is not revenue, it is not a return, and it is not a promise about your business.',
      },
      {
        title: 'Write your list like this',
        text: 'The prompt below works from your list. Put each line in the same shape, one per line.',
        bullets: [
          'GoHighLevel: $X a month (use your own tool names, and your real price in place of X)',
          'Web developer or designer: $X a year',
          'Assistant or VA: $X a month',
          'A build I was quoted $X for and never did',
        ],
      },
    ],
  },
  use: {
    heading: 'Now ask the AI what to replace',
    intro:
      'Tap Copy, open an AI chat, and paste it. Before you send, replace the line that starts "- (list your tools here" with your own list, one tool per line with what you pay.',
    cards: [
      {
        label: 'the whole audit in one prompt',
        title: 'Which parts of my stack can I run myself?',
        text: 'It looks at what each line does for your business, sorts them by how easy they are to replace, and tells you which one to start with this week.',
        prompt: COST_STACK_PROMPT,
      },
    ],
    openLinks: [
      { label: 'Open ChatGPT', href: 'https://chatgpt.com/' },
      { label: 'Open Claude', href: 'https://claude.ai/new' },
    ],
  },
  stuck: [
    {
      q: 'I do not know what I really pay',
      a: 'Start with the public price in the list above. It is the cheapest plan, so your real bill is probably higher. Change it to your real number when you know it.',
    },
    {
      q: 'My tool is not in the list',
      a: 'Add it as its own line in your list, with what you pay. The prompt works from whatever list you give it.',
    },
    {
      q: 'Where do I paste the prompt?',
      a: 'Into Claude, Claude Code or ChatGPT. Start a new chat, paste it, and send.',
    },
    {
      q: 'I forgot to add my list',
      a: 'The first line of the list is a placeholder. Replace it with your own tools, one per line with what you pay, then send it again.',
    },
    {
      q: 'Will it tell me to cancel everything?',
      a: 'No. The prompt asks for a direct answer on which ones are not worth replacing. It also flags anything where moving would put your data, your payments or your client relationships at risk.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    'You came to see what your software costs you. A website you own and build yourself is one line you stop renting from someone else.',
  emailHeading: 'Want your cost stack breakdown emailed to you?',
}
