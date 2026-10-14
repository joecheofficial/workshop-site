import type { PackPageContent, PackGuideSection } from '@/lib/pack-page'

// Words for the Visual Hooks pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx. Reel list and technique text are
// copied from the old page.

const REEL_IDS = [
  'DA0k_aYMnhp',
  'DSPBxlviPtK',
  'DFfc26Lsqog',
  'DF2sqPkN2hU',
  'DKaoC1hubgG',
  'DTO27ZBjsnl',
  'DWmYXSxD5GP',
  'DO_bXsdDVLb',
  'DL5q6Y7SIbt',
  'DNCYiJORxhz',
  'DXHmcQ0jOLW',
  'DUK9fD4jAJB',
  'DUq0XYrjIit',
  'DVjWQ_vD3pt',
  'DXJALeKyacj',
  'DT0rS32CLA-',
  'DNhCJ0ghS36',
  'DCmMdX3NIjq',
  'DEYIFlHIW5-',
  'DES42lTuPFe',
  'DPjGH_uAAtk',
  'DFvYXoKym1u',
]

const REEL_SECTIONS: PackGuideSection[] = REEL_IDS.map((id, i) => ({
  title: `Example ${i + 1}`,
  video: { src: `/videos/viral-hooks/${id}.mp4`, caption: `Example ${i + 1}. Pause on frame one, then watch the first 3 seconds with no sound.` },
  links: [{ label: 'Open this reel on Instagram', href: `https://www.instagram.com/reel/${id}/` }],
}))

export const VIRAL_HOOKS_PACK: PackPageContent = {
  slug: 'viral-hooks',
  level: 'beginner',
  hero: {
    title: 'Here is the Visual Hooks guide.',
    free: 'It is free.',
    lede: 'Most people think about what to say. This is about what to show. Seven visual techniques that keep showing up in scroll-stopping reels, with 22 real reels to study frame by frame.',
    button: {
      label: 'Take me to the guide',
      meta: 'free · on this page',
      target: 'guide',
    },
    ticks: ['No sign-up', 'No card', 'Watch the reels right on this page'],
  },
  jumps: [
    {
      target: 'guide',
      label: 'Watch the reels',
      text: '22 real reels to study, one after the other.',
    },
    {
      target: 'guide',
      label: 'Learn the 7 techniques',
      text: 'What to look for in the first 3 seconds.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'Where to start and what to do with the reels.',
    },
  ],
  guide: {
    eyebrow: 'The guide',
    heading: 'What the first 3 seconds of scroll-stopping content actually look like',
    intro: 'The decision happens before the audio starts. Most people scroll with sound off. The first couple of frames hit before anyone decides to stay or keep going. Learning to see what makes those frames work is a visual skill, not a writing skill.',
    sections: [
      {
        title: 'Visual before audio',
        text: 'More than half of Instagram users scroll without sound. The hook has to work as a still image before it works as anything else.',
      },
      {
        title: 'Frame one is a billboard',
        text: 'The first frame is a static image in the feed, competing with everything else in the scroll. Treat it like a billboard. Not a film opening.',
      },
      {
        title: 'Motion earns the next second',
        text: 'Once someone pauses, the first motion either confirms they made the right call or tells them they were tricked. The visual has to match whatever the first frame promised.',
      },
      {
        title: '22 reels to study',
        text: 'Watch each one and see what you can spot. Pause on frame one. Watch the first three seconds twice before you watch the rest. These are examples of what has worked for other creators, not a formula you need to copy. Watch them, pull what feels useful, and leave the rest. What actually stops the scroll is authenticity. You have to find what that looks like for you, because everyone\'s version of it is different.',
      },
      ...REEL_SECTIONS,
      {
        title: '7 things to look for in the first 3 seconds',
        text: 'Every scroll-stopping reel uses at least one of these. Most of them use three or more. Watch the reels above and see how many you can spot.',
      },
      {
        title: '1. The First-Frame Statement',
        text: 'Pause on frame one. Mute the video. If someone who has never heard of you saw only that image, would they feel anything? If the answer is no, the hook is already failing before a word is spoken.',
      },
      {
        title: '2. The Interruption Visual',
        text: "Something in the frame that doesn't belong. An unexpected environment, an unusual object, a look on someone's face that doesn't match the setting. You notice it before you decide to. That's what buys the next two seconds.",
      },
      {
        title: '3. Tight Framing',
        text: 'Close-up shots feel intimate and urgent. Wide shots feel like context. Almost every scroll-stopping hook opens tight: face filling most of the frame, eyes near the upper third. The closer you get, the harder it is to look away.',
      },
      {
        title: '4. On-Screen Text Timing',
        text: 'Text that appears before the voiceover has more stopping power than text that chases the speech. When someone reads before they hear, they have already committed to the first half-second. That commitment tends to compound.',
      },
      {
        title: '5. Direct Camera Address',
        text: 'Looking straight into the lens creates a different effect than looking just off-camera. Direct address feels confrontational in the best way. It reads as: this is for you, specifically. Looking away reads as: you are watching something that was not meant for you.',
      },
      {
        title: '6. The Unresolved Scene',
        text: "Starting in the middle of something already in progress. You don't know what happened before, and you want to know how it ends. The hook doesn't explain what's happening. That explanation is the rest of the video.",
      },
      {
        title: '7. Visual Contrast',
        text: "A person in an unexpected setting. Expression that doesn't match the environment. Text that contradicts what you see. Contrast within the frame creates a tension your eye wants to resolve. Sameness gets scrolled. Contrast gets paused.",
      },
      {
        title: 'Four questions to ask before you watch the rest',
        steps: [
          'Pause on frame one. Before you press play: what does the thumbnail tell you? Is it a person, a setting, an action? Does anything look out of place? What does the first frame alone make you feel?',
          'Watch the first 3 seconds, no sound. Mute it and watch the opening. Does it still hold your attention? What visual event happens, and when? Is there text, and does it land before or after the motion starts?',
          'Name the technique. Which of the seven techniques does this one use? Most use more than one. Write them down. The ones that keep showing up across multiple reels are worth paying attention to.',
          "Could you reproduce this? Not the topic. The visual structure. Could you film something with the same framing, the same text timing, the same contrast? If yes, you have pulled a real template out of someone else's work.",
        ],
      },
    ],
  },
  stuck: [
    {
      q: 'I do not know where to start',
      a: 'Start with the first reel. Pause on frame one and ask what it makes you feel. Then watch the first 3 seconds with no sound. The four questions at the end of the guide walk you through it.',
    },
    {
      q: 'A reel will not play',
      a: 'Press play on the video. If it still does not move, use the "Open this reel on Instagram" link under it to watch the same reel there.',
    },
    {
      q: 'There are too many reels',
      a: 'You do not have to watch all 22 in one go. Watch a few, pull what feels useful, and leave the rest.',
    },
    {
      q: 'I cannot hear anything',
      a: 'That is fine. Most people scroll with the sound off, and the guide asks you to watch the first 3 seconds with no sound anyway.',
    },
    {
      q: 'I do not know what to look for',
      a: 'Use the seven techniques in the guide. Every scroll-stopping reel uses at least one of them, and most use three or more. See how many you can spot in each reel.',
    },
    {
      q: 'I do not want to copy these reels',
      a: 'You do not have to. They show what has worked for other creators. What actually stops the scroll is authenticity, and everyone\'s version of it is different. Copy the visual structure, not the topic.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which reel or step you were on and what you saw.',
    },
  ],
  bridge:
    'You came to learn what stops the scroll. Once people stop, they need somewhere good to land, and a website you own is the natural next step.',
  emailHeading: 'Want more hook breakdowns in your inbox?',
}
