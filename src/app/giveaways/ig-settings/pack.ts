import type { PackPageContent } from '@/lib/pack-page'

// Words for the Instagram Settings Growth Checklist pack page. Layout and
// behaviour live in src/components/giveaways/PackPage.tsx.

export const IG_SETTINGS_PACK: PackPageContent = {
  slug: 'ig-settings',
  level: 'beginner',
  hero: {
    title: 'Here is the Instagram Settings Checklist.',
    free: 'It is free.',
    lede: 'Before you chase hooks, hashtags or another editing trick, check 8 settings. They make sure your account is public, can be recommended, lets people remix your Reels, and uploads clean video.',
    button: {
      label: 'Take me to the checklist',
      meta: 'free · on this page',
      target: 'guide',
    },
    ticks: ['No sign-up', 'No card', 'All in your Instagram settings'],
  },
  jumps: [
    {
      target: 'guide',
      label: 'The checklist',
      text: '8 settings, with where to find each one.',
    },
    {
      target: 'inside',
      label: 'Quick check',
      text: 'What your settings should show when you are done.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  guide: {
    eyebrow: 'The settings pass',
    heading: 'Run these before your next Reel.',
    intro: 'Use this before posting a new campaign, giveaway, founder story, or educational Reel.',
    sections: [
      {
        title: '1. Make the account public',
        text: 'Public Reels can appear in Feed, Reels, Explore, audio pages, effect pages, hashtag pages, and shares. Private Reels are limited to approved followers.',
        bullets: ['Where: Profile > Menu > Account privacy', 'Set it to: Private account: Off'],
        links: [{ label: 'Source: Instagram Help', href: 'https://www.facebook.com/help/instagram/1392551434468488?locale=en_GB' }],
      },
      {
        title: '2. Use a professional account',
        text: 'Professional accounts give you the dashboard, insights, and account-level performance signals. You need this to know what is growing and what is just getting posted.',
        bullets: ['Where: Profile > Menu > Account type and tools', 'Set it to: Creator or Business account: On'],
        links: [{ label: 'Source: Instagram Help', href: 'https://www.facebook.com/help/instagram/257516379077270' }],
      },
      {
        title: '3. Check recommendation eligibility',
        text: 'Account Status tells you whether your content may be eligible to be recommended. If this is not clean, growth tactics are secondary.',
        bullets: ['Where: Profile > Menu > Account Status', 'Set it to: All recommendation and policy checks: Green'],
        links: [{ label: 'Source: Instagram Help', href: 'https://www.facebook.com/help/instagram/653964212890722?locale=en_GB' }],
      },
      {
        title: '4. Protect originality',
        text: 'Instagram is increasingly limiting recommendation reach for accounts that mostly repost unoriginal Reels, photos, or carousels. If you reuse content, add real commentary, edits, voiceover, or Collab/Repost properly.',
        bullets: ['Where: Account Status > Recommendation checks', 'Set it to: Mostly original content over the last 30 days'],
        links: [
          {
            label: 'Source: Digital Camera World',
            href: 'https://www.digitalcameraworld.com/tech/social-media/two-years-later-instagram-is-finally-giving-photographers-the-same-protection-as-videographers-with-this-key-change',
          },
        ],
      },
      {
        title: '5. Allow remixing and reuse',
        text: 'Remix and reuse let other creators build on your content. That can create distribution loops beyond your existing audience.',
        bullets: ['Where: Profile > Menu > Sharing and reuse', 'Set it to: Allow remixing/reuse for Reels and Posts: On'],
        links: [{ label: 'Source: Instagram Help', href: 'https://www.facebook.com/help/instagram/792438641600810?locale=en_GB' }],
      },
      {
        title: '6. Allow downloads when the goal is spread',
        text: 'If the goal is reach, downloads make it easier for people to share your Reel outside Instagram. Keep it off only for content you do not want redistributed.',
        bullets: ['Where: Profile > Menu > Sharing and reuse', 'Set it to: Allow people to download your Reels: On'],
        links: [{ label: 'Source: TechCrunch', href: 'https://techcrunch.com/2023/11/22/instagram-now-allows-anyone-to-download-public-reels/' }],
      },
      {
        title: '7. Turn on highest quality uploads',
        text: 'This reduces the chance that Instagram sacrifices upload quality to save data. For Reels, export SDR, 30 fps, and 1080p/2K by default.',
        bullets: ['Where: Profile > Menu > Data usage and media quality', 'Set it to: Upload at highest quality: On, if available'],
        links: [{ label: 'Source: Instagram Help', href: 'https://www.facebook.com/help/1631821640426723/' }],
      },
      {
        title: '8. Keep comments, tags, and mentions open',
        text: 'Growth needs interaction. Tags, Collabs, comments, and mentions create more surfaces where your content can be discovered.',
        bullets: [
          'Where: Profile > Menu > Tags and mentions / Comments',
          'Set it to: Allow comments, tags, mentions, and Collabs unless abuse forces limits',
        ],
        links: [{ label: 'Source: Instagram Help', href: 'https://www.facebook.com/help/instagram/788388387972460' }],
      },
      {
        title: 'What to do, and what not to waste time on',
        bullets: [
          'Do: Post mostly original Reels, photos, and carousels.',
          'Do: Use Collab posts when another creator materially helped make the content.',
          'Do: Check Account Status before blaming the algorithm.',
          'Do not: Build the account on reposts with only captions, borders, or subtitles added.',
          'Do not: Turn off comments, mentions, remixing, or downloads by default if reach is the goal.',
          'Do not: Export every Reel in 4K HDR unless the source was made for that.',
        ],
      },
    ],
  },
  inside: {
    heading: 'What your settings should show when you are done',
    words: {
      heading: 'The four screens to open',
      items: [
        { word: 'Account privacy', text: 'Private account off' },
        { word: 'Account Status', text: 'Eligible for recommendations' },
        { word: 'Sharing and reuse', text: 'Remix, reuse, downloads on' },
        { word: 'Media quality', text: 'Highest quality uploads on' },
      ],
    },
  },
  stuck: [
    {
      q: 'Account Status is not clean',
      a: 'Fix that first. If it is not clean, growth tactics are secondary. Check Account Status before you blame the algorithm.',
    },
    {
      q: 'I cannot see my insights',
      a: 'You need a professional account, which means Creator or Business. Go to Profile > Menu > Account type and tools. It gives you the dashboard and insights.',
    },
    {
      q: 'I reuse other people\'s videos',
      a: 'Instagram is limiting recommendation reach for accounts that mostly repost. If you reuse content, add real commentary, edits or voiceover, or use Collab and Repost properly. Add more of your own original content.',
    },
    {
      q: 'Should I always allow downloads?',
      a: 'If the goal is reach, yes. Downloads make it easier to share your Reel outside Instagram. Keep it off only for content you do not want redistributed.',
    },
    {
      q: 'I do not see "Upload at highest quality"',
      a: 'The checklist says to turn it on if it is available. If it is not there for you, skip it and do the rest. For your Reels, export SDR, 30 fps, and 1080p/2K by default, not 4K HDR.',
    },
    {
      q: 'I get abuse in my comments',
      a: 'Keep comments, tags, mentions and Collabs open unless abuse forces you to limit them. Limit only when you need to.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which setting you were on and paste what you saw.',
    },
  ],
  bridge:
    'You came to get more reach on Instagram. When new people find you, they need a good place to land, and a website you own is that place.',
  emailHeading: 'Want more Instagram playbooks in your inbox?',
}
