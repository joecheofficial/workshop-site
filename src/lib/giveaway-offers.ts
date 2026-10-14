// ---------------------------------------------------------------------------
// The one paid offer at the end of a pack-style giveaway page.
//
// Rule (Illy, 2026-10-12, "match offers to AI level"): every offer must sit at
// the buyer's AI level. Beginner giveaways end with the Website Workshop. A
// pack page declares its level and gets the offer for that level; there is no
// way to put a high-level product on a beginner page by accident.
//
// Builder-level giveaways have no evergreen offer yet (13 Oct 2026: the Meta
// Ads course is live and mid-run), so the 'builder' slot is intentionally
// empty until Illy picks one. Facts below are copied from the live Website
// Workshop page (mastermindshq.business/masterminds-website-workshop).
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
}

export const WEBSITE_WORKSHOP_URL = 'https://mastermindshq.business/masterminds-website-workshop'

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
  builder: null,
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
