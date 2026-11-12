import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import DinnerPhotoCarousel from '@/components/events/DinnerPhotoCarousel'

export type EventHost = {
  name: string
  firstName: string
  role: string
  photoSrc: string
  bio: string[]
  bioHtml?: string[]
  hideBestsellerBadge?: boolean
}

export type EventTimelineItem = {
  time: string
  title: string
  body?: string
  highlight?: 'talk' | 'music'
}

export type EventTimelineGroup = {
  label: string
  note?: string
  tone: 'morning' | 'afternoon' | 'sunset' | 'night'
  items: EventTimelineItem[]
}

export type EventPromoCode = {
  code: string
  label: string
  description: string
  percentOff?: number
  amountOff?: number
}

export type EventSection =
  | {
      type: 'story'
      id: string
      eyebrow?: string
      title: string
      body: string[]
    }
  | {
      type: 'checklist'
      id: string
      eyebrow?: string
      title: string
      intro?: string
      items: string[]
    }
  | {
      type: 'cards'
      id: string
      eyebrow?: string
      title: string
      intro?: string
      columns?: 2 | 3
      items: Array<{
        kicker?: string
        title: string
        body?: string
        bullets?: string[]
      }>
    }
  | {
      type: 'split'
      id: string
      eyebrow?: string
      title: string
      body: string[]
      imageSrc: string
      imageAlt: string
      caption?: string
    }
  | {
      type: 'image'
      id: string
      eyebrow?: string
      title?: string
      imageSrc: string
      imageAlt: string
      videoSrc?: string
      caption?: string
    }
  | {
      type: 'html'
      id: string
      eyebrow?: string
      title?: string
      html: string
    }
  | {
      type: 'custom'
      id: string
      render: ReactNode
    }
  | {
      // Festival-style program: grouped vertical timeline. Only used by
      // events that opt in, so no existing page renders it.
      type: 'timeline'
      id: string
      eyebrow?: string
      title: string
      intro?: string
      groups: EventTimelineGroup[]
    }
  | {
      // Bento photo/video gallery. Opt-in, same as 'timeline'.
      type: 'gallery'
      id: string
      eyebrow?: string
      title?: string
      video?: {
        src: string
        poster: string
        label: string
        caption?: string
      }
      hideImageCaptions?: boolean
      images: Array<{ src: string; alt: string }>
    }
  | {
      type: 'quoteCard'
      id: string
      quote: string
      name: string
      bio?: string
      location?: string
      imageSrc: string
      imageAlt: string
      videoSrc?: string
    }
  | {
      type: 'hosts'
      id: string
      eyebrow?: string
      title: string
      intro?: string
      hosts: EventHost[]
    }
  | {
      type: 'cta'
      id: string
      eyebrow?: string
      title: string
      body: string
      primaryLabel: string
      primaryHref: string
      secondaryLabel?: string
      secondaryHref?: string
      note?: string
    }

export type EventDefinition = {
  slug: string
  status: 'live' | 'draft'
  title: string
  shortTitle?: string
  eyebrow: string
  summary: string
  description: string
  dateLabel: string
  timeLabel: string
  locationLabel: string
  durationLabel: string
  heroImage: string
  heroAlt: string
  heroNoOverlay?: boolean
  heroObjectFit?: 'cover' | 'contain'
  heroVideoSrc?: string
  heroVideoPoster?: string
  // Optional phone variant of the festival hero video. Viewports up to 767px
  // wide load this file instead of heroVideoSrc, so phones never download the
  // full-size video. Only the festival layout (FestivalHero) reads these.
  heroVideoMobileSrc?: string
  heroVideoMobilePoster?: string
  // Opt-in festival layout: full-bleed ambient video hero, highlight ticker and
  // scroll reveals. Events without this field render exactly as before.
  festivalLayout?: {
    hideDescription?: boolean
    ticker?: string[]
  }
  // Opt-in Voice Studio layout (Make AI Sound Exactly Like You, Illy 2026-11-12):
  // the purple and pink look of Joe's Voice Studio, living sound waves, a before
  // and after wipe, and the class time in each visitor's own time zone. All copy
  // lives here so wording changes never touch the component. Events without
  // this field render exactly as before.
  voiceStudioLayout?: {
    headline: string
    lede: string
    heroNote: string
    cutoutSrc: string
    compareTitle: [string, string]
    compareHint: string
    compareGeneric: string[]
    compareVoice: string[]
    leaveWithTitle: [string, string]
    leaveWith: Array<{ title: string; body: string }>
    storyTitle: [string, string]
    story: string[]
    urgency: Array<{ title: string; body: string }>
    registerTitle: [string, string]
    registerIntro: string
    bio: string[]
    bioPhoto: string
    bioSeal: string
    testimonialsKicker: string
    testimonialsTitle: [string, string]
    testimonials: Array<{ name: string; photo: string; quote: string }>
  }
  zoomLink?: string
  badge?: string
  audience: string[]
  outcomes: string[]
  hosts: EventHost[]
  pricing: {
    currencySymbol: string
    fullPrice: number
    checkoutHref: string
    checkoutNote: string
    promoCodes?: EventPromoCode[]
    promoFieldHint?: string
    donationMode?: boolean
    minDonation?: number
    donationPackages?: Array<{ amount: number; label: string; description: string }>
    donationPresets?: Array<{ amount: number; label: string; description?: string }>
    donationLabelNote?: string
  }
  legacyRegistration?: {
    eventId: string
    eventDate: string
    fallbackTicketId: string
  }
  privateLocationReminder?: {
    eventStartIso: string
    leadHours: number
    exactAddress: string
    googleMapsUrl: string
    parkingInstructions?: string[]
  }
  video?: {
    youtubeEmbedId: string
    eyebrow?: string
    title?: string
    caption?: string
  }
  postPurchase?: {
    setupPageTitle: string
    setupPageIntro: string
    setupPageBody: string[]
    setupItems: Array<{
      name: string
      href: string
      description: string
      stepLabel: string
    }>
  }
  ctaLabel?: string
  calendarEvent?: {
    startIso: string
    endIso: string
    googleCalendarEventId?: string
  }
  registrationClosesIso?: string
  capacity?: number
  capacityReservation?: {
    holdMinutes: number
  }
  ticketPricePending?: boolean
  manuallyClosed?: boolean
  // Post-checkout copy for the success modal. Without this an event falls back
  // to the generic paid-event line about setting up two free accounts, which is
  // wrong for any event that has no setup items.
  successDetail?: string
  // Opt-in per event. Events without this collect name and email only, so
  // adding a field here never changes the form on any other event.
  intakeFields?: {
    aiLevelStep?: boolean
    whatsappNumber?: boolean
    businessContext?: boolean
    businessContextLabel?: string
    businessContextPlaceholder?: string
    // Defaults to BUSINESS_CONTEXT_MIN_LENGTH. Set low when the question has a
    // naturally short answer, e.g. "What is the one task you hate the most?"
    businessContextMinLength?: number
  }
  emailConfig?: {
    headerLabel?: string | null
    detailsLabel?: string
    contactName?: string
    contactWhatsAppLink?: string
    contactWhatsAppDisplay?: string
    mapsUrl?: string
    skipSetupInstructions?: boolean
    signatureName?: string
  }
  sections: EventSection[]
  metadata?: Partial<Metadata>
}

function getDiscountedPrice(fullPrice: number, promo?: EventPromoCode) {
  if (!promo) return fullPrice
  if (promo.amountOff) return Math.max(0, fullPrice - promo.amountOff)
  if (promo.percentOff) return Math.max(0, fullPrice * (1 - promo.percentOff / 100))
  return fullPrice
}

export function getEventDiscountedPrice(event: EventDefinition, promo?: EventPromoCode | null) {
  return getDiscountedPrice(event.pricing.fullPrice, promo ?? undefined)
}

export function resolvePromoCode(event: EventDefinition, promoCode?: string | null) {
  const normalized = promoCode?.trim().toUpperCase()
  if (!normalized) return null
  return event.pricing.promoCodes?.find((promo) => promo.code.toUpperCase() === normalized) ?? null
}

export function formatEventPrice(event: EventDefinition, promo?: EventPromoCode) {
  if (event.ticketPricePending) return 'Price to be announced'
  const value = getEventDiscountedPrice(event, promo)
  const rounded = Number.isInteger(value) ? String(value) : value.toFixed(2)
  return `${event.pricing.currencySymbol}${rounded}`
}

export function formatDonationLabelNote(pricing: {
  currencySymbol: string
  fullPrice: number
  minDonation?: number
  donationLabelNote?: string
}): string {
  if (pricing.donationLabelNote) {
    return `(${pricing.donationLabelNote})`
  }
  return `(suggested: ${pricing.currencySymbol}${pricing.fullPrice}, minimum: ${pricing.currencySymbol}${pricing.minDonation ?? 0})`
}

export function toggleDonationPreset(input: {
  currentDonation: number
  minDonation?: number
  presetAmount: number
  isSelected: boolean
}): { nextDonation: number; nextSelected: boolean } {
  const min = input.minDonation ?? 0
  if (input.isSelected) {
    return {
      nextDonation: Math.max(min, input.currentDonation - input.presetAmount),
      nextSelected: false,
    }
  }
  return {
    nextDonation: Math.max(min, input.currentDonation + input.presetAmount),
    nextSelected: true,
  }
}

const connectionDinnerCangguTemplate: EventDefinition = {
    slug: 'connection-dinner-canggu',
    status: 'live',
    title: "Joe Che's VIP Connection Dinner",
    shortTitle: 'VIP Connection Dinner',
    eyebrow: 'Monthly Gathering',
    summary: 'A monthly dinner for entrepreneurs, founders, and people doing interesting things in Canggu.',
    description:
      'Once a month I bring together a small room of people I find genuinely interesting for dinner at Mostly in Pererenan. Real conversation over really good food.',
    ctaLabel: 'Save Your Seat',
    dateLabel: 'Wednesday, May 27, 2026',
    timeLabel: '6:00 PM',
    locationLabel: 'Mostly Restaurant, Pererenan, Canggu',
    durationLabel: 'Your Reserved Seat',
    heroImage: '/events/connection-dinner-canggu/venue-room.jpg',
    heroAlt: "Joe Che's VIP Connection Dinner at Mostly Restaurant",
    badge: 'This Month',
    audience: [
      'Entrepreneurs',
      'Founders',
      'Creators',
      'Remote workers',
      'Coaches',
      'Investors',
      'Change-makers',
    ],
    outcomes: [
      'Real conversations with people doing interesting things',
      'A seat at a curated table, not a random networking event',
      'Connections that matter',
      'A good meal at one of Canggu\'s best restaurants',
    ],
    hosts: [
      {
        name: 'Joe Che',
        firstName: 'Joe',
        role: 'Founder • AI Entrepreneur • Community Builder',
        photoSrc: '/images/events/joe-che-bio-bw.jpg',
        bio: [
          'Joe Che is a number one bestselling author in three categories across business and AI, the founder of 26 companies, and the builder of two AI companies, including All Sorted AI, a practical AI operating system for service-based small business owners.',
          'He previously built the largest software and business training company in New York City, where he trained more than 90,000 people, including Fortune 5 executives, the CIA, Microsoft, and Tyra Banks.',
          'Today, Joe mentors entrepreneurs inside his Business Automation Mastermind and helps founders use AI to create cleaner operations, stronger offers, faster execution, and more freedom.',
          'He demos his own AI operating system live and shows people how to use the 165 AI agents from his bestselling book in their own businesses.',
          'He built All Sorted, a plug and play AI operating system he installs for businesses, pre-built with 157 agents covering social media strategy, payments, finances, bookkeeping, research, lead generation and outreach, and content creation.',
        ],
      },
    ],
    calendarEvent: {
      startIso: '2026-05-27T18:00:00+08:00',
      endIso: '2026-05-27T21:00:00+08:00',
      googleCalendarEventId: '0gu029anp7kbu1ljvi6chvic1g',
    },
    capacity: 24,
    manuallyClosed: true,
    emailConfig: {
      headerLabel: null,
      detailsLabel: 'Event Details',
      contactName: 'Joe Che',
      contactWhatsAppLink: 'https://wa.me/16462304209',
      contactWhatsAppDisplay: '(646) 230-4209',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Mostly+Restaurant+Jl.+Pantai+Pererenan+No.114+Pererenan+Mengwi+Bali',
      skipSetupInstructions: true,
      signatureName: 'Joe Che',
    },
    pricing: {
      currencySymbol: '$',
      fullPrice: 10,
      checkoutHref: '',
      checkoutNote: 'Your donation goes directly to PKP Community Centre.',
      donationMode: true,
      minDonation: 0,
    },
    privateLocationReminder: {
      eventStartIso: '2026-05-27T18:00:00+08:00',
      leadHours: 4,
      exactAddress: 'Mostly Restaurant, Jl. Pantai Pererenan No.114, Pererenan, Mengwi, Bali 80351',
      googleMapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Mostly+Restaurant+Jl.+Pantai+Pererenan+No.114+Pererenan+Mengwi+Bali',
      parkingInstructions: [
        'Arrival is at 6:00 PM. Doors close at 6:30 PM.',
        'The restaurant is on Jalan Pantai Pererenan, just off the main Pererenan strip.',
      ],
    },
    postPurchase: {
      setupPageTitle: 'You\'re confirmed for the dinner.',
      setupPageIntro: 'We\'ll send you the exact address closer to the date.',
      setupPageBody: [
        'The dinner is at Mostly Restaurant, Pererenan, Canggu. Arrive at 6:00 PM. Doors close at 6:30 PM.',
        'You will receive a reminder email with the address four hours before the dinner. See you there.',
      ],
      setupItems: [],
    },
    sections: [
      {
        type: 'html',
        id: 'invite',
        eyebrow: "You're Invited",
        html: `
          <div class="not-prose">
            <h2 class="text-[2.8rem] font-extrabold leading-[1.0] tracking-tight text-[#FCF4EB] md:text-[3.5rem] mb-5">A monthly dinner.</h2>
            <p class="text-[1.25rem] font-semibold text-[#FCF4EB]/85 mb-7 leading-relaxed">Just dinner and real connection conversations.</p>
            <p class="text-base leading-8 text-[#FCF4EB]/68 mb-4">Once a month I bring together a small room of people I find genuinely interesting for dinner at Mostly in Pererenan. Entrepreneurs, founders, builders. Some artists. A few people working on things I have not seen before.</p>
            <p class="text-base leading-8 text-[#FCF4EB]/68">We start at 6 PM and close the doors at 6:30 so we can stay present with each other for the evening. The food is good. The people are better.</p>
          </div>
        `,
      },
      {
        type: 'html',
        id: 'mostly-video',
        eyebrow: 'The Venue',
        html: `
          <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:1rem;">
            <iframe
              src="https://www.youtube.com/embed/qUciw2hjnhk?rel=0"
              style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              title="Mostly Restaurant, Bali"
            ></iframe>
          </div>
        `,
      },
      {
        type: 'html',
        id: 'gallery',
        eyebrow: 'Past Dinners',
        html: `
          <div class="not-prose grid grid-cols-2 gap-3">
            <img src="/events/connection-dinner-canggu/guests-1.jpg" alt="Joe and guests at the Connection Dinner" style="width:100%;border-radius:1rem;display:block;" />
            <img src="/events/connection-dinner-canggu/guests-3.jpg" alt="Guests at the Connection Dinner" style="width:100%;border-radius:1rem;display:block;" />
          </div>
        `,
      },
      {
        type: 'html',
        id: 'mid-cta',
        html: `
          <div class="not-prose text-center py-2">
            <a href="#register" class="copy-button-glass copy-button-primary inline-flex min-w-[220px] items-center justify-center rounded-xl px-6 py-4 text-base font-semibold no-underline">
              Save Your Seat
            </a>
          </div>
        `,
      },
      {
        type: 'html',
        id: 'dress-code',
        eyebrow: 'Dress Code',
        html: `
          <div class="not-prose">
            <p class="text-[1.8rem] font-bold leading-[1.05] tracking-tight text-[#FCF4EB] md:text-[2.1rem]">The dinner is an occasion worth dressing for.</p>
            <p class="mt-4 text-base leading-8 text-[#FCF4EB]/68">Smart casual at minimum. Think a nice dinner out, not the beach. Leave the yoga clothes and flip-flops for another day.</p>
          </div>
        `,
      },
      {
        type: 'split',
        id: 'pkp',
        eyebrow: '100% of Donations Go To PKP',
        title: 'Supporting PKP Community Centre',
        body: [
          'Every dollar donated at this dinner goes directly to PKP. The suggested amount is $10, but you decide what feels right.',
          'PKP is a community centre in Bali founded by Ibu Sari. It trains women in sewing, cooking and English so they can earn for their families, and it is a safe place for women and children facing domestic violence, divorce or social exclusion.',
        ],
        imageSrc: '/events/connection-dinner-canggu/pkp-catering.jpg',
        imageAlt: 'PKP Community Centre women, Bali',
        caption: 'PKP Community Centre, Bali, pkpcommunitycentre.org',
      },
      {
        type: 'html',
        id: 'pkp-photos',
        html: `
          <div class="not-prose grid grid-cols-2 gap-3">
            <img src="/events/connection-dinner-canggu/guests-2.jpg" alt="Guests at the Connection Dinner" style="width:100%;border-radius:1rem;display:block;" />
            <img src="/events/connection-dinner-canggu/guests-4.jpg" alt="Joe and a guest at the Connection Dinner" style="width:100%;border-radius:1rem;display:block;" />
          </div>
        `,
      },
      {
        type: 'html',
        id: 'vip',
        eyebrow: 'VIP Connection Dinner',
        html: `
          <div class="rounded-[1.4rem] border border-[#8B79D4]/30 bg-white/[0.04] px-6 py-5">
            <p class="text-sm leading-7 text-[#FCF4EB]/72">
              Those who attend the Connection Dinner receive <strong class="text-[#FCF4EB]">VIP status at Mostly Restaurant</strong>, which includes discounted pricing on future visits.
            </p>
          </div>
        `,
      },
      {
        type: 'hosts',
        id: 'hosts',
        eyebrow: 'Hosted By',
        title: 'Joe Che',
        intro: '',
        hosts: [],
      },
    ],
    metadata: {
      title: "Joe Che's VIP Connection Dinner, May 27, 2026",
      description:
        'A monthly dinner for entrepreneurs, founders, and people doing interesting things in Canggu. Donations go to PKP Community Centre.',
    },
}

export const events: EventDefinition[] = [
  connectionDinnerCangguTemplate,
  {
    ...connectionDinnerCangguTemplate,
    slug: 'joe-ches-connection-dinner-sunday-october-04-2026',
    status: 'live',
    title: "Joe Che's Connection Dinner",
    shortTitle: 'Connection Dinner',
    dateLabel: 'Sunday, October 4, 2026',
    timeLabel: '6:00 PM',
    badge: 'October Dinner',
    calendarEvent: {
      startIso: '2026-10-04T18:00:00+08:00',
      endIso: '2026-10-04T21:00:00+08:00',
      googleCalendarEventId: 'o15i65v5e4v2ntgn0rqsmem54c',
    },
    capacityReservation: {
      holdMinutes: 30,
    },
    manuallyClosed: false,
    privateLocationReminder: {
      eventStartIso: '2026-10-04T18:00:00+08:00',
      leadHours: 4,
      exactAddress: 'Mostly Restaurant, Jl. Pantai Pererenan No.114, Pererenan, Mengwi, Bali 80351',
      googleMapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Mostly+Restaurant+Jl.+Pantai+Pererenan+No.114+Pererenan+Mengwi+Bali',
      parkingInstructions: [
        'Arrival is at 6:00 PM. Doors close at 6:30 PM.',
        'The restaurant is on Jalan Pantai Pererenan, just off the main Pererenan strip.',
      ],
    },
    metadata: {
      title: "Joe Che's Connection Dinner, October 4, 2026",
      description:
        'A monthly dinner for entrepreneurs, founders, and people doing interesting things in Canggu. Donations go to PKP Community Centre.',
    },
  },
  {
    ...connectionDinnerCangguTemplate,
    slug: 'joe-ches-connection-dinner-wednesday-december-16-2026',
    status: 'live',
    title: "Joe Che's Connection Dinner",
    shortTitle: 'Connection Dinner',
    dateLabel: 'Wednesday, December 16, 2026',
    timeLabel: '6:00 PM',
    badge: 'December Dinner',
    calendarEvent: {
      startIso: '2026-12-16T18:00:00+08:00',
      endIso: '2026-12-16T21:00:00+08:00',
    },
    capacityReservation: {
      holdMinutes: 30,
    },
    manuallyClosed: false,
    privateLocationReminder: {
      eventStartIso: '2026-12-16T18:00:00+08:00',
      leadHours: 4,
      exactAddress: 'Mostly Restaurant, Jl. Pantai Pererenan No.114, Pererenan, Mengwi, Bali 80351',
      googleMapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Mostly+Restaurant+Jl.+Pantai+Pererenan+No.114+Pererenan+Mengwi+Bali',
      parkingInstructions: [
        'Arrival is at 6:00 PM. Doors close at 6:30 PM.',
        'The restaurant is on Jalan Pantai Pererenan, just off the main Pererenan strip.',
      ],
    },
    sections: connectionDinnerCangguTemplate.sections
      .filter((section) => section.id !== 'pkp-photos')
      .map((section): EventSection => section.id === 'gallery'
        ? { type: 'custom', id: 'dinner-photo-carousel', render: <DinnerPhotoCarousel /> }
        : section),
    metadata: {
      title: "Joe Che's Connection Dinner, December 16, 2026",
      description:
        'A monthly dinner for entrepreneurs, founders, and people doing interesting things in Canggu. Donations go to PKP Community Centre.',
    },
  },
  {
    ...connectionDinnerCangguTemplate,
    slug: 'joechella-big-one-december-11-2026',
    status: 'live',
    title: "JOECHELLA: The Big One",
    shortTitle: 'Joechella: The Big One',
    eyebrow: 'December 11th to 12th',
    badge: 'The Big One',
    ctaLabel: 'Get a Weekend Pass',
    summary:
      "Two days of Joechella, Joe Che's 50th birthday celebration at a luxury oceanside resort in Tabanan, Bali. For friends, and friends of friends. Your IDR 500K ticket covers both days.",
    description: "Join us at a luxury oceanside resort in Tabanan, Bali for two unforgettable days of community, creativity and celebration. Your ticket helps bring the celebration to life, with the option to make an additional donation to PKP Women's Initiative, supporting women in Bali.",
    dateLabel: 'December 11th to 12th, 2026',
    timeLabel: 'Friday from 11:30 AM; Saturday from 2:00 PM until late',
    locationLabel: 'Luxury resort, Tabanan, Bali. Address sent to ticket holders.',
    durationLabel: 'Come Friday, or Friday and Saturday. One contribution covers both.',
    heroImage: '/events/joechella-big-one/bbg-drone-shots.jpeg',
    heroAlt: 'The Joechella resort from above, on the ocean in Tabanan, Bali',
    heroVideoSrc: '/events/joechella-big-one/joechella-party-20261029.mp4',
    heroVideoPoster: '/events/joechella-big-one/joechella-party-20261029-poster.jpg',
    heroVideoMobileSrc: '/events/joechella-big-one/joechella-party-20261029-mobile.mp4',
    heroVideoMobilePoster: '/events/joechella-big-one/joechella-party-20261029-poster.jpg',
    festivalLayout: {
      hideDescription: true,
      ticker: [
        'Lightning talks',
        'Workshops',
        'Welcome ceremony',
        'Pool party',
        'Sunset together',
        'Bonfires',
        'Live music until late',
      ],
    },
    audience: [
      'Friends of Joe',
      'Friends of friends of Joe',
      'Builders and creators',
      'Dancers and music lovers',
      'Anyone who loved Bali Bloom',
    ],
    outcomes: [
      'Celebrate Joe turning 50 with the people he loves',
      'A weekend of talks, workshops, connection and Emergent Theatre',
      'Pool party, sunset, bonfires and live music',
      'Add an optional donation to support PKP Community Centre',
    ],
    calendarEvent: {
      startIso: '2026-12-11T11:30:00+08:00',
      endIso: '2026-12-13T04:00:00+08:00',
    },
    capacity: undefined,
    capacityReservation: undefined,
    ticketPricePending: false,
    manuallyClosed: false,
    privateLocationReminder: undefined,
    emailConfig: {
      ...connectionDinnerCangguTemplate.emailConfig,
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bali+Beach+Glamping+Tabanan',
    },
    pricing: {
      currencySymbol: '$',
      fullPrice: 28,
      minDonation: 28,
      donationMode: true,
      checkoutHref: '',
      donationLabelNote: 'USD; two-day ticket starts at US$28, approximately IDR 500K',
      checkoutNote: 'One contribution covers Friday or Friday and Saturday. The IDR 500K ticket (US$28) helps cover the celebration. Every dollar above US$28 goes directly to PKP. Checkout is charged in USD; rupiah amounts are approximate equivalents.',
      donationPackages: [
        {
          amount: 28,
          label: '2-day ticket only',
          description: 'IDR 500K (US$28 total). Entry for Friday or Friday and Saturday. Supports the celebration costs.',
        },
        {
          amount: 61,
          label: '2-day ticket + IDR 600K donation to PKP',
          description: 'IDR 1.1M total (US$61): US$28 ticket + US$33 for PKP. Helps fund PKP Community Centre’s catering van and dedicated kitchen, creating paid work for local women in need, as well as a permanent community centre offering safe harbour for women and children.',
        },
        {
          amount: 111,
          label: '2-day ticket + IDR 1.5M donation to PKP',
          description: 'IDR 2M total (US$111): US$28 ticket + US$83 for PKP. Takes one woman out of an abusive relationship for one month.',
        },
      ],
    },
    successDetail:
      "You're in for Joechella on Friday and Saturday, December 11 and 12. We'll send the address before the weekend. Your weekend pass covers either day or both.",
    postPurchase: {
      setupPageTitle: "You're in for Joechella's weekend.",
      setupPageIntro: 'Friday and Saturday, December 11 and 12, 2026 at Bali Beach Glamping, Tabanan.',
      setupPageBody: [
        'Join from 11:30 AM on Friday or 2:00 PM on Saturday. Your weekend pass covers either day or both. We will send directions closer to the date.',
        'Your ticket supports the celebration, with every dollar above the ticket amount going directly to PKP.',
      ],
      setupItems: [],
    },
    metadata: {
      title: "Joechella: Joe Che's 50th Birthday Weekend, December 11 to 12, 2026",
      description:
        "Joe Che's 50th birthday weekend at a luxury oceanside resort in Tabanan, Bali, December 11 to 12. For friends and friends of friends. One IDR 500K ticket covers both days.",
      icons: {
        icon: [{ url: '/events/joechella-big-one/joe-favicon.png', type: 'image/png', sizes: '256x256' }],
        apple: [{ url: '/events/joechella-big-one/joe-apple-icon.png', sizes: '180x180' }],
      },
    },
    sections: [
      {
        type: 'html',
        id: 'invite',
        html: `
          <div class="not-prose">
            <div class="max-w-4xl">
              <p class="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[#F5C3C6]">You're invited</p>
              <h2 class="mb-5 text-[2.8rem] font-extrabold leading-[1.0] tracking-tight text-[#FCF4EB] md:text-[3.75rem]">JOECHELLA: The Big One</h2>
              <h3 class="mb-6 text-2xl font-bold leading-tight text-[#F5C3C6] md:text-3xl">Half a Century. A Whole Lot of Magic.</h3>
              <p class="mb-6 text-xl leading-8 text-[#FCF4EB]/90">Joe Che is turning 50, and he's celebrating with two days of community, creativity and celebration on the ocean in Bali. This one is for friends, and friends of friends, of Joe.</p>
              <div class="mb-10 flex flex-wrap gap-3">
                <span class="rounded-full border border-[#F5C3C6]/40 bg-[#F5C3C6]/10 px-4 py-2 text-sm font-semibold text-[#FCF4EB]">December 11th to 12th</span>
                <span class="rounded-full border border-[#F5C3C6]/40 bg-[#F5C3C6]/10 px-4 py-2 text-sm font-semibold text-[#FCF4EB]">Luxury resort, Tabanan, Bali</span>
                <span class="rounded-full border border-[#F5C3C6]/40 bg-[#F5C3C6]/10 px-4 py-2 text-sm font-semibold text-[#FCF4EB]">Address sent to ticket holders</span>
                <span class="rounded-full border border-[#F5C3C6]/40 bg-[#F5C3C6]/10 px-4 py-2 text-sm font-semibold text-[#FCF4EB]">IDR 500K covers both days</span>
              </div>
            </div>
            <div class="mb-10 max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#F5C3C6]/15 via-white/[0.03] to-transparent p-7 md:p-9">
              <p class="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#F5C3C6]">What to expect</p>
              <p class="text-lg leading-8 text-[#FCF4EB]/85">Picture an oceanside resort taken over by the people Joe loves. Friday starts with ideas: lightning talks, workshops and connection games, then a welcome ceremony that turns strangers into friends. By late afternoon the pool party is in full swing, the sun drops into the ocean, we sit down to a family dinner, and the fire comes out. Then the music takes over until late. Saturday is slower and stranger in the best way: tea, dance, play, immersive theatre and a hot air balloon at sunset.</p>
            </div>
            <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <article class="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
                <div class="relative aspect-[4/3] overflow-hidden">
                  <img src="/events/joechella-big-one/pool-sunny-card.webp" alt="The infinity pool facing the ocean at the Joechella resort" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" style="object-position:center" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  <span class="absolute bottom-4 left-4 rounded-full bg-[#F5C3C6] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#2A1418]">Friday afternoon</span>
                </div>
                <div class="p-6">
                  <h4 class="mb-3 text-2xl font-bold leading-tight text-[#FCF4EB]">The Pool Party</h4>
                  <p class="text-base leading-7 text-[#FCF4EB]/75">From 4:00 PM the pool becomes the dance floor. DJs on the deck, the ocean right there, acro yoga, floaties, cold drinks and the kind of shenanigans you'll still be telling people about next year. Bring your swimsuit and your best sunglasses.</p>
                </div>
              </article>
              <article class="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
                <div class="relative aspect-[4/3] overflow-hidden">
                  <img src="/events/joechella-big-one/bali-bloom/balibloom3_arronshoots_041.webp" alt="Friends laughing together at a gathering on the same land" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" style="object-position:center" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  <span class="absolute bottom-4 left-4 rounded-full bg-[#F5C3C6] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#2A1418]">Talks and workshops</span>
                </div>
                <div class="p-6">
                  <h4 class="mb-3 text-2xl font-bold leading-tight text-[#FCF4EB]">Big Ideas, No Name Tags</h4>
                  <p class="text-base leading-7 text-[#FCF4EB]/75">Short, sharp lightning talks and workshops from friends who build companies, heal bodies and live interesting lives: AI, somatic work, relationships and Deep Dating. We're not naming the speakers here. We don't want to get anyone in trouble. Come and hear them in person.</p>
                </div>
              </article>
              <article class="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
                <div class="relative aspect-[4/3] overflow-hidden">
                  <img src="/events/joechella-big-one/jazzy-o.webp" alt="Jazzy O, DJ and music director" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" style="object-position:center 30%" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  <span class="absolute bottom-4 left-4 rounded-full bg-[#F5C3C6] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#2A1418]">Live music</span>
                </div>
                <div class="p-6">
                  <h4 class="mb-3 text-2xl font-bold leading-tight text-[#FCF4EB]">Jazzy O and Friends</h4>
                  <p class="text-base leading-7 text-[#FCF4EB]/75">Friday night is live, interactive music. You're not watching a show, you're part of it. Jazzy O is playing, along with international DJs and artists we can't mention, and the musicians we think are the best on the island. They're playing until late.</p>
                </div>
              </article>
              <article class="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
                <div class="relative aspect-[4/3] overflow-hidden">
                  <img src="/events/joechella-big-one/bali-bloom/balibloom3_arronshoots_150.webp" alt="A fire performance lighting up the night" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" style="object-position:center" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  <span class="absolute bottom-4 left-4 rounded-full bg-[#F5C3C6] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#2A1418]">Friday night</span>
                </div>
                <div class="p-6">
                  <h4 class="mb-3 text-2xl font-bold leading-tight text-[#FCF4EB]">Sunset, Fire and Family Dinner</h4>
                  <p class="text-base leading-7 text-[#FCF4EB]/75">Sunset by the ocean, a long family-style dinner, a fire show, and a few words from Joe on lessons from 50 years of life. Then a birthday surprise we're not allowed to tell you about.</p>
                </div>
              </article>
              <article class="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
                <div class="relative aspect-[4/3] overflow-hidden">
                  <img src="/events/joechella-big-one/hot-air-balloon-card.webp" alt="A two-person hot air balloon on a tether at sunset by the ocean" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" style="object-position:center 35%" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  <span class="absolute bottom-4 left-4 rounded-full bg-[#F5C3C6] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#2A1418]">Saturday evening</span>
                </div>
                <div class="p-6">
                  <h4 class="mb-3 text-2xl font-bold leading-tight text-[#FCF4EB]">Hot Air Balloon</h4>
                  <p class="text-base leading-7 text-[#FCF4EB]/75">On Saturday evening Arthur brings his two-person hot air balloon. It goes up on a tether, two at a time, as the sun sets. If you've never been up in one, this is your moment.</p>
                </div>
              </article>
              <article class="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
                <div class="relative aspect-[4/3] overflow-hidden">
                  <img src="/events/joechella-big-one/bali-bloom/BALIBLOOM3_yurygoryanoy_IMG_4552.webp" alt="Guests celebrating beneath festival lights" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" style="object-position:center" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  <span class="absolute bottom-4 left-4 rounded-full bg-[#F5C3C6] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#2A1418]">Saturday night</span>
                </div>
                <div class="p-6">
                  <h4 class="mb-3 text-2xl font-bold leading-tight text-[#FCF4EB]">Emergent Theatre and Tea Lounge</h4>
                  <p class="text-base leading-7 text-[#FCF4EB]/75">An immersive theatre night with music, tarot, tea, poetry and pop-up acts, then the late-night tea lounge. Things will happen that we can't fully explain on a web page.</p>
                </div>
              </article>
            </div>
            <p class="mt-10 max-w-4xl text-lg leading-8 text-[#FCF4EB]/80">Come celebrate in true Joe Che style: with community, in connection and fully expressed. Your ticket helps bring the celebration to life, with the option to add a donation to <strong>PKP Women's Initiative</strong>, supporting women in Bali.</p>
          </div>
        `,
      },
      {
        type: 'gallery',
        id: 'bloom',
        hideImageCaptions: true,
        eyebrow: 'This Is The Energy',
        video: {
          src: 'https://pub-c8d5d807eda94fd7a89d74f95de97030.r2.dev/videos/bali-bloom-recap.mp4',
          poster: '/events/joechella-big-one/sunset-poster.jpg',
          label: 'Bali Bloom recap video. Sunset on the same land.',
          caption: 'Bali Bloom, the festival we held on this land.',
        },
        images: [
          { src: "/events/joechella-big-one/bali-bloom/balibloom3_arronshoots_012.webp", alt: "Festival guests gathering beneath colourful decorations at Bali Bloom" },
          { src: "/events/joechella-big-one/bali-bloom/balibloom3_arronshoots_018.webp", alt: "Smiling guests enjoying a Bali Bloom gathering" },
          { src: "/events/joechella-big-one/bali-bloom/balibloom3_arronshoots_041.webp", alt: "Connection and laughter at Bali Bloom" },
          { src: "/events/joechella-big-one/bali-bloom/balibloom3_arronshoots_061.webp", alt: "A lively seaside gathering at Bali Bloom" },
          { src: "/events/joechella-big-one/bali-bloom/balibloom3_arronshoots_088.webp", alt: "A DJ playing at Bali Bloom" },
          { src: "/events/joechella-big-one/bali-bloom/balibloom3_arronshoots_150.webp", alt: "A fire performance lighting up the Bali Bloom evening" },
          { src: "/events/joechella-big-one/bali-bloom/BALIBLOOM3_LIGHTSART_-59.webp", alt: "Dancing together in the Bali Bloom sunshine" },
          { src: "/events/joechella-big-one/bali-bloom/BALIBLOOM3_slavicakostovski_-6780.webp", alt: "Festival guests in colourful outfits at Bali Bloom" },
          { src: "/events/joechella-big-one/bali-bloom/BALIBLOOM3_yurygoryanoy_IMG_3876.webp", alt: "A moment of connection at Bali Bloom" },
          { src: "/events/joechella-big-one/bali-bloom/BALIBLOOM3_yurygoryanoy_IMG_4552.webp", alt: "The Bali Bloom crowd celebrating beneath festival lights" },
          { src: "/events/joechella-big-one/bali-bloom/BALIBLOOM3_yurygoryanoy_IMG_5784.webp", alt: "Poolside celebrations at Bali Bloom" },
        ],
      },
      {
        "type": "timeline",
        "id": "schedule",
        "eyebrow": "The Program",
        "title": "Friday, December 11",
        "intro": "Friday begins at 11:30 AM. Come for Friday, or join us for Friday and Saturday. Your donation includes both days.",
        "groups": [
          {
            "label": "Morning",
            "tone": "morning",
            "items": [
              {
                "time": "8:00 AM to 11:30 AM",
                "title": "Long, Slow Breakfast / Free Morning",
                "body": "Rest by the pool, enjoy the sunshine and get ready for celebrations."
              }
            ],
            "note": "For guests staying on site only."
          },
          {
            "label": "Afternoon",
            "tone": "afternoon",
            "items": [
              {
                "time": "11:30 AM to 2:30 PM",
                "title": "An Afternoon of Ideas, Connection and Celebration",
                "body": "AI lightning talks, somatic therapy for female leaders, relationship Q&A and Deep Dating."
              },
              {
                "time": "2:30 PM to 4:00 PM",
                "title": "Connection Activation and Welcome Ceremony"
              }
            ],
            "note": "Weekend guests join from 11:30 AM for talks and workshops."
          },
          {
            "label": "Pool party and sunset",
            "tone": "sunset",
            "items": [
              {
                "time": "4:00 PM to 6:30 PM",
                "title": "Pool Party",
                "body": "DJs, dancing, acro yoga and shenanigans."
              },
              {
                "time": "6:30 PM to 8:00 PM",
                "title": "Sunset Activation and Family Dinner"
              }
            ]
          },
          {
            "label": "Night",
            "tone": "night",
            "items": [
              {
                "time": "8:00 PM to 8:15 PM",
                "title": "Fire Show"
              },
              {
                "time": "8:15 PM to 8:30 PM",
                "title": "Lessons from 50 Years of Life"
              },
              {
                "time": "8:30 PM to midnight",
                "title": "Live Interactive Music, DJs and a Birthday Surprise",
                "body": "Jazzy O, international DJs and artists we can't mention, and the best musicians on the island."
              },
              {
                "time": "Midnight until late",
                "title": "Skin Bliss Temple and Tea Lounge Activations"
              }
            ]
          }
        ]
      },
      {
        "type": "timeline",
        "id": "saturday-program",
        "eyebrow": "The Program",
        "title": "Saturday, December 12",
        "groups": [
          {
            "label": "Morning",
            "tone": "morning",
            "items": [
              {
                "time": "9:00 AM to noon",
                "title": "Recovery Brunch",
                "body": "For guests staying on site only. A slow morning to rest and recharge."
              },
              {
                "time": "Noon to 2:00 PM",
                "title": "Free Time",
                "body": "For guests staying on site only. Beach, pool, tea and relaxation."
              }
            ],
            "note": "For guests staying on site only."
          },
          {
            "label": "Afternoon",
            "tone": "afternoon",
            "items": [
              {
                "time": "2:00 PM to 6:00 PM",
                "title": "An Afternoon of Ideas, Connection and Play",
                "body": "Lightning talks, tea room, Dance of Connection, Tantra activations, pop-up styling and photo booth, PKP cultural activations, and Kizomba."
              }
            ],
            "note": "The event begins at 2:00 PM for weekend-pass guests."
          },
          {
            "label": "Sunset",
            "tone": "sunset",
            "items": [
              {
                "time": "6:00 PM to 7:30 PM",
                "title": "PKP Community Performance and Sunset Dinner"
              },
              {
                "time": "Sunset",
                "title": "Hot Air Balloon",
                "body": "Arthur's two-person hot air balloon goes up on a tether, two at a time, as the sun sets."
              }
            ]
          },
          {
            "label": "Night",
            "tone": "night",
            "items": [
              {
                "time": "7:30 PM to 8:00 PM",
                "title": "Surprise Performance"
              },
              {
                "time": "8:00 PM to 10:00 PM",
                "title": "Emergent Theatre",
                "body": "Music, tarot, tea, Sensatorium, poetry and pop-up acts."
              },
              {
                "time": "10:00 PM until late",
                "title": "Archetypes of Desire and Tea Lounge Activations"
              }
            ]
          }
        ]
      },
      {
        type: 'html',
        id: 'mid-cta',
        html: `
          <div class="not-prose text-center py-2">
            <a href="#register" class="copy-button-glass copy-button-primary inline-flex min-w-[220px] items-center justify-center rounded-xl px-6 py-4 text-base font-semibold no-underline">
              Get a Weekend Pass
            </a>
          </div>
        `,
      },
      {
        type: 'html',
        id: 'pkp-introduction',
        html: `<h2 class="not-prose text-3xl font-bold leading-tight text-[#FCF4EB] md:text-4xl">A cause we're passionate about.</h2>`,
      },
      {
        type: 'split',
        id: 'pkp',
        eyebrow: 'Optional Donations Go To PKP',
        title: 'Supporting PKP Community Centre',
        body: [
          'The IDR 500K two-day ticket (US$28) helps cover the celebration costs. Every dollar above US$28 goes directly to PKP. Add IDR 600K (US$33) to help fund PKP’s catering van and dedicated kitchen, creating paid work for local women in need, as well as a permanent community centre offering safe harbour for women and children, or add IDR 1.5M (US$83), which takes one woman out of an abusive relationship for one month.',
          'PKP is a community centre in Bali founded by Ibu Sari. It trains women in sewing, cooking and English so they can earn for their families, and it is a safe place for women and children facing domestic violence, divorce or social exclusion.',
        ],
        imageSrc: '/events/connection-dinner-canggu/pkp-catering.jpg',
        imageAlt: 'PKP Community Centre women, Bali',
        caption: 'PKP Community Centre, Bali, pkpcommunitycentre.org',
      },
    ],
  },
  {
    slug: 'ubud-connection-brunch',
    status: 'live',
    title: 'Ubud Connection Brunch',
    shortTitle: 'Ubud Connection Brunch',
    eyebrow: 'First Sunday Gathering',
    summary: 'A casual Connection Sunday brunch hosted by Joe Che & Alla. Come as you are, meet new friends and old.',
    description:
      'A relaxed brunch at G-Dos Eden in Ubud, right after Ecstatic Dance. We have a big table. Show up as you are and connect over good food and real conversation.',
    ctaLabel: 'Save Your Spot',
    dateLabel: 'Sunday, July 26, 2026',
    timeLabel: '2:00 PM to 4:00 PM',
    locationLabel: 'G-Dos Eden, Ubud',
    durationLabel: 'Your Spot at the Table',
    heroImage: '/events/ubud-connection-brunch/hero.jpg',
    heroAlt: 'Joe Che, Alla and the Bali community gathered at G-Dos Eden, Ubud',
    heroNoOverlay: true,
    badge: 'This Sunday',
    audience: [
      'Entrepreneurs',
      'Founders',
      'Creators',
      'Remote workers',
      'Coaches',
      'Change-makers',
    ],
    outcomes: [
      'Real conversations with people doing interesting things',
      'A big table, not a random networking event',
      'New friends and old',
      'A relaxed Sunday afternoon in Ubud',
    ],
    hosts: [
      {
        name: 'Joe Che',
        firstName: 'Joe',
        role: 'Founder • AI Entrepreneur • Community Builder',
        photoSrc: '/images/events/joe-che-bio-bw.jpg',
        bio: [
          'Joe Che is a number one bestselling author in three categories across business and AI, the founder of 26 companies, and the builder of two AI companies, including All Sorted AI, a practical AI operating system for service-based small business owners.',
          'He previously built the largest software and business training company in New York City, where he trained more than 90,000 people, including Fortune 5 executives, the CIA, Microsoft, and Tyra Banks.',
          'Today, Joe mentors entrepreneurs inside his Business Automation Mastermind and helps founders use AI to create cleaner operations, stronger offers, faster execution, and more freedom.',
        ],
        bioHtml: [
          'Joe Che is a number one bestselling author in three categories across business and AI, the founder of 26 companies, and the builder of two AI companies, including All Sorted AI, a practical AI operating system for service-based small business owners.',
          'He previously built the largest software and business training company in New York City, where he trained more than 90,000 people, including Fortune 5 executives, the CIA, Microsoft, and Tyra Banks.',
          'Today, Joe mentors entrepreneurs inside his <a href="https://www.mastermindshq.business/?ref=brunch-bio" target="_blank" rel="noopener" style="text-decoration:underline;color:#CFC6F0;">Business Automation Mastermind</a> and helps founders use AI to create cleaner operations, stronger offers, faster execution, and more freedom.',
        ],
      },
      {
        name: 'Alla Demutska',
        firstName: 'Alla',
        role: 'Co-host • Clinical Psychologist • Dancer',
        photoSrc: '/images/events/alla-demutska.jpg',
        hideBestsellerBadge: true,
        bio: [
          'Alla is a clinical psychologist with a doctorate from Monash University and more than 15 years guiding people through trauma recovery, emotional healing, and deeper connection across Singapore, Hong Kong, and Australia.',
          'When she is not holding space for growth, she is usually dancing. Contact improv, zouk, and ecstatic dance are her happy places.',
          'Alla co-hosts the Ubud gatherings with Joe and brings the warmth that makes the table feel like home.',
        ],
      },
    ],
    calendarEvent: {
      startIso: '2026-07-26T14:00:00+08:00',
      endIso: '2026-07-26T16:00:00+08:00',
    },
    capacity: 24,
    emailConfig: {
      headerLabel: null,
      detailsLabel: 'Event Details',
      contactName: 'Joe Che',
      contactWhatsAppLink: 'https://wa.me/16462304209',
      contactWhatsAppDisplay: '(646) 230-4209',
      mapsUrl: 'https://maps.google.com/?cid=13346073993895221884',
      skipSetupInstructions: true,
      signatureName: 'Joe Che',
    },
    pricing: {
      currencySymbol: '$',
      fullPrice: 0,
      checkoutHref: '',
      checkoutNote: 'Your donation goes directly to PKP Community Centre.',
      donationMode: true,
      minDonation: 0,
    },
    privateLocationReminder: {
      eventStartIso: '2026-07-26T14:00:00+08:00',
      leadHours: 4,
      exactAddress: 'G-Dos Eden (The Bali Eden), Jl. Cempaka, Banjar Kumbuh, Mas, Kecamatan Ubud, Gianyar, Bali 80571',
      googleMapsUrl: 'https://maps.google.com/?cid=13346073993895221884',
      parkingInstructions: [
        'We start at 2:00 PM, right after Ecstatic Dance.',
        'G-Dos Eden is in Mas, just south of central Ubud.',
      ],
    },
    postPurchase: {
      setupPageTitle: 'You\'re confirmed for the brunch.',
      setupPageIntro: 'We\'ll send you the exact address closer to the date.',
      setupPageBody: [
        'The brunch is at G-Dos Eden, Ubud, from 2:00 PM to 4:00 PM. Come as you are.',
        'You will receive a reminder email with the address before the brunch. See you at the table.',
      ],
      setupItems: [],
    },
    sections: [
      {
        type: 'html',
        id: 'invite',
        eyebrow: "You're Invited",
        html: `
          <div class="not-prose">
            <h2 class="text-[2.8rem] font-extrabold leading-[1.0] tracking-tight text-[#FCF4EB] md:text-[3.5rem] mb-5">A Sunday brunch.</h2>
            <p class="text-[1.25rem] font-semibold text-[#FCF4EB]/85 mb-7 leading-relaxed">Come as you are. Meet new friends and old.</p>
            <p class="text-base leading-8 text-[#FCF4EB]/68 mb-4">We gather at G-Dos Eden in Ubud, right after Ecstatic Dance, for a relaxed brunch and real conversation. Entrepreneurs, founders, builders, and interesting people doing interesting things.</p>
            <p class="text-base leading-8 text-[#FCF4EB]/68">We have a big table. No dress code, no agenda. Just good food and good people. 2:00 PM to 4:00 PM.</p>
          </div>
        `,
      },
      {
        type: 'html',
        id: 'mid-cta',
        html: `
          <div class="not-prose text-center py-2">
            <a href="#register" class="copy-button-glass copy-button-primary inline-flex min-w-[220px] items-center justify-center rounded-xl px-6 py-4 text-base font-semibold no-underline">
              Save Your Spot
            </a>
          </div>
        `,
      },
      {
        type: 'split',
        id: 'pkp',
        eyebrow: '100% of Donations Go To PKP',
        title: 'Supporting PKP Community Centre',
        body: [
          'The brunch is free to attend. If you would like to give, every dollar goes directly to PKP Community Centre. You decide what feels right, even if that is nothing at all.',
        ],
        imageSrc: '/events/connection-dinner-canggu/pkp-catering.jpg',
        imageAlt: 'PKP Community Centre women, Bali',
        caption: 'PKP Community Centre, Bali, pkpcommunitycentre.org',
      },
      {
        type: 'hosts',
        id: 'hosts',
        eyebrow: 'Hosted By',
        title: 'Joe Che and Alla',
        intro: '',
        hosts: [],
      },
    ],
    metadata: {
      title: 'Ubud Connection Brunch, July 26, 2026',
      description:
        'A casual Sunday brunch for entrepreneurs, founders, and interesting people in Ubud. Free to attend. Donations go to PKP Community Centre.',
    },
  },
  {
    slug: 'ai-avatar-content-creation',
    status: 'live',
    title: 'AI Content Creation Lab',
    shortTitle: 'AI Content Lab',
    eyebrow: '',
    summary:
      'A one-day cinematic AI content workshop for founders, creators, and brands who want content that looks modern, intentional, and commercially usable.',
    description:
      'Learn how to create AI avatars, cinematic b-roll, vertical videos, and repeatable content systems in one hands-on Bali workshop led by Joe Che and Helix Wolfson.',
    dateLabel: 'Saturday, May 30, 2026',
    timeLabel: '10:30 AM to 5:00 PM',
    locationLabel: 'Pererenan, Canggu',
    durationLabel: 'One-day intensive bootcamp',
    heroImage: '/events/ai-avatar-content-creation/flyer.jpg',
    heroAlt: 'AI Content Creation Lab flyer',
    heroVideoSrc: '/events/ai-avatar-content-creation/ai-content-creation-v2.mp4',
    heroVideoPoster: '/events/ai-avatar-content-creation/ai-content-creation-v2-poster-48s.jpg',
    badge: 'Live Workshop',
    audience: [
      'Creators',
      'Founders',
      'Coaches',
      'Retreat leaders',
      'Influencers',
      'Musicians',
      'Product brands',
      'Agencies',
    ],
    outcomes: [
      'A real content concept',
      'AI-generated visuals and avatar direction',
      'Hooks and scripts you can use immediately',
      'A repeatable workflow for producing more content from one idea',
      'A clear view of which AI tools are worth using right now',
    ],
    hosts: [
      {
        name: 'Helix Wolfson',
        firstName: 'Helix',
        role: 'Filmmaker • AI Creative Director',
        photoSrc: '/events/ai-avatar-content-creation/helix-wolfson.jpg',
        bio: [
          'Helix is a filmmaker, experiential designer, and AI creative director working at the intersection of storytelling, cinema, and emerging technology.',
          'He has spent decades producing commercials, immersive experiences, branded content, and large-scale creative projects. Now he teaches creators and brands how to use AI tools to build cinematic visuals, AI actors, animated scenes, and commercial-style content faster than traditional production pipelines allow.',
          'His work blends filmmaking discipline with cutting-edge AI workflows so the final output feels crafted, not generated.',
        ],
      },
      {
        name: 'Joe Che',
        firstName: 'Joe',
        role: 'Founder • AI Entrepreneur • Community Builder',
        photoSrc: '/mastermind-participants/joe-che.jpeg',
        bio: [
          'Joe Che is a number one bestselling author in three categories across business and AI, the founder of 26 companies, and the builder of two AI companies, including All Sorted AI, a practical AI operating system for service-based small business owners.',
          'He previously built the largest software and business training company in New York City, where he trained more than 90,000 people, including Fortune 5 executives, the CIA, Microsoft, and Tyra Banks.',
          'Today, Joe mentors entrepreneurs inside his Business Automation Mastermind and helps founders use AI to create cleaner operations, stronger offers, faster execution, and more freedom.',
          'He demos his own AI operating system live and shows people how to use the 165 AI agents from his bestselling book in their own businesses.',
          'He built All Sorted, a plug and play AI operating system he installs for businesses, pre-built with 157 agents covering social media strategy, payments, finances, bookkeeping, research, lead generation and outreach, and content creation.',
        ],
      },
    ],
    pricing: {
      currencySymbol: '$',
      fullPrice: 97,
      checkoutHref: 'https://buy.stripe.com/6oU7sL2npdRg1lPfc9cEw0x',
      checkoutNote: 'Enter your details below and complete checkout on this page.',
      promoFieldHint: 'Click Enter promo code to reveal the field before checkout.',
      promoCodes: [
        {
          code: 'helix33',
          label: 'Helix 33',
          description: 'Save 33% with Helix.',
          percentOff: 33,
        },
        {
          code: 'Joe33',
          label: 'Joe 33',
          description: 'Save 33% with Joe.',
          percentOff: 33,
        },
        {
          code: 'Guest100',
          label: 'Guest 100',
          description: 'Guest pass for a free ticket.',
          percentOff: 100,
        },
        {
          code: 'Guest99',
          label: 'Guest 99',
          description: 'Guest pass for 99% off.',
          percentOff: 99,
        },
        {
          code: 'Mastermind50',
          label: 'Mastermind 50',
          description: 'Save 50% with the Mastermind rate.',
          percentOff: 50,
        },
        {
          code: 'UF',
          label: 'UF 20',
          description: 'Save 20% with UF.',
          percentOff: 20,
        },
        {
          code: 'MARINA',
          label: 'Marina',
          description: 'Save 10% with Marina.',
          percentOff: 10,
        },
      ],
    },
    calendarEvent: {
      startIso: '2026-05-30T10:30:00+08:00',
      endIso: '2026-05-30T17:00:00+08:00',
      googleCalendarEventId: 'tgq3bqi8jfsa0itg7l74e8iev8',
    },
    registrationClosesIso: '2026-05-30T10:15:00+08:00',
    legacyRegistration: {
      eventId: '9YGs4u',
      eventDate: '2026-05-30',
      fallbackTicketId: 'wab8lo',
    },
    privateLocationReminder: {
      eventStartIso: '2026-05-30T10:30:00+08:00',
      leadHours: 4,
      exactAddress:
        'Happy Days Villa 1, Jalan Pura Gede Batur, Pererenan, Mengwi, Kabupaten Badung, Bali 80351, Indonesia',
      googleMapsUrl:
        'https://maps.app.goo.gl/auASnDX9wmS96a1n9',
      parkingInstructions: [],
    },
    postPurchase: {
      setupPageTitle: 'Great, your seat is reserved.',
      setupPageIntro:
        'Before the workshop, there are two free accounts you need to create so you can follow the class live without delays.',
      setupPageBody: [
        'Start with Higgsfield first. That is where the cinematic AI video workflow happens, including the tools we will use for b-roll, motion, and multi-model experimentation.',
        'After that, create your HeyGen account so you are ready for avatar, talking-head, and translation workflows during the event.',
      ],
      setupItems: [
        {
          name: 'Higgsfield',
          href: 'https://higgsfield.ai',
          description: 'Create this first for cinematic AI video workflows, including Kling, Seedance, lip sync tools, and multi-model experimentation.',
          stepLabel: 'Step 1',
        },
        {
          name: 'HeyGen',
          href: 'https://www.heygen.com',
          description: 'Create this second for AI avatars, AI clones, voice translation, and talking-head style content.',
          stepLabel: 'Step 2',
        },
      ],
    },
    sections: [
      {
        type: 'cards',
        id: 'hero-capabilities',
        eyebrow: 'What You Will Learn',
        title: 'Modern AI content that actually looks directed',
        intro:
          'This is not a lecture about the future. It is a creative working session for people who want content that feels cinematic, current, and commercially usable.',
        columns: 3,
        items: [
          {
            kicker: 'Create',
            title: 'AI avatars and digital spokespeople',
            body: 'Build realistic presenters, clones, and digital influencers that still feel aligned with your brand.',
          },
          {
            kicker: 'Generate',
            title: 'Cinematic b-roll and short-form scenes',
            body: 'Use current AI video workflows to create modern vertical content without a full crew or traditional edit stack.',
          },
          {
            kicker: 'Systemize',
            title: 'A content engine you can repeat',
            body: 'Turn one good idea into hooks, scripts, visuals, and multiple usable content pieces instead of starting from zero every time.',
          },
        ],
      },
      {
        type: 'quoteCard',
        id: 'fitness-influencer-ad',
        quote:
          'You do NOT need more motivation.\nYou need systems.\nI stopped trying to “feel inspired” every day and built routines that work even when I don’t feel like showing up.\nThat’s when everything changed.\nBody. Energy. Confidence. Discipline.',
        name: 'AI Fitness Ad Influencer',
        imageSrc: '/events/ai-avatar-content-creation/symbol.jpg',
        imageAlt: 'AI filmmaking symbol with director chair and film reels',
        videoSrc: 'https://media.mastermindshq.business/events/ai-avatar-content-creation/ai-fitness-ad-influencer.mp4',
      },
      {
        type: 'split',
        id: 'creative-lab',
        eyebrow: 'How The Day Works',
        title: 'Creative direction first. Tool execution second.',
        body: [
          'Most AI content looks bad because people go straight to the tool before they know what they are trying to say, show, or sell.',
          'This workshop starts with positioning, concept, hooks, and visual direction. Then Helix and Joe walk the room through the actual AI workflows that turn that direction into something publishable.',
        ],
        imageSrc: '/events/ai-avatar-content-creation/workstation.jpg',
        imageAlt: 'AI content creation workstation with visual assets in motion',
        caption: 'The class is built like a guided studio session, not a generic software demo.',
      },
      {
        type: 'quoteCard',
        id: 'creator-content-ad',
        quote:
          'I used to spend DAYS making content.\nNow I can create a week’s worth in one afternoon with AI.\nScripts, visuals, voiceovers, editing — all streamlined.\nThe crazy part?\nMost people still can’t tell what’s AI and what isn’t.\nIf you’re a creator, coach, or business owner and you’re not learning these tools right now… you’re already behind.',
        name: 'AI Health Coach',
        imageSrc: '/events/ai-avatar-content-creation/workstation.jpg',
        imageAlt: 'AI content creation workstation with visual assets in motion',
        videoSrc: 'https://media.mastermindshq.business/events/ai-avatar-content-creation/ai-health-coach.mp4',
      },
      {
        type: 'cards',
        id: 'curriculum',
        eyebrow: 'Workshop Structure',
        title: 'Three parts. One clean production flow.',
        columns: 3,
        items: [
          {
            kicker: 'Part 1',
            title: 'Ideas, hooks, and creative direction',
            bullets: [
              'Audience and positioning',
              'Scroll-stopping hooks',
              'Script structure',
              'Avatar or spokesperson concepts',
              'Cinematic b-roll ideas',
            ],
          },
          {
            kicker: 'Part 2',
            title: 'AI visuals, avatars, and cinematic content',
            bullets: [
              'AI image generation',
              'AI video workflows',
              'Lip sync and voice',
              'Commercial-style vertical content',
              'Multi-model experimentation',
            ],
          },
          {
            kicker: 'Part 3',
            title: 'Systems and automation',
            bullets: [
              'Scripting workflows',
              'Asset organization',
              'Caption and publishing flow',
              'Repurposing one idea into multiple outputs',
              'A repeatable content pipeline after the workshop',
            ],
          },
        ],
      },
      {
        type: 'checklist',
        id: 'outcomes',
        eyebrow: 'What You Will Leave With',
        title: 'Real assets, clearer direction, and a workflow you can keep using',
        intro: 'By the end of the day, the goal is not more theory. The goal is traction.',
        items: [
          'A strong content angle tied to a real business or creator objective',
          'Visual direction for an avatar, spokesperson, or AI-assisted content style',
          'Hooks and scripts for short-form content',
          'A stronger understanding of current AI video and avatar tools',
          'The start of your first AI-powered content asset or campaign',
        ],
      },
      {
        type: 'html',
        id: 'tools',
        eyebrow: 'Tools To Set Up Before Class',
        title: 'Two accounts everyone should create in advance',
        html: `
          <div class="grid gap-4">
            <article class="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-6">
              <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#BDB3E8]">Cinematic AI Video</p>
              <h3 class="mb-3 text-xl font-bold tracking-tight text-[#FCF4EB] md:text-[1.4rem]">Higgsfield</h3>
              <p class="mb-4 text-sm leading-7 text-[#FCF4EB]/68">
                Used for cinematic AI video workflows, including Kling, Seedance, lip sync tools, and multi-model experimentation.
              </p>
              <a class="inline-flex items-center gap-2 text-sm font-semibold text-[#F5C3C6]" href="https://higgsfield.ai" target="_blank" rel="noreferrer">higgsfield.ai</a>
            </article>
            <article class="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-6">
              <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#BDB3E8]">Avatars and Translation</p>
              <h3 class="mb-3 text-xl font-bold tracking-tight text-[#FCF4EB] md:text-[1.4rem]">HeyGen</h3>
              <p class="mb-4 text-sm leading-7 text-[#FCF4EB]/68">
                Used for AI avatars, clones, voice translation, and talking-head content workflows.
              </p>
              <a class="inline-flex items-center gap-2 text-sm font-semibold text-[#F5C3C6]" href="https://www.heygen.com" target="_blank" rel="noreferrer">heygen.com</a>
            </article>
          </div>
        `,
      },
      {
        type: 'hosts',
        id: 'hosts',
        eyebrow: 'Facilitating Team',
        title: 'Joe and Helix',
        intro: '',
        hosts: [],
      },
    ],
    metadata: {
      title: 'AI Content Creation Lab',
      description:
        'A cinematic AI content workshop in Bali with Joe Che and Helix Wolfson. Learn avatars, AI video, hooks, and repeatable content systems.',
    },
  },
  {
    slug: 'stop-sounding-like-everyone-else',
    status: 'live',
    title: 'Stop Sounding Like Everyone Else While Using AI',
    shortTitle: 'Sound Like You, Not AI',
    eyebrow: 'Free Live Workshop',
    summary:
      'A free 90 minute live session with Joe Che. Build your own voice profile from writing you have already done, install the free tool that strips AI patterns out of your drafts, then 45 minutes of open Q&A on anything AI. The room stays open after for anyone who wants to keep going.',
    description:
      'A live online workshop where Joe walks you through building a voice profile and installing Speak Human, then answers your AI questions live.',
    dateLabel: 'Tuesday, August 4, 2026',
    timeLabel: '5:00 PM to 6:30 PM Singapore time',
    locationLabel: 'Free online workshop',
    durationLabel: '90 minutes, and the room stays open after',
    heroImage: '/images/events/stop-sounding-like-everyone-else-hero.jpg',
    heroAlt: 'Joe Che beside the workshop title, Stop Sounding Like Everyone Else While Using AI',
    // Never put a gradient scrim over event artwork. Joe's rule, 2026-08-02.
    heroNoOverlay: true,
    successDetail:
      'You are in. Your confirmation email has the Zoom link, and a calendar invite is on its way. It comes from joe@mastermindshq.business. If you do not see it within a couple of minutes, check your spam folder and add that address to your contacts so the reminders reach you too.',
    // Free registration still collects a WhatsApp number and a business
    // description. Free does not mean anonymous: we need a way to reach people
    // and enough context to pre-qualify them.
    intakeFields: {
      whatsappNumber: true,
      businessContext: true,
      businessContextLabel:
        "Tell us a little about your business and what you're working on.",
      businessContextPlaceholder:
        "What you do, what you're building, and anything you are curious about with AI.",
    },
    zoomLink: 'https://us02web.zoom.us/j/81275409884?pwd=lWpaRasSci7h7YHesIhRM2HlTbzVFA.1',
    ctaLabel: 'Register Free',
    audience: [
      'Coaches and consultants building a personal brand',
      'Founders whose content sounds nothing like them',
      'Anyone drowning in manual content work',
      'People who want their AI questions answered live',
    ],
    outcomes: [
      'Your own voice profile, built from writing you already have',
      'Speak Human installed and running on your real content',
      'A repeatable way to turn one recording into a week of content',
      'Straight answers to the AI questions you have been sitting on',
    ],
    hosts: [
      {
        name: 'Joe Che',
        firstName: 'Joe',
        role: 'Author • Founder • AI Business Mentor',
        photoSrc: '/images/events/joe-che-bio-bw.jpg',
        bio: [
          'Joe Che is the author of How to Build Your Own AI Agent Operating System, which hit number one in three categories across business and AI. Over 30 years he has founded 26 companies, and he now builds two AI companies, including All Sorted AI, a practical AI operating system for service based small business owners.',
          'He previously built the largest software and business training company in New York City, where he trained more than 90,000 people, including Fortune 5 executives, the CIA, Microsoft, and Tyra Banks.',
          'Today Joe mentors entrepreneurs inside his AI Business Mastermind and helps founders use AI to create cleaner operations, stronger offers, faster execution, and more freedom. He demos his own AI operating system live and shows people how to use the 165 AI agents from the book in their own businesses.',
        ],
        bioHtml: [
          'Joe Che is the author of <a href="https://a.mastermindshq.business/ai-os-kindle" target="_blank" rel="noopener noreferrer" class="text-[#BDB3E8] underline underline-offset-4 hover:text-[#FCF4EB]">How to Build Your Own AI Agent Operating System</a>, which hit number one in three categories across business and AI. Over 30 years he has founded 26 companies, and he now builds two AI companies, including All Sorted AI, a practical AI operating system for service based small business owners.',
          'He previously built the largest software and business training company in New York City, where he trained more than 90,000 people, including Fortune 5 executives, the CIA, Microsoft, and Tyra Banks.',
          'Today Joe mentors entrepreneurs inside his <a href="https://mastermindshq.business" target="_blank" rel="noopener noreferrer" class="text-[#BDB3E8] underline underline-offset-4 hover:text-[#FCF4EB]">AI Business Mastermind</a> and helps founders use AI to create cleaner operations, stronger offers, faster execution, and more freedom.',
        ],
      },
    ],
    pricing: {
      currencySymbol: '$',
      fullPrice: 0,
      checkoutHref: '',
      checkoutNote: 'Free registration. The Zoom link will be emailed right after you sign up.',
    },
    calendarEvent: {
      startIso: '2026-08-04T17:00:00+08:00',
      endIso: '2026-08-04T18:30:00+08:00',
    },
    // Who hosts this event. Without it the confirmation email has no contact
    // block at all, which is the safe default. Never leave it to inherit.
    emailConfig: {
      contactName: 'Joe Che',
      contactWhatsAppLink: 'https://wa.me/16462092333',
      contactWhatsAppDisplay: '+1 (646) 209-2333',
      signatureName: 'Joe Che\nMasterminds HQ',
    },
    sections: [
      {
        type: 'html',
        id: 'about',
        eyebrow: 'What This Is',
        html: `
          <div class="not-prose space-y-5">
            <h2 class="event-gradient-title pt-2 text-[2rem] font-extrabold leading-[1.02] tracking-tight text-[#FCF4EB] md:text-[2.6rem]">
              Why does everything AI writes for me sound like everyone else?
            </h2>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              You are excellent at what you do. Your content does not sound like it, because AI wrote it and AI has no idea who you are. That is why it reads as forced and generic. It was never yours.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              Joe will walk you through Speak Human, the free tool he built to strip AI patterns out of writing and put your own voice back in. You will build your voice profile from writing you have already done, install the tool, and watch it run on real content, live.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              Then the floor is open for 45 minutes. Bring every question you have been sitting on about content, repurposing, outreach, websites, any of it. Joe teaches this to founders every week inside his <a href="https://mastermindshq.business" target="_blank" rel="noopener noreferrer" class="text-[#BDB3E8] underline underline-offset-4 transition hover:text-[#FCF4EB]">AI Business Mastermind</a>, and this is the part he is best at.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              The session runs 90 minutes. The room stays open after that, so if you want to keep going, stay on.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              You will leave with your voice profile built and the tool installed, not a list of apps to go look at later.
            </p>
          </div>
        `,
      },
      {
        type: 'html',
        id: 'bring',
        eyebrow: 'What To Bring',
        html: `
          <div class="not-prose space-y-5">
            <h2 class="event-gradient-title pt-2 text-[2rem] font-extrabold leading-[1.02] tracking-tight text-[#FCF4EB] md:text-[2.6rem]">
              Two things, so you leave with it finished
            </h2>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              <strong class="text-[#FCF4EB]">A Claude Code or OpenAI Pro subscription</strong>, if you want to install and use the tool during the session. Everything is shown on screen either way, but you will need one of these to follow along hands on.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              <strong class="text-[#FCF4EB]">Some of your own writing, ready to go.</strong> Podcast transcripts, chapters from a book, emails you have sent, posts you have written, anything with your real voice in it. Your voice profile gets built from your own material during the session, so bringing it means you leave with a finished one instead of homework.
            </p>
          </div>
        `,
      },
      {
        type: 'hosts',
        id: 'bio',
        eyebrow: 'Bio',
        title: 'Joe Che',
        intro: 'Author • Founder • AI Business Mentor',
        hosts: [],
      },
    ],
    metadata: {
      title: 'Stop Sounding Like Everyone Else While Using AI',
      description:
        'A free 90 minute live session with Joe Che. Build your voice profile, install Speak Human, then 45 minutes of open Q&A on anything AI.',
    },
  },
  {
    slug: 'ask-an-ai-expert',
    status: 'live',
    title: 'How to Get AI Making You More Sales and Less Busy Work',
    shortTitle: 'More Sales, Less Busy Work',
    eyebrow: 'Free Live Workshop',
    summary:
      'A free two-hour live session with Joe Che. Bring your business and your questions, get answers on the spot, and watch real businesses get AI working on their sales and their busywork right in front of you.',
    description:
      'A live online workshop where Joe answers real questions, looks at real businesses, and shows practical ways to get AI working on sales and busywork.',
    dateLabel: 'Wednesday, July 29, 2026',
    timeLabel: '7:00 PM to 9:00 PM Asia/Makassar (Bali)',
    locationLabel: 'Free online workshop',
    durationLabel: '90-minute AI business Q&A plus 30-minute bonus round',
    heroImage: '/images/events/ask-an-ai-expert-hero.jpg',
    heroAlt: 'Feet up on a beach lounger with a laptop showing sales climbing',
    heroNoOverlay: true,
    zoomLink: 'https://us02web.zoom.us/j/81275409884?pwd=lWpaRasSci7h7YHesIhRM2HlTbzVFA.1',
    ctaLabel: 'Register Free',
    audience: [
      'Owners who want more sales',
      'Operators who want less busywork',
      'Founders who want practical AI answers',
      'People who want live hot-seat feedback',
    ],
    outcomes: [
      'Clear next steps for using AI in your actual business',
      'Ideas for turning AI into more sales and less manual work',
      'A chance to get your business looked at live',
      'A simple way to think about your own AI operating system',
    ],
    hosts: [
      {
        name: 'Joe Che',
        firstName: 'Joe',
        role: 'Founder • AI Entrepreneur • Community Builder',
        photoSrc: '/images/events/joe-che-bio-bw.jpg',
        bio: [
          'Joe Che is a number one bestselling author in three categories across business and AI, the founder of 26 companies, and the builder of two AI companies, including All Sorted AI, a practical AI operating system for service-based small business owners.',
          'He previously built the largest software and business training company in New York City, where he trained more than 90,000 people, including Fortune 5 executives, the CIA, Microsoft, and Tyra Banks.',
          'Today, Joe mentors entrepreneurs inside his Business Automation Mastermind and helps founders use AI to create cleaner operations, stronger offers, faster execution, and more freedom.',
          'He demos his own AI operating system live and shows people how to use the 165 AI agents from his bestselling book in their own businesses.',
          'He built All Sorted, a plug and play AI operating system he installs for businesses, pre-built with 157 agents covering social media strategy, payments, finances, bookkeeping, research, lead generation and outreach, and content creation.',
        ],
        bioHtml: [
          'Joe Che is a number one bestselling author in three categories across business and AI, the founder of 26 companies, and the builder of two AI companies, including All Sorted AI, a practical AI operating system for service-based small business owners.',
          'He previously built the largest software and business training company in New York City, where he trained more than 90,000 people, including Fortune 5 executives, the CIA, Microsoft, and Tyra Banks.',
          'Today, Joe mentors entrepreneurs inside his <a href="https://mastermindshq.business" target="_blank" rel="noopener noreferrer" class="text-[#BDB3E8] underline underline-offset-4 hover:text-[#FCF4EB]">Business Automation Mastermind</a> and helps founders use AI to create cleaner operations, stronger offers, faster execution, and more freedom. He also wrote <a href="https://a.mastermindshq.business/ai-os-kindle" target="_blank" rel="noopener noreferrer" class="text-[#BDB3E8] underline underline-offset-4 hover:text-[#FCF4EB]">his number one bestselling book on AI operating systems</a>.',
        ],
      },
    ],
    pricing: {
      currencySymbol: '$',
      fullPrice: 0,
      checkoutHref: '',
      checkoutNote: 'Free registration. The Zoom link will be emailed right after you sign up.',
    },
    calendarEvent: {
      startIso: '2026-07-29T19:00:00+08:00',
      endIso: '2026-07-29T21:00:00+08:00',
    },
    sections: [
      {
        type: 'html',
        id: 'about',
        eyebrow: 'What This Is',
        html: `
          <div class="not-prose space-y-5">
            <h2 class="event-gradient-title pt-2 text-[2rem] font-extrabold leading-[1.02] tracking-tight text-[#FCF4EB] md:text-[2.6rem]">
              How do I get AI to make me more money?
            </h2>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              This is a live online workshop where Joe answers real questions, looks at real businesses, and shows practical ways to get AI working on sales and busywork.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              Joe teaches business owners to do this every day in his <a href="https://mastermindshq.business" target="_blank" rel="noopener noreferrer" class="text-[#BDB3E8] underline underline-offset-4 transition hover:text-[#FCF4EB]">AI Business Mastermind</a>. Three cohorts have run so far and all three filled. The people in them are not techies. They are coaches, artists, therapists, and consultants who now have websites they built themselves, honed their messages through branding and marketing agents, billing automations, business dashboards, tracking everything about the business, and the pattern across all of them is the same: more sales coming in, less time spent on the work that used to eat their week. <a href="https://mastermindshq.business" target="_blank" rel="noopener noreferrer" class="text-[#BDB3E8] underline underline-offset-4 transition hover:text-[#FCF4EB]">Cohort 4 starts August 10</a> and is the one currently open.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              For 90 minutes, Joe takes that question in every form, live. He pulls people into hot seats so everyone can look at a real business together and find the fastest ways AI can bring in sales and hand back time. When one person gets unstuck, everyone learns from it.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              Joe will also be available to demo his AI operating system and give examples of how to use some of the 165 AI agents from his bestselling book.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              He has also built All Sorted, a full plug and play AI operating system he has been installing for businesses. It comes pre-built with 157 agents that handle social media strategy, payments, finances and analysis, automated bookkeeping, research, lead generation and outreach, and video and content creation.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              It is free. Save your seat below.
            </p>
          </div>
        `,
      },
      {
        type: 'hosts',
        id: 'bio',
        eyebrow: 'Bio',
        title: 'Joe Che',
        intro: 'Founder • AI Entrepreneur • Community Builder',
        hosts: [],
      },
    ],
    metadata: {
      title: 'How to Get AI Making You More Sales and Less Busy Work',
      description:
        'A free two-hour live session with Joe Che. Bring your business and your questions, get answers on the spot, and watch real businesses get AI working on their sales and their busywork right in front of you.',
    },
  },
  {
    // Free C6 lead class, built 2026-11-12 from FREE_WORKSHOP_TEMPLATE (copied
    // from bring-the-task-you-hate) with the opt-in Voice Studio layout Illy
    // approved. Event description is the approved copy in
    // projects/mastermind/evergreen-test-2026-11/WORKSHOP-AI-IN-YOUR-VOICE.md, word for word.
    slug: 'make-ai-sound-exactly-like-you',
    status: 'live',
    title: 'Make AI Sound Exactly Like You',
    shortTitle: 'Make AI Sound Exactly Like You',
    eyebrow: 'Free live class with Joe Che',
    summary:
      "Most AI writing sounds like AI, and your clients can tell. You can't be in every reply, every post and every follow-up. Your voice can.",
    description:
      'A free live class with Joe Che. Build an AI that writes the way you actually talk, on your own laptop in Codex or Claude Code, and leave with your voice profile, your voice print and a social media post ready to send.',
    dateLabel: 'Tuesday, December 1, 2026',
    // Global audience: the confirmation email prints this line, so it names four
    // cities (house rule). The page itself shows each visitor their own time.
    // Start times only (Illy 12 Nov: do not show how long the class runs).
    timeLabel: 'Starts 8:00 PM Singapore, 1:00 PM Berlin, 7:00 AM New York, 4:00 AM Los Angeles',
    locationLabel: 'Free online class',
    durationLabel: 'Live on Zoom',
    heroImage: '/images/events/make-ai-sound-exactly-like-you-hero.jpg',
    heroAlt: 'Joe Che beside the class title Make AI Sound Exactly Like You, a free live class on Tuesday, December 1',
    heroNoOverlay: true,
    zoomLink: 'https://us02web.zoom.us/j/88020677190?pwd=fXck1hgPMeWqbN39vtdSrORyakwfTI.1',
    ctaLabel: 'Save My Free Seat',
    intakeFields: {
      whatsappNumber: true,
      businessContext: true,
      aiLevelStep: true,
      businessContextLabel: 'What will you write in your voice first?',
      businessContextPlaceholder: 'Example: my weekly newsletter, replies to new enquiries, a LinkedIn post',
      businessContextMinLength: 3,
    },
    successDetail:
      'You are in. Your Zoom link and calendar invite are on their way from joe@mastermindshq.business. Before the class, put three to five things you have written into one document: an email to a client, a post, a newsletter. If nothing shows up in a couple of minutes, check spam and add that address to your contacts so the reminders reach you.',
    audience: [
      'People who use AI but have not built anything with it yet',
      'Coaches, consultants and founders who write their own emails and posts',
      'People who have never built anything with AI',
    ],
    outcomes: [
      'Your own voice profile, on your computer',
      'Your voice print, to tune and share',
      'A social media post in your voice, ready to send',
    ],
    hosts: [
      {
        name: 'Joe Che',
        firstName: 'Joe',
        role: 'Founder • AI Entrepreneur • Teacher',
        photoSrc: '/images/events/joe-che-bio-bw.jpg',
          bio: [
          'Joe Che is the author of How to Build Your Own AI Agent Operating System, which hit number one in three categories across business and AI. He is the founder of 26 companies across tech, education, real estate, and community building. One of those companies became the largest software and business training company in New York City, where he trained more than 90,000 people, including Fortune 5 executives, the CIA, Microsoft, and Tyra Banks.',
          'He has spent nearly 30 years helping people turn big ideas into something real: cleaner systems, clearer offers, better decisions, and businesses that are easier to run.',
        ],
      },
    ],
    pricing: {
      currencySymbol: '$',
      fullPrice: 0,
      checkoutHref: '',
      checkoutNote: 'Free registration. The Zoom link will be emailed right after you sign up.',
    },
    calendarEvent: {
      startIso: '2026-12-01T20:00:00+08:00',
      endIso: '2026-12-01T22:00:00+08:00',
      // Joe's own 20:00-22:00 block on newyork1 primary, renamed for the class.
      // Pinned in code so registrants never fall through to the shared fallback.
      googleCalendarEventId: '4plcuisn2vfe4okeiufi81bgak',
    },
    emailConfig: {
      contactName: 'Joe Che',
      contactWhatsAppLink: 'https://wa.me/16462092333',
      contactWhatsAppDisplay: '+1 (646) 209-2333',
      signatureName: 'Joe Che\nMasterminds HQ',
    },
    voiceStudioLayout: {
      headline: 'Make AI Sound Exactly Like You.',
      lede: "Most AI writing sounds like AI, and your clients can tell. You can't be in every reply, every post and every follow-up. Your voice can.",
      heroNote: "Free. Mac or Windows. Bring three to five things you've written.",
      cutoutSrc: '/images/events/make-ai-sound-exactly-like-you-joe.webp',
      compareTitle: ['Same message.', 'Two voices.'],
      compareHint: 'Drag the line. That right side is what you build on the night, in your words.',
      compareGeneric: [
        'Dear Sarah,',
        "I hope this message finds you well. Thank you for reaching out regarding the February cohort. I am delighted to share that it may be an excellent fit for your goals. Please don't hesitate to let me know if you have any further questions.",
        'Best regards',
      ],
      compareVoice: [
        'Hey Sarah!',
        'So good to hear from you. The February cohort is the one. We start on the 8th. Bring the task that eats your week. Bring the messy inbox too. Want me to save you a seat?',
        'Joe',
      ],
      leaveWithTitle: ['Leave with', '3 things.'],
      leaveWith: [
        { title: 'Your voice profile', body: 'Your AI learns how you write and keeps it. Not a prompt you copy and forget.' },
        { title: 'Your voice print', body: 'A living picture of how you write. Tune it, save it, share it.' },
        { title: 'A post, ready to go', body: 'A social media post for this week, in your voice, before the class ends.' },
      ],
      storyTitle: ['Not a prompt.', 'A voice.'],
      story: [
        "In this class you build an AI that writes the way you actually talk. Bring three to five things you've written, like an email to a client, a post or a newsletter. We set it up together on your own laptop in Codex or Claude Code, and it learns your voice from your own words.",
        "This is not a prompt you copy and forget. It's a file your AI rereads every time it writes for you. Then we build with it. You'll see your voice as a living voice print you can tune and share, and you'll use it to create real content for this week. You leave with your voice profile on your computer, your voice print, and a social media post in your voice that's ready to send.",
        "I designed this for people who use AI but haven't built anything with it yet. If that's you, or you've never touched AI at all, you're exactly who I made it for. You'll need a laptop, Mac or Windows, and ChatGPT or Claude. The free ChatGPT plan works.",
        "I've been teaching since 1998, and most of the people in my Mastermind didn't come in as techies. That's the whole point. Bring the thing you've been putting off writing. I'd love to see what it sounds like in your voice.",
      ],
      urgency: [
        { title: '100 seats', body: 'The live Zoom room holds 100 people. When it is full, the doors close.' },
        { title: '2 to 3 hot seats', body: 'I rebuild a few people\'s writing live, picked from the answers on this form.' },
        { title: 'One night only', body: 'Tuesday, December 1. Live, with me.' },
      ],
      registerTitle: ['Your voice,', 'on the night.'],
      registerIntro: 'Free. Your Zoom link and calendar invite arrive by email from joe@mastermindshq.business.',
      bio: [
        '#1 Amazon bestselling author of How to Build Your Own AI Agent Operating System.',
        'Teaching since 1998. More than 90,000 people trained.',
      ],
      bioPhoto: '/images/events/voice-class/joe-with-book.jpg',
      bioSeal: '/images/events/voice-class/amazon-best-seller-seal.png',
      // Five real Mastermind members, word for word from mastermindshq.business testimonials.json,
      // picked for this class (beginners, writing, time back). Text only (Illy 12 Nov). Left out on
      // purpose: anyone with a personal or business tie to Joe, the never-contact list, and Craig
      // Soles (Illy 12 Nov: he does not want his testimonial used).
      // Kicker = people taught (90,000+, Joe's bio), not the testimonial count (Illy 12 Nov).
      testimonialsKicker: '90,000+ people taught since 1998',
      testimonialsTitle: ['Not techies.', 'Now they build.'],
      // Short verbatim cuts with face + full name, no location (Illy 12 Nov).
      testimonials: [
        { name: 'Heather Brand', photo: '/images/events/voice-class/face-heather-brand.webp', quote: 'With each section he makes sure that nobody gets left behind.' },
        { name: 'Jasmine Oh', photo: '/images/events/voice-class/face-jasmine-oh.webp', quote: 'Now I can finally do those things myself.' },
        { name: 'Leyolah Dekanic', photo: '/images/events/voice-class/face-leyolah-dekanic.webp', quote: 'It has become my fabulous assistant.' },
        { name: 'Miia Nern', photo: '/images/events/voice-class/face-miia-nern.webp', quote: 'Saved me literally at least 20 to 25 hours a week.' },
        { name: 'Johanna Bieber', photo: '/images/events/voice-class/face-johanna-bieber.webp', quote: 'So many things that you would have needed a whole team for, you can do now on your own.' },
      ],
    },
    sections: [],
    metadata: {
      title: 'Make AI Sound Exactly Like You: free live class with Joe Che',
      description:
        "Most AI writing sounds like AI, and your clients can tell. Build an AI that writes the way you actually talk, live with Joe Che on Tuesday, December 1. Free, Mac or Windows.",
    },
  },
  {
    slug: 'bring-the-task-you-hate',
    status: 'live',
    title: 'Free AI Class: Bring the Task You Hate the Most. Leave Without It.',
    shortTitle: 'Bring the Task You Hate the Most',
    eyebrow: 'Free Live AI Class',
    summary:
      'Emails, proposals, invoices, follow-ups, your CRM, content, bookkeeping, taxes, the process you keep doing by hand. Bring the one you hate the most on September 29 and I will automate it live with AI, on your actual business, for free. Join live and you leave with the fix and every prompt and setup from the night.',
    description:
      'A free live AI class. Tell Joe the task you hate the most and watch him automate it live with AI on a real business. Join live and leave with every prompt and setup from the night.',
    dateLabel: 'Tuesday, September 29, 2026',
    timeLabel: '7:00 PM to 9:00 PM Asia/Makassar (Bali)',
    locationLabel: 'Free online workshop',
    durationLabel: '90 minutes of live builds plus a 30-minute open round',
    heroImage: '/images/events/bring-the-task-you-hate-hero.jpg',
    heroAlt: 'Joe Che beside the class title: Free AI Class, Bring the Task You Hate the Most, Leave Without It, Tuesday September 29',
    heroNoOverlay: true,
    zoomLink: 'https://us02web.zoom.us/j/81275409884?pwd=lWpaRasSci7h7YHesIhRM2HlTbzVFA.1',
    ctaLabel: 'Send Me the Task You Hate the Most',
    intakeFields: {
      whatsappNumber: true,
      businessContext: true,
      aiLevelStep: true,
      businessContextLabel: 'What is the one task you hate the most?',
      businessContextPlaceholder: 'Example: replying to LinkedIn enquiries, writing proposals, chasing invoices, turning one recording into a month of posts',
      // The 55-character default blocked natural answers like "Chasing invoices"
      // (the placeholder's own example) and people gave up. Found 2026-09-21.
      businessContextMinLength: 3,
    },
    successDetail: 'You are in. Your Zoom link and calendar invite are on their way from joe@mastermindshq.business. I read every task that comes in and pick the ones I build live from that list, so the more specific you are, the better your odds. If nothing shows up in a couple of minutes, check spam and add that address to your contacts so the reminders reach you.',
    audience: [
      'Coaches and consultants doing their own admin',
      'Agency owners who are the backend of the agency',
      'Founders who have ChatGPT open in a tab and nothing else set up',
      'Anyone with a task they do every week and hate',
    ],
    outcomes: [
      'Five or six real tasks automated live, on real businesses',
      'Every prompt and setup from the night, in a doc you keep',
      'Free tools and resources you keep, for everyone who joins live',
      'A clear picture of what your week looks like with the busywork gone',
    ],
    hosts: [
      {
        name: 'Joe Che',
        firstName: 'Joe',
        role: 'Founder • AI Entrepreneur • Community Builder',
        photoSrc: '/images/events/joe-che-bio-bw.jpg',
        bio: [
          'Joe Che is a number one bestselling author in three categories across business and AI, the founder of 26 companies, and the builder of two AI companies, including All Sorted AI, a practical AI operating system for service-based small business owners.',
          'He previously built the largest software and business training company in New York City, where he trained more than 90,000 people, including Fortune 5 executives, the CIA, Microsoft, and Tyra Banks.',
          'Today, Joe mentors entrepreneurs inside his Business Automation Mastermind and helps founders use AI to create cleaner operations, stronger offers, faster execution, and more freedom.',
          'He demos his own AI operating system live and shows people how to use the 165 AI agents from his bestselling book in their own businesses.',
          'He built All Sorted, a plug and play AI operating system he installs for businesses, pre-built with 157 agents covering social media strategy, payments, finances, bookkeeping, research, lead generation and outreach, and content creation.',
        ],
        bioHtml: [
          'Joe Che is a number one bestselling author in three categories across business and AI, the founder of 26 companies, and the builder of two AI companies, including All Sorted AI, a practical AI operating system for service-based small business owners.',
          'He previously built the largest software and business training company in New York City, where he trained more than 90,000 people, including Fortune 5 executives, the CIA, Microsoft, and Tyra Banks.',
          'Today, Joe mentors entrepreneurs inside his <a href="https://mastermindshq.business" target="_blank" rel="noopener noreferrer" class="text-[#BDB3E8] underline underline-offset-4 hover:text-[#FCF4EB]">Business Automation Mastermind</a> and helps founders use AI to create cleaner operations, stronger offers, faster execution, and more freedom. He also wrote <a href="https://a.mastermindshq.business/ai-os-kindle" target="_blank" rel="noopener noreferrer" class="text-[#BDB3E8] underline underline-offset-4 hover:text-[#FCF4EB]">his number one bestselling book on AI operating systems</a>.',
        ],
      },
    ],
    pricing: {
      currencySymbol: '$',
      fullPrice: 0,
      checkoutHref: '',
      checkoutNote: 'Free registration. The Zoom link will be emailed right after you sign up.',
    },
    calendarEvent: {
      startIso: '2026-09-29T19:00:00+08:00',
      endIso: '2026-09-29T21:00:00+08:00',
      // Pinned in code, not left to the shared GOOGLE_WORKSHOP_CALENDAR_EVENT_ID
      // fallback. That fallback still held the 29 July workshop, so every
      // September registrant was silently invited to a July event (Illy, 2026-09-23).
      googleCalendarEventId: 'la3r9tth9v0kb45s0kkqqf23dc',
    },
    sections: [
      {
        type: 'html',
        id: 'about',
        eyebrow: 'What This Is',
        html: `
          <div class="not-prose space-y-5">
            <h2 class="event-gradient-title pt-2 text-[2rem] font-extrabold leading-[1.02] tracking-tight text-[#FCF4EB] md:text-[2.6rem]">
              What is the one task you hate the most?
            </h2>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              Everyone has one. The enquiry emails you answer the same way every week. Proposals you write from scratch at 11pm. Invoices you have to chase. Leads you meant to follow up with and never did. The recording that was supposed to become a month of content and is still sitting in a folder.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              When you register, you tell me yours. On the night I pick five or six of them and automate them live with AI, on the actual business, in front of everyone. No slides, no theory. You watch a task that takes an hour a week turn into something that runs on its own, and you see exactly how it was done so you can do it yourself the next morning.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              You do not need to be technical. If you have ChatGPT open in a browser tab, you are set up. Most of the people I work with came in exactly there.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              I teach business owners to do this every week in my <a href="https://mastermindshq.business" target="_blank" rel="noopener noreferrer" class="text-[#BDB3E8] underline underline-offset-4 transition hover:text-[#FCF4EB]">AI Business Mastermind</a>. Four cohorts have run and all four filled. Coaches, artists, therapists, consultants, none of them techies, who now have websites they built themselves, billing that runs itself, dashboards that track the whole business, and the same pattern across all of them: more sales coming in, less time on the work that used to eat their week. <a href="https://mastermindshq.business" target="_blank" rel="noopener noreferrer" class="text-[#BDB3E8] underline underline-offset-4 transition hover:text-[#FCF4EB]">Cohort 5 starts October 14</a> and is the one currently open.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              Everyone who joins live gets every prompt and setup from the night, plus free tools to take with you, whether or not your task made it into the live round. It is live only, so be there in the room. If you are there live, you can ask anything during the open round at the end.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              It is free. Send me the task you hate the most below.
            </p>
          </div>
        `,
      },
      {
        type: 'hosts',
        id: 'bio',
        eyebrow: 'Bio',
        title: 'Joe Che',
        intro: 'Founder • AI Entrepreneur • Community Builder',
        hosts: [],
      },
    ],
    metadata: {
      title: 'Free AI Class: Bring the Task You Hate the Most. Leave Without It.',
      description:
        'Emails, proposals, invoices, follow-ups, your CRM, content, bookkeeping, taxes, the process you keep doing by hand. Bring the one you hate the most on September 29 and Joe automates it live with AI, on your actual business, for free. Join live and leave with every prompt from the night.',
    },
  },
  {
    slug: 'business-blocks-ai-solved',
    status: 'live',
    title: 'The Biggest Business Blocks That AI Solved For Me',
    shortTitle: 'Business Blocks AI Solved',
    eyebrow: 'Live Workshop',
    summary:
      'A raw, practical Bali session hosted by Marina Choueri, featuring Joe Che on what AI actually removed from his business this year.',
    description:
      'A live workshop in Canggu where Joe Che shows what actually changed in his business this year, and the real AI systems behind it.',
    ctaLabel: 'Reserve Your Seat',
    dateLabel: 'Friday, August 7, 2026',
    timeLabel: '3:00 PM to 6:00 PM',
    locationLabel: 'Pererenan, Canggu, Bali',
    durationLabel: 'A 3-hour live session',
    heroImage: '/events/business-blocks-ai-solved/poster.png',
    heroAlt: 'The Biggest Business Blocks That AI Solved For Me, featuring Joe Che, Friday August 7, 3 to 6 PM',
    heroObjectFit: 'contain',
    heroNoOverlay: true,
    badge: 'Limited Spots',
    audience: [
      'Entrepreneurs',
      'Founders',
      'Coaches',
      'Neurodivergent operators',
      'People stuck in perfectionism',
      'Anyone launching something new',
    ],
    outcomes: [
      'Clarity over overwhelm',
      'Time back in your day',
      'Better decisions, faster',
      'A stronger team and systems',
      'More profit, less stress',
    ],
    hosts: [
      {
        name: 'Joe Che',
        firstName: 'Joe',
        role: 'Founder • AI Entrepreneur and Educator • Community Builder',
        photoSrc: '/images/events/joe-che-bio-bw.jpg',
        bio: [
          'Joe Che is a number one bestselling author in three categories across business and AI, the founder of 26 companies, and the builder of two AI companies, including All Sorted AI, a practical AI operating system for service-based small business owners.',
          'He previously built the largest software and business training company in New York City, where he trained more than 90,000 people, including Fortune 5 executives, the CIA, Microsoft, and Tyra Banks.',
          'Today, Joe mentors entrepreneurs inside his AI Business Mastermind and helps founders use AI to create cleaner operations, stronger offers, faster execution, and more freedom.',
        ],
        bioHtml: [
          'Joe Che is a number one bestselling author in three categories across business and AI, the founder of 26 companies, and the builder of two AI companies, including All Sorted AI, a practical AI operating system for service-based small business owners.',
          'He previously built the largest software and business training company in New York City, where he trained more than 90,000 people, including Fortune 5 executives, the CIA, Microsoft, and Tyra Banks.',
          'Today, Joe mentors entrepreneurs inside his <a href="https://mastermindshq.business" target="_blank" rel="noopener noreferrer" class="text-[#BDB3E8] underline underline-offset-4 hover:text-[#FCF4EB]">AI Business Mastermind</a> and helps founders use AI to create cleaner operations, stronger offers, faster execution, and more freedom.',
        ],
      },
      {
        name: 'Marina Choueri',
        firstName: 'Marina',
        role: 'Host • Super-Connector • Event Producer',
        photoSrc: '/mastermind-participants/marina--jaubert.jpg',
        hideBestsellerBadge: true,
        bio: [
          'Marina Choueri is known across Bali and Dubai as a true super-connector, the person who brings the right people into the same room.',
          'She went through Joe\'s AI Business Mastermind herself and came out with Magenta, an always-on AI co-founder that takes her voice notes, a personalized content studio, and her own brand book.',
          'Marina is hosting this session because she has lived the shift firsthand and wants her network to see it too.',
        ],
      },
    ],
    pricing: {
      currencySymbol: '$',
      fullPrice: 22,
      checkoutHref: '',
      checkoutNote: 'The exact venue address is emailed to registered guests the day before the event.',
      promoCodes: [
        {
          // Internal end-to-end test code. 95% lands at $1.10, deliberately
          // above Stripe's $0.50 floor. The usual Guest99 does NOT work on a
          // $22 ticket: 99% off is $0.22, which toStripeUnitAmount rejects.
          // A 100% code would be worse for testing, since a $0 total skips
          // Stripe entirely and never exercises the paid path.
          code: 'JOETEST',
          label: 'Internal test',
          description: 'Internal checkout test.',
          percentOff: 95,
        },
        {
          // Comped seats (Marina's guests, speakers, anyone Joe waves through).
          // 100% is correct here because the goal is a free seat, not a test:
          // this deliberately takes the no-Stripe path.
          code: 'GUESTOFMARINA',
          label: 'Guest of Marina',
          description: 'Complimentary seat.',
          percentOff: 100,
        },
      ],
    },
    calendarEvent: {
      startIso: '2026-08-07T15:00:00+08:00',
      endIso: '2026-08-07T18:00:00+08:00',
    },
    capacity: 40,
    // Same-day in-person event: close registration 30 minutes before doors so
    // nobody registers, pays, and never makes it in time to receive the
    // address or attend.
    registrationClosesIso: '2026-08-07T14:30:00+08:00',
    successDetail:
      'Your seat is confirmed. Check your inbox for the confirmation email, and I will send the exact address the day before the workshop.',
    intakeFields: {
      whatsappNumber: true,
      businessContext: true,
    },
    emailConfig: {
      headerLabel: null,
      detailsLabel: 'Event Details',
      // Marina is hosting, so attendee questions go to her rather than Joe. The
      // signature below stays Joe Che: he is still the one presenting.
      contactName: 'Marina',
      contactWhatsAppLink: 'https://wa.me/6282146079766',
      contactWhatsAppDisplay: '+62 821 4607 9766',
      // Only rendered once the location reveal window opens. See
      // event-confirmation-email.ts, which suppresses it while the venue is private.
      mapsUrl:
        "https://www.google.com/maps/place/Happy+Days+Villa+1,+Jl.+Pura+Gede+Batur+No.10,+Pererenan,+Kec.+Mengwi,+Kabupaten+Badung,+Bali+80351,+Indonesia/data=!4m2!3m1!1s0x2dd23942c968096b:0x4f45255bd98e88cb",
      skipSetupInstructions: true,
      signatureName: 'Joe Che',
    },
    privateLocationReminder: {
      eventStartIso: '2026-08-07T15:00:00+08:00',
      leadHours: 24,
      exactAddress:
        'Happy Days Villa 1, Jl. Pura Gede Batur No.10, Pererenan, Kec. Mengwi, Kabupaten Badung, Bali 80351, Indonesia',
      googleMapsUrl:
        "https://www.google.com/maps/place/Happy+Days+Villa+1,+Jl.+Pura+Gede+Batur+No.10,+Pererenan,+Kec.+Mengwi,+Kabupaten+Badung,+Bali+80351,+Indonesia/data=!4m2!3m1!1s0x2dd23942c968096b:0x4f45255bd98e88cb",
      parkingInstructions: [
        'Doors open at 3:00 PM, we start on time.',
        'Happy Days Villa 1 is on Jalan Pura Gede Batur in Pererenan, off the main Canggu strip.',
      ],
    },
    postPurchase: {
      setupPageTitle: "You're confirmed for the workshop.",
      setupPageIntro: "We'll send you the exact address closer to the date.",
      setupPageBody: [
        'The workshop runs 3:00 PM to 6:00 PM on Friday, August 7, in Canggu, Bali.',
        'You will receive a reminder email with the exact address the day before the event. See you there.',
      ],
      setupItems: [],
    },
    sections: [
      {
        type: 'checklist',
        id: 'outcomes',
        eyebrow: 'What You Will Leave With',
        title: 'Real stories, practical tools, bigger results',
        intro: 'This is a working session, not a keynote.',
        items: [
          'Clarity over overwhelm, instead of noise and too many open loops',
          'Time back in your day from automations that save hours every week',
          'Better decisions, faster, backed by data and confidence to move',
          'A stronger team and systems that scale past just you',
          'More profit and less stress, from solving the right blocks first',
        ],
      },
      {
        type: 'html',
        id: 'about',
        eyebrow: 'What This Is',
        html: `
          <div class="not-prose space-y-5">
            <h2 class="event-gradient-title pt-2 text-[2rem] font-extrabold leading-[1.02] tracking-tight text-[#FCF4EB] md:text-[2.6rem]">
              The blocks that used to run my business are gone. Here's what removed them.
            </h2>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              For three hours in Canggu, I'm going to get specific about what actually changed this year. Perfectionism, focus, speed, messaging, the stuff that used to run my week is the stuff I removed with AI, and I'll show you exactly how, live.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              This isn't a theory talk. It's the real systems, the agents, the workflows, the decisions behind them, shown so you can take the same approach into your own business.
            </p>
            <p class="text-base leading-8 text-[#FCF4EB]/72 md:text-lg">
              It's $22, hosted by Marina in Pererenan, Canggu. The exact address goes out to confirmed ticket holders the day before the event. Save your seat below.
            </p>
          </div>
        `,
      },
      {
        type: 'html',
        id: 'mid-cta',
        html: `
          <div class="not-prose text-center py-2">
            <a href="#register" class="copy-button-glass copy-button-primary inline-flex min-w-[220px] items-center justify-center rounded-xl px-6 py-4 text-base font-semibold no-underline">
              Reserve Your Seat
            </a>
          </div>
        `,
      },
      {
        type: 'hosts',
        id: 'hosts',
        eyebrow: 'Hosted By',
        title: 'Joe Che and Marina Choueri',
        intro: '',
        hosts: [],
      },
    ],
    metadata: {
      title: 'The Biggest Business Blocks That AI Solved For Me',
      description:
        'A live workshop in Canggu, Bali hosted by Marina Choueri, featuring Joe Che on what AI actually removed from his business this year.',
    },
  },
]

for (const event of events) {
  event.sections = event.sections.map((section) =>
    section.type === 'hosts'
      ? {
          ...section,
          hosts: event.hosts,
        }
      : section,
  )
}

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug)
}

export function getLiveEvents() {
  return events.filter((event) => event.status === 'live')
}

export function getUpcomingLiveEvents(now: Date = new Date()) {
  return getLiveEvents()
    .filter((event) => {
      const endIso = event.calendarEvent?.endIso ?? event.calendarEvent?.startIso
      if (!endIso) return true
      return new Date(endIso).getTime() >= now.getTime()
    })
    .sort((a, b) => {
      const aStart = a.calendarEvent?.startIso
      const bStart = b.calendarEvent?.startIso
      if (!aStart && !bStart) return 0
      if (!aStart) return 1
      if (!bStart) return -1
      return new Date(aStart).getTime() - new Date(bStart).getTime()
    })
}
