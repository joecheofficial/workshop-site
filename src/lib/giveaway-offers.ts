// ---------------------------------------------------------------------------
// The one paid offer at the end of a pack-style giveaway page.
//
// Rule (Illy, 2026-10-12, "match offers to AI level"): every offer must sit at
// the buyer's AI level. Beginner giveaways end with the FREE Website Workshop
// demo, never the $67 page (Illy, 2026-10-17: giveaway people are cold for the
// workshop, and cold traffic goes to the demo with no price before the value,
// SALES-CYCLE-SOP.md "the free demo is the FRONT DOOR"). The $67 appears inside
// the demo at the reveal. A
// pack page declares its level and gets the offer for that level; there is no
// way to put a high-level product on a beginner page by accident.
//
// Builder-level giveaways (people already in Claude Code) end with Get Found on
// Google and ChatGPT, $47 one-time (Illy, 2026-10-14). The Meta Ads with Claude
// Code course replaces it once it is sold as evergreen recordings. Beginner facts
// come from the live Website Workshop page; Get Found facts and the three promise
// tiers come from agents/seo-monitor/get-found-kit/README.md and the 12 Oct copy
// guardrails (found = findable for your name and service, never rankings).
// ---------------------------------------------------------------------------

export type GiveawayLevel = 'beginner' | 'builder'

export type GiveawayOffer = {
  id: string
  level: GiveawayLevel
  /** Second line of the heading, shown highlighted. */
  name: string
  stats: { value: string; label: string }[]
  body: string
  checks: string[]
  promise: { value: string; text: string }
  cta: { label: string; meta: string; href: string }
  photo: { src: string; alt: string }
  /** Replaces the page's own bridge line, for offers shared by many different pages. */
  bridge?: string
  /** Small label above the heading. Defaults to "What next · paid · optional". */
  eyebrow?: string
}

/** The free demo (name, email, WhatsApp unlock a ~5 minute video; the $67 offer shows at the reveal). */
export const WORKSHOP_DEMO_URL = 'https://mastermindshq.business/website-workshop/demo'
export const GET_FOUND_CHECKOUT_URL = 'https://mastermindshq.business/api/mhq-checkout?deal=get-found-kit'
/** The $27 Video Agent sales page (mhq-homepage /video-agent). Facts below are from that live page, 9 Nov 2026. */
export const VIDEO_AGENT_URL = 'https://mastermindshq.business/video-agent'

export const GIVEAWAY_OFFERS: Record<GiveawayLevel, GiveawayOffer | null> = {
  beginner: {
    id: 'website-workshop-demo',
    level: 'beginner',
    eyebrow: 'What next \u00b7 free',
    name: 'Watch beginners build a website.',
    stats: [
      { value: '5', label: 'minute video, free to watch' },
      { value: '1', label: 'real website, built by talking to AI' },
      { value: '0', label: 'tech skills needed' },
      { value: 'Now', label: 'plays the moment you sign up' },
    ],
    body:
      'It is a short video from my Website Workshop. You watch real beginners build a website just by telling AI what they want, in plain English. No code, no tech words.',
    checks: [
      'Made for people who are not technical. Most people in the workshop had only used ChatGPT.',
      'You also see real websites my students built and put live.',
      'Add your name, email and WhatsApp, and the video plays right there on the page.',
    ],
    promise: {
      value: 'Free',
      text: 'No card needed. If you like what you see, at the end I show you how to build your own.',
    },
    cta: { label: 'Watch the free demo', meta: 'Free \u00b7 5 minute video \u00b7 next page', href: WORKSHOP_DEMO_URL },
    photo: { src: '/images/events/joe-che-bio-bw.jpg', alt: 'Joe Che' },
  },
  builder: {
    id: 'get-found-kit',
    level: 'builder',
    name: 'Get Found on Google and ChatGPT.',
    stats: [
      { value: '$47', label: 'one payment, no monthly fee' },
      { value: '0', label: 'API keys or paid services' },
      { value: '1', label: 'prompt per step, run by your Claude Code' },
      { value: '14', label: 'day found check: day 1, 7 and 14' },
    ],
    body:
      'Get your website listed on Google and Bing so people (and ChatGPT) can find you by your name and your service. ChatGPT finds websites mostly through Bing, so we tell Bing about you too. Your own Claude Code does the work on your computer, one prompt at a time.',
    checks: [
      'What it does: sets up Google and Bing, your Google Business Profile, posts that answer real customer questions, and a monthly check.',
      'What usually happens: your site shows up when people search your name or business name within a few weeks.',
      'What it cannot promise: ranking for competitive searches like "best X near me". That takes months of steady posts.',
      'You need a website in a folder Claude Code can open, Node.js 20 or newer, and a free Google account. It is not for Squarespace or Wix sites.',
    ],
    promise: {
      value: '$47',
      text: 'One payment. No monthly fee. Your own Claude Code runs it, so nobody else needs access to your accounts.',
    },
    cta: { label: 'Get the kit', meta: '$47 · one payment · secure checkout', href: GET_FOUND_CHECKOUT_URL },
    photo: { src: '/images/events/joe-che-bio-bw.jpg', alt: 'Joe Che' },
    bridge:
      'You came for one piece of my Claude Code setup. If you have your own website, the next useful job for that setup is getting the site found.',
  },
}

/**
 * The end-of-page offer for a giveaway level, with campaign tags so sign-ups and sales can be
 * traced to the giveaway (the demo page saves them on the lead, mhq-homepage lead-capture).
 */
export function offerForLevel(level: GiveawayLevel, slug: string, offerId?: GiveawayOfferId): GiveawayOffer | null {
  const offer = offerId ? PAGE_OFFERS[offerId] : GIVEAWAY_OFFERS[level]
  if (!offer) return null
  const url = new URL(offer.cta.href)
  url.searchParams.set('utm_source', 'giveaway')
  url.searchParams.set('utm_medium', 'pack-page')
  url.searchParams.set('utm_campaign', slug)
  return { ...offer, cta: { ...offer.cta, href: url.toString() } }
}

// ---------------------------------------------------------------------------
// Page-level offers (2026-11-09). A giveaway whose buyer clearly fits one paid
// product names it with `offerId` instead of taking its level's default. Same
// rule as above: one offer, at the buyer's level, paid stays paid.
// Video Agent: for video-making gifts. The gift writes the words and lists the
// cuts; the Video Agent does the edit. Every fact is from the live
// mastermindshq.business/video-agent page (9 Nov 2026).
// ---------------------------------------------------------------------------
export type GiveawayOfferId = 'video-agent' | 'video-agent-swaps' | 'video-agent-film'

export const PAGE_OFFERS: Record<GiveawayOfferId, GiveawayOffer> = {
  'video-agent': {
    id: 'video-agent',
    level: 'builder',
    name: 'Let Claude do the edit too.',
    stats: [
      { value: '$27', label: 'one payment, no subscription' },
      { value: '1', label: 'line to paste into Claude Code' },
      { value: '10', label: 'minutes to set up, about' },
      { value: '30', label: 'day money-back if it will not run on your Mac' },
    ],
    body:
      'The free skills write your hooks and titles and give you a list of cuts. They never touch the video. My Video Agent does the edit: drop in your raw footage and it keeps your best take, cuts the restarts and adds captions, with your sound in sync.',
    checks: [
      'Made for reels and short videos you film yourself, and it exports for Instagram, TikTok or YouTube.',
      'Editing what you filmed costs nothing extra on an Apple Silicon Mac.',
      'Mac only, and it needs Claude Code, which comes with a paid Claude plan.',
    ],
    promise: {
      value: '$27',
      text: 'One payment and you keep it. If it will not run on your Mac within 30 days, email me and I refund your $27.',
    },
    cta: { label: 'See the Video Agent', meta: '$27 \u00b7 one payment \u00b7 next page', href: VIDEO_AGENT_URL },
    photo: { src: '/images/events/joe-che-bio-bw.jpg', alt: 'Joe Che' },
    bridge:
      'You came for the words: the hook, the title, the cut list. If you film on a Mac, the next step is letting Claude do the edit as well.',
  },
  // Same Video Agent facts, worded for the Stop Paying bundle (keyword FREE, 16 Nov 2026):
  // the gift is a free video editor, so the bridge is "the edit still takes your time".
  'video-agent-swaps': {
    id: 'video-agent-swaps',
    level: 'builder',
    name: 'Let Claude do the edit for you.',
    stats: [
      { value: '$27', label: 'one payment, no subscription' },
      { value: '1', label: 'line to paste into Claude Code' },
      { value: '10', label: 'minutes to set up, about' },
      { value: '30', label: 'day money-back if it will not run on your Mac' },
    ],
    body:
      'A free editor still leaves the cutting to you. My Video Agent does the edit: drop in your raw footage and it keeps your best take, cuts the restarts and adds captions, with your sound in sync.',
    checks: [
      'Made for reels and short videos you film yourself, and it exports for Instagram, TikTok or YouTube.',
      'Editing what you filmed costs nothing extra on an Apple Silicon Mac.',
      'Mac only, and it needs Claude Code, which comes with a paid Claude plan.',
    ],
    promise: {
      value: '$27',
      text: 'One payment and you keep it. If it will not run on your Mac within 30 days, email me and I refund your $27.',
    },
    cta: { label: 'See the Video Agent', meta: '$27 \u00b7 one payment \u00b7 next page', href: VIDEO_AGENT_URL },
    photo: { src: '/images/events/joe-che-bio-bw.jpg', alt: 'Joe Che' },
    bridge:
      'You came for free tools. If you film your own videos on a Mac, the next step is letting Claude do the editing for you.',
  },
  // Same Video Agent facts, worded for the Make-a-Film page (keyword FILM, explainer reel 9 Nov 2026):
  // the gift draws a film in code; the Video Agent edits the videos you film and can direct AI films.
  // No bridge here: the FILM page's own bridge line is shown. Facts from the live /video-agent page, 9 Nov 2026.
  'video-agent-film': {
    id: 'video-agent-film',
    level: 'builder',
    name: 'Let Claude make your other videos too.',
    stats: [
      { value: '$27', label: 'one payment, no subscription' },
      { value: '1', label: 'line to paste into Claude Code' },
      { value: '10', label: 'minutes to set up, about' },
      { value: '30', label: 'day money-back if it will not run on your Mac' },
    ],
    body:
      'Lemo-Opuscar draws a film in code. My Video Agent works on the videos you film yourself: drop in your raw footage and it keeps your best take, cuts the restarts and adds captions, with your sound in sync. Give it an idea and it writes the story, the script and the shot plan.',
    checks: [
      'Made for reels and short videos, and it exports for Instagram, TikTok or YouTube.',
      'Editing what you filmed costs nothing extra on an Apple Silicon Mac. Fully AI-made films use your own keys, about $5 to $12 for a 45 second Reel on budget models, and it shows you the cost first.',
      'Mac only, and it needs Claude Code, which comes with a paid Claude plan.',
    ],
    promise: {
      value: '$27',
      text: 'One payment and you keep it. If it will not run on your Mac within 30 days, email me and I refund your $27.',
    },
    cta: { label: 'See the Video Agent', meta: '$27 \u00b7 one payment \u00b7 next page', href: VIDEO_AGENT_URL },
    photo: { src: '/images/events/joe-che-bio-bw.jpg', alt: 'Joe Che' },
  },
}
