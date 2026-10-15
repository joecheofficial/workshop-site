import type { PackPageContent } from '@/lib/pack-page'

// Words for the Client Launch Checklist pack page (moved onto PackPage 15 Oct 2026).
// Layout, the email ask and the end offer live in src/components/giveaways/PackPage.tsx.
// Every step comes from the PDF itself (source: pdf/client-launch-checklist.html,
// output: public/client-launch-checklist.pdf). The old page said "14-point" and listed
// six items that are not in the PDF; this page follows the PDF: five steps.

export const CHECKLIST_PDF_PATH = '/client-launch-checklist.pdf'

export const CLIENT_LAUNCH_CHECKLIST_PACK: PackPageContent = {
  slug: 'client-launch-checklist',
  level: 'beginner',
  hero: {
    title: 'Here is the Client Launch Checklist.',
    free: 'It is free.',
    lede: 'Five steps to turn what you do into a packaged offer people can say yes to quickly. Launch a small paid offer without waiting for a perfect funnel. One printable PDF, and every step is on this page too.',
    button: {
      label: 'Take me to it',
      meta: 'free · PDF · on this page',
      target: 'get',
    },
    ticks: ['No sign-up', 'No card', 'Works on your phone'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get it',
      text: 'The printable PDF, one tap away.',
    },
    {
      target: 'guide',
      label: 'Use it now',
      text: 'All five steps, right here. Start with step one.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual sticking points, and what to fix first.',
    },
  ],
  get: {
    heading: 'The Client Launch Checklist',
    intro:
      'Free, from Joe Che. A short PDF you can print or keep on your phone. Work through it in order, and do not skip step one.',
    note: {
      lead: 'Made for consultants, coaches and local services.',
      link: { label: 'Read the five steps below.', target: 'guide' },
      rest: 'Same words as the PDF.',
    },
    primary: {
      label: 'Download the checklist',
      meta: 'PDF · free',
      href: CHECKLIST_PDF_PATH,
      download: 'client-launch-checklist.pdf',
    },
  },
  promise: {
    heading: 'A path you can finish this week. Not a funnel.',
    doesNot: [
      'Ask you to build a big funnel first',
      'Ask you to wait for a perfect launch',
      'Need a dashboard: two numbers are enough',
    ],
    does: [
      'Help you name the one problem you solve, in one sentence',
      'Turn custom work into a named offer with one price',
      'Give you the shortest path from your page to a booked call',
      'Show you where people stop, and what to fix first',
    ],
  },
  guide: {
    eyebrow: 'The five steps',
    heading: 'Five steps. One page each.',
    intro: 'Work through them in order. Do not skip step one.',
    sections: [
      {
        title: 'Who it is for',
        bullets: [
          'Consultants: turn a custom service into a packaged offer people can say yes to quickly.',
          'Coaches: launch a small paid program without waiting for a perfect funnel.',
          'Local services: make the path from curious visitor to booked call clear and measurable.',
        ],
      },
      {
        title: 'Step 1: Name the one problem you solve',
        text: 'Most offers fail here, before any funnel is built. If a stranger cannot tell in one sentence what you fix, nothing later can rescue that.',
        bullets: [
          'Write the problem in the client\'s words, not yours. They do not want "strategic alignment". They want to stop losing a day a week to quoting.',
          'Name who it is not for. An offer for everyone sells to nobody. Leaving people out is what makes the right person lean in.',
          'State the before and after. Where they are on Monday, and where they are after working with you. If you cannot describe the after clearly, the offer is not ready.',
          'Say it out loud to one real person. If they ask a question to understand it, the sentence is not finished.',
          'The trap: you will want to list everything you can do. Do not. A packaged offer wins because it is narrow enough to understand in five seconds.',
        ],
      },
      {
        title: 'Step 2: Package it so a yes is easy',
        text: 'Custom work makes the buyer design the deal themselves. That is work, and work is where deals die. Take the decision off their plate.',
        bullets: [
          'Fix the scope. Decide what is in and what is out, and write it down. Anything you leave vague you will end up doing for free.',
          'Fix the price. One number, published. Custom quotes add a delay and a negotiation, and both cost you sales.',
          'Fix the timeline. "About six weeks" is not a timeline. "Three sessions across three weeks" is.',
          'Give it a name. A named thing is a product. An unnamed thing is a conversation that starts from zero every time.',
          'Offer one tier to begin with. Choice slows people down. Add tiers later, once you know what people buy.',
        ],
        table: {
          head: ['Instead of', 'Package it as'],
          rows: [
            ['Consulting, hourly, scope to be discussed', 'A named two week audit, one fixed price, one deliverable'],
            ['Ongoing retainer, flexible hours', 'Four sessions a month, a fixed list of what is included'],
            ['Custom build, quoted per project', 'A starter build at a set price, with extras priced separately'],
          ],
        },
      },
      {
        title: 'Step 3: Build the shortest path to a yes',
        text: 'You do not need a funnel. You need a path. The difference is that a path can be finished this week.',
        bullets: [
          'One page, one action. The page explains the offer and asks for one thing. Every extra link is a way out.',
          'Put the price on the page. Hiding it puts off serious buyers and attracts people who only wanted a free consult.',
          'Make the call button the only button. If a visitor has to hunt for how to buy, they will not hunt.',
          'Answer the three objections in writing: too expensive, no time, tried something like this before. Answer them on the page so you do not have to on the call.',
          'Ship it before it is finished. A live page you improve every week beats a perfect page that launches next quarter.',
          'Rule of thumb: if getting from your page to a booked call takes more than two clicks, it is too long. Count the clicks.',
        ],
      },
      {
        title: 'Step 4: Make it measurable',
        text: 'If you cannot see where people stop, you will fix the wrong thing. Two numbers are enough to start. Do not build a dashboard.',
        bullets: [
          'Count visitors and count booked calls. That ratio is your whole business in one number.',
          'Watch the drop, not the total. A hundred visitors and no calls is a page problem. Ten calls and no sales is an offer problem. They need opposite fixes.',
          'Write the number down every Friday. A number you check once a quarter is decoration. A number you check weekly changes what you do.',
          'Change one thing at a time. If you rewrite the headline and the price in the same week, you learn nothing from either.',
        ],
        table: {
          head: ['What you see', 'What it usually means', 'What to fix first'],
          rows: [
            ['Traffic, no calls', 'The offer is unclear or the price is hidden', 'The headline and the price'],
            ['Calls, no sales', 'The offer is clear but not compelling', 'Scope, price, or who it is for'],
            ['Sales, but painful delivery', 'Scope was never fixed', 'Go back to step two and close the gaps'],
          ],
        },
      },
      {
        title: 'Step 5: Launch small, on purpose',
        text: 'Waiting for the perfect launch is how offers die quietly. A small paid launch teaches you more in a week than planning does in a month.',
        bullets: [
          'Sell it to five people before you build the whole thing. Five paying clients will tell you what to build.',
          'Charge from the first one. Free pilots teach you what people will accept, not what they will pay for.',
          'Tell people it is the first group. Being early is a feature. It gives you room to be imperfect, and honest buyers respect it.',
          'Deliver it by hand the first time. Automate only what hurts after you have felt it hurt.',
          'Book the next launch date before this one ends. Momentum is easier to keep than to restart.',
        ],
      },
      {
        title: 'If you only do one thing',
        text: 'Do step one, properly, this week. Write the one sentence that names the problem you solve and who it is for, and say it out loud to a real person. Everything else gets easier once that sentence is true, and nothing else works until it is.',
      },
    ],
  },
  stuck: [
    {
      q: 'Where do I start?',
      a: 'Step one, this week. Write one sentence that names the problem you solve and who it is for, then say it out loud to a real person.',
    },
    {
      q: 'My work is custom, it cannot be packaged',
      a: 'Look at the table in step two. Pick one fixed scope, one price and one timeline, and give it a name. Price extras separately.',
    },
    {
      q: 'People visit my page but nobody books',
      a: 'That is usually a page problem: the offer is unclear or the price is hidden. Fix the headline and the price first, one at a time.',
    },
    {
      q: 'I get calls but no sales',
      a: 'The offer is clear but not compelling. Look at the scope, the price, or who it is for.',
    },
    {
      q: 'The PDF will not open',
      a: 'Try it on a computer, or open it in your browser instead of an app. Every step is also on this page.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Tell me what you sell and which step you are on.',
    },
  ],
  bridge:
    'Step three says you need one page, one action, with the price on it. The Website Workshop is how you build that page yourself.',
  emailHeading: 'Want the checklist in your inbox too?',
}
