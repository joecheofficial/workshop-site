// ---------------------------------------------------------------------------
// The one paid offer at the end of a pack-style giveaway page.
//
// Rule (Illy, 2026-10-12, "match offers to AI level"): every offer must sit at
// the buyer's AI level. Beginner giveaways end with the Website Workshop. A
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
}

export const WEBSITE_WORKSHOP_URL = 'https://mastermindshq.business/masterminds-website-workshop'
export const GET_FOUND_CHECKOUT_URL = 'https://mastermindshq.business/api/mhq-checkout?deal=get-found-kit'

export const GIVEAWAY_OFFERS: Record<GiveawayLevel, GiveawayOffer | null> = {
  beginner: {
    id: 'website-workshop',
    level: 'beginner',
    name: 'The Website Workshop.',
    stats: [
      { value: '2', label: 'recorded sessions, ready now' },
      { value: '1', label: 'live site on your own domain' },
      { value: '100%', label: 'refund if your site is not live' },
      { value: '$67', label: 'one payment' },
    ],
    body:
      'In the Website Workshop I show you how to build that place yourself, by talking to AI in plain English. Two sessions, ready the moment you join. You finish with a live site on your own domain and a lead page ready to connect.',
    checks: [
      'Made for people who are not technical. Most people who take it have only used ChatGPT.',
      'Free hosting in your own account. No platform fee, ever.',
      'Stuck on a step? Ask in the course WhatsApp chat.',
    ],
    promise: {
      value: '100%',
      text: 'Leave with a live website, or you do not pay. Do the build, and if your site is not live on the internet, I refund you in full.',
    },
    cta: { label: 'See the Website Workshop', meta: '$67 · one payment · next page', href: WEBSITE_WORKSHOP_URL },
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

/** The end-of-page offer for a giveaway level, with campaign tags so sales can be traced to the giveaway. */
export function offerForLevel(level: GiveawayLevel, slug: string): GiveawayOffer | null {
  const offer = GIVEAWAY_OFFERS[level]
  if (!offer) return null
  const url = new URL(offer.cta.href)
  url.searchParams.set('utm_source', 'giveaway')
  url.searchParams.set('utm_medium', 'pack-page')
  url.searchParams.set('utm_campaign', slug)
  return { ...offer, cta: { ...offer.cta, href: url.toString() } }
}
