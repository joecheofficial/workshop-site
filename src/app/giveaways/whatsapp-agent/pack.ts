import type { PackPageContent } from '@/lib/pack-page'
import { WHATSAPP_AGENT_PROMPT } from './prompt'

// Words for the WhatsApp receptionist pack page (IG giveaway, 15 Oct 2026).
// Layout, the email ask and the end offer live in src/components/giveaways/PackPage.tsx.
// Facts come from the giveaway's own files: GUIDE.md (also the PDF), START-HERE.md
// and README.md in tasks/swarms/2026-10-15-whatsapp-agent-giveaway/.

export const ZIP_PATH = '/whatsapp-receptionist.zip'
export const GUIDE_PDF_PATH = '/whatsapp-receptionist-guide.pdf'

export const WHATSAPP_AGENT_CONTENT: PackPageContent = {
  slug: 'whatsapp-agent',
  level: 'builder',
  hero: {
    title: 'Give Claude its own WhatsApp number.',
    free: 'It is free.',
    lede: "A WhatsApp receptionist that answers your clients and books appointments, even at midnight. You build it with Claude Code on WhatsApp's official API. No third-party WhatsApp tool.",
    button: {
      label: 'Take me to it',
      meta: 'free · on this page',
      target: 'get',
    },
    ticks: ['No sign-up', 'Free Meta test number', 'Built with Claude Code'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get it',
      text: 'The folder and the step-by-step PDF guide.',
    },
    {
      target: 'use',
      label: 'Set it up',
      text: 'One prompt in Claude Code. About an hour the first time.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual errors, and the fix for each.',
    },
  ],
  get: {
    heading: 'The WhatsApp receptionist folder',
    intro:
      "Free, from Joe Che's AI class. The finished receptionist code, the START-HERE prompt, and a 6-page PDF guide with every click. The code passes its 19 tests. It is yours to keep and change.",
    note: {
      lead: 'Needs a computer.',
      link: { label: 'See the 10 steps.', target: 'guide' },
      rest: 'You set it up in Claude Code on a Mac or Windows computer. Your phone is only for texting the receptionist.',
    },
    primary: {
      label: 'Download the folder',
      meta: 'whatsapp-receptionist.zip · 41 KB',
      href: ZIP_PATH,
      download: 'whatsapp-receptionist.zip',
    },
    secondary: [{ label: 'Open the PDF guide', href: GUIDE_PDF_PATH }],
  },
  promise: {
    heading: 'It answers. It never starts the chat.',
    doesNot: [
      'Message anyone first. It only replies to people who text you',
      'Use your personal WhatsApp number',
      "Use a third-party WhatsApp tool. It talks straight to Meta's official API",
      'Book a time you did not open',
      'Ask you to paste your keys into a chat',
    ],
    does: [
      'Answer questions about your business, even at midnight',
      'Offer your open times and book one',
      'Let you add and remove times from your own WhatsApp',
      'Ask people to type when they send a voice note or photo',
      'Stop replying to anyone who sends STOP',
    ],
  },
  guide: {
    eyebrow: 'How it works',
    heading: 'Set it up in about an hour',
    intro:
      'Someone texts your WhatsApp number. Meta passes the message to a tiny free program on Cloudflare. That program asks Claude what to say and sends the answer back on WhatsApp. Claude Code sets it all up for you.',
    sections: [
      {
        title: 'What you need',
        bullets: [
          'A computer with Claude Code. The Claude Pro plan is enough.',
          'A Facebook login, for your free Meta developer account.',
          'Your phone with WhatsApp, to test it.',
          'A card for 5 USD of Claude API credit.',
        ],
      },
      {
        title: 'The 10 steps',
        text: 'About 45 to 60 minutes the first time. The PDF guide has every click.',
        steps: [
          'Open a blank note. You copy 4 things into it along the way. (2 min)',
          'Become a Meta developer at developers.facebook.com. (5 min)',
          'Create an app with the use case "Connect with customers through WhatsApp". (5 min)',
          'Get the free test number: add your own mobile to its list, reply "hi" to the Hello World message, copy the Phone number ID. (5 min)',
          'Copy your App secret from App settings, then Basic. (2 min)',
          'Make a permanent token in Meta Business settings, under System users. (8 min)',
          'Get a Claude API key at platform.claude.com and add 5 USD of credit. It is billed apart from your Claude plan. (5 min)',
          'Paste the prompt below into Claude Code. It tests the code, asks about your business and puts it online on Cloudflare. Your keys go into a private file, never the chat. (15 min)',
          'Connect Meta: paste the Callback URL and Verify token into WhatsApp, Configuration, then subscribe to "messages". (6 min)',
          'Text the test number from your phone: "Hi, can I book a session?" (3 min)',
        ],
      },
      {
        title: 'What it costs',
        table: {
          head: ['What', 'Cost'],
          rows: [
            ['Meta app and test number', 'Free, no card'],
            ['Cloudflare, where it runs', 'Free plan, about 400 to 500 client messages a day'],
            ['Claude API (Haiku)', 'About a tenth of a cent per reply. 5 USD of credit lasts for thousands of replies'],
            [
              'WhatsApp replies on a real number',
              'Since 1 October 2026 Meta gives each number 1,000 free replies a month, then charges a small fee per reply that depends on the client\'s country',
            ],
          ],
        },
        text: 'The test number only chats with up to 5 phones you add yourself. To open it to everyone, you add a real number (see "Going live" below).',
      },
      {
        title: 'The rules that protect your number',
        bullets: [
          'Opt-in first. It only replies to people who text you first. Never load a contact list and message people out of the blue.',
          'The 24 hour window. After someone texts you, it can reply freely for 24 hours. After that WhatsApp only allows paid, pre-approved templates. The receptionist follows this rule for you.',
          'Keep it a receptionist. Meta does not allow general "chat with an AI about anything" bots. Yours answers questions about your business and books appointments.',
          'Never put your personal WhatsApp number on the API. A number connected to the API is removed from the normal WhatsApp app, and its chat history is lost.',
          'Keep your keys private. If one leaks, make a new one and tell Claude Code to update it.',
        ],
      },
      {
        title: 'Going live with real clients',
        steps: [
          'Get a new phone number that is not on WhatsApp. A cheap second SIM works.',
          'In your Meta app, go to WhatsApp, API Setup, open the From list and click Add phone number. Meta reviews your business display name.',
          'Add a payment method in Meta Business settings, so replies keep going after the free 1,000 a month.',
          'Tell Claude Code your new Phone number ID. It updates and redeploys.',
          'Share your number as a wa.me link on your website, Instagram bio or email signature.',
        ],
      },
    ],
  },
  inside: {
    heading: 'A text at 11:58 pm. A booking by midnight.',
    example: {
      kind: 'chat',
      title: 'WhatsApp · 11:58 pm',
      label:
        'Example chat: a client texts at 11:58 pm asking if you are free Friday, the receptionist offers three open times, the client picks one and it is booked',
      messages: [
        { from: 'me', text: 'Hi, are you free Friday?' },
        {
          from: 'ai',
          text: 'Hi, yes. Friday has three open times: 10:00, 11:00 and 14:00. Sessions are 60 minutes, online by Zoom. Which one works for you?',
        },
        { from: 'me', text: '11 please. I am Sara.' },
        {
          from: 'ai',
          text: 'Done, Sara. You are booked for Friday at 11:00. Need to change it? Just text me here.',
        },
      ],
      note: 'Example chat, made-up name and times. It only offers times you opened. Send /bookings from your own WhatsApp to see every booking.',
    },
    words: {
      heading: 'Commands you send from your own WhatsApp',
      items: [
        { word: '/slots', text: 'See your open and booked times' },
        { word: '/add', text: 'Open a new time, like /add 2026-10-20 10:00. Add several with commas' },
        { word: '/remove', text: 'Remove a time, like /remove 2026-10-20 10:00' },
        { word: '/bookings', text: 'See who booked what' },
        { word: '/help', text: 'The list of commands' },
        { word: 'STOP', text: 'What a client sends to stop all replies. START turns them on again' },
      ],
    },
    files: {
      heading: 'What is in the folder',
      items: [
        { name: 'START-HERE.md', text: 'The prompt to paste into Claude Code. The same one is on this page.' },
        { name: 'README.md', text: 'How it works, the settings, and its honest limits.' },
        { name: 'wrangler.toml', text: 'Your business info, hours and time zone. Claude Code fills it in with you.' },
        { name: 'src/', text: 'The receptionist: Meta messages in, Claude replies, bookings and owner commands.' },
        { name: 'scripts/make-slots.mjs', text: 'Makes your open times for the next 14 days from your hours.' },
        { name: 'test/', text: '19 tests with a fake Meta and a fake Claude, so nothing real is touched.' },
      ],
    },
  },
  use: {
    heading: 'Paste one prompt into Claude Code',
    intro:
      'This is the prompt from START-HERE.md in the folder. Download the folder first, then paste this into Claude Code as one message. It walks you through the rest, one question at a time.',
    cards: [
      {
        label: 'the whole setup in one prompt',
        title: 'Build my WhatsApp receptionist',
        text: 'Claude Code finds the folder, tests the code, asks about your business, then guides you through Meta and Cloudflare. About 45 to 60 minutes the first time.',
        prompt: WHATSAPP_AGENT_PROMPT,
      },
    ],
    openLinks: [],
  },
  stuck: [
    {
      q: 'I am on my phone',
      a: 'Setting it up needs a computer with Claude Code. Send yourself this page and open it there. Your phone is only for texting the receptionist once it runs.',
    },
    {
      q: 'Error 131030, "not in allowed list"',
      a: 'That phone is not on the test number\'s list. In Meta go to WhatsApp, API Setup, open the To list, click Manage phone number list and add it. The test number only talks to up to 5 phones you add.',
    },
    {
      q: 'It says "token expired" or error 190',
      a: 'It got the temporary token from API Setup, which stops working within hours. Make the permanent one in Meta Business settings, Users, System users (step 6 in the PDF) and tell Claude Code to update it.',
    },
    {
      q: 'I text it and nothing comes back',
      a: 'Tell Claude Code "no reply came" so it reads the live log. Then check two things in Meta. Under WhatsApp, Configuration, Webhook fields, "messages" must be subscribed. And your app may still be in Development mode: click Publish, or switch App Mode to Live. If Meta asks for a Privacy Policy URL, add your website\'s privacy page under App settings, Basic.',
    },
    {
      q: '"Verify and save" fails in Meta',
      a: 'The Verify token must match exactly, with no space at the end, and the Callback URL must end in /webhook. Ask Claude Code to show both again.',
    },
    {
      q: 'It replies that it has "a small technical problem"',
      a: 'Usually there is no Claude credit left. The Claude API is billed apart from your Claude plan. Add credit at platform.claude.com, Settings, Billing.',
    },
    {
      q: 'Replies stopped after a day of silence',
      a: 'That is the 24 hour rule. It starts again as soon as the client texts.',
    },
    {
      q: 'A Meta button looks different',
      a: 'Meta renames buttons often. Pick the closest match, or take a screenshot, drag it into Claude Code and ask "what do I click?"',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what Claude Code or Meta said. Never send your keys or tokens.',
    },
  ],
  bridge:
    'You came for the WhatsApp receptionist. When people find your business online, your number on the site is how they reach it.',
  emailHeading: 'Want more free Claude Code builds like this in your inbox?',
}
