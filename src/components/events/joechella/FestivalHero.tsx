import Image from 'next/image'
import type { EventDefinition } from '@/lib/events'
import ScrollToRegisterButton from '@/components/events/ScrollToRegisterButton'
import AmbientHeroVideo from '@/components/events/joechella/AmbientHeroVideo'
import './festival.css'

const primaryButton =
  'copy-button-glass copy-button-primary inline-flex min-h-[52px] min-w-[220px] items-center justify-center rounded-xl px-7 py-4 text-base font-semibold shadow-[0_16px_38px_rgba(139,121,212,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BDB3E8]'

function splitTitle(title: string) {
  const index = title.indexOf(': ')
  if (index === -1) return { lead: title, rest: null }
  return { lead: title.slice(0, index), rest: title.slice(index + 2) }
}

function Ticker({ items }: { items: string[] }) {
  const row = (duplicate: boolean) => (
    <div className={`flex shrink-0 items-center ${duplicate ? 'jc-ticker-dup' : ''}`}>
      {items.map((item) => (
        <span key={item} className="flex items-center whitespace-nowrap">
          <span className="px-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#FCF4EB]/78 md:px-7 md:text-[15px]">
            {item}
          </span>
          <span className="text-[#F5C3C6]/70">&#10022;</span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      aria-hidden="true"
      className="jc-ticker relative overflow-hidden border-y border-white/10 bg-[linear-gradient(90deg,rgba(139,121,212,0.16),rgba(245,195,198,0.10),rgba(139,121,212,0.16))] py-4"
    >
      <div className="jc-ticker-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

export default function FestivalHero({ event, eventEnded }: { event: EventDefinition; eventEnded: boolean }) {
  const { lead, rest } = splitTitle(event.title)
  const poster = event.heroVideoPoster ?? event.heroImage
  const ticker = event.festivalLayout?.ticker ?? []

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <AmbientHeroVideo
          src={event.heroVideoSrc}
          mobileSrc={event.heroVideoMobileSrc}
          mobilePoster={event.heroVideoMobilePoster}
          poster={
            <Image
              src={poster}
              alt={event.heroAlt}
              fill
              priority
              sizes="100vw"
              className="jc-hero-poster object-cover"
            />
          }
          overlays={
            <>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,21,21,0.62)_0%,rgba(21,21,21,0.38)_30%,rgba(21,21,21,0.72)_68%,#151515_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,7,20,0.72)_0%,rgba(10,7,20,0.38)_50%,rgba(10,7,20,0)_100%)]" />
              <div className="absolute -left-24 bottom-0 h-[420px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(139,121,212,0.30),transparent_68%)] blur-2xl" />
            </>
          }
        />

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-end px-6 pb-10 pt-10 md:pb-16 md:pt-28">
          <div className="jc-rise flex flex-wrap items-center gap-3 pr-14 md:pr-0" style={{ ['--jc-i' as string]: 0 }}>
            {event.badge ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F5C3C6]/35 bg-black/35 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5C3C6] backdrop-blur-md">
                <span className="jc-badge-dot h-2 w-2 rounded-full bg-[#F5C3C6]" aria-hidden="true" />
                {event.badge}
              </span>
            ) : null}
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#D9D1F7] md:text-[12px]">
              {event.eyebrow}
            </p>
          </div>

          <h1 className="jc-rise mt-4 font-extrabold md:mt-5 tracking-tight" style={{ ['--jc-i' as string]: 1 }}>
            <span className="event-gradient-title block [filter:drop-shadow(0_6px_28px_rgba(10,7,20,0.65))] text-[3.4rem] leading-[0.95] sm:text-[4.6rem] md:text-[6.2rem] lg:text-[7.4rem]">
              {lead}
            </span>
            {rest ? (
              <>
                <span className="sr-only">: </span>
                <span className="jc-title-glow mt-3 block max-w-[18ch] text-[1.55rem] leading-[1.1] text-[#FCF4EB] sm:text-[2rem] md:max-w-none md:text-[2.6rem]">
                  {rest}
                </span>
              </>
            ) : null}
          </h1>

          <p
            className="jc-rise mt-4 max-w-2xl text-[1.05rem] leading-7 md:mt-5 md:leading-8 text-[#FCF4EB]/86 md:text-xl md:leading-9"
            style={{ ['--jc-i' as string]: 2 }}
          >
            {event.summary}
          </p>

          <div className="jc-rise mt-6 grid max-w-3xl gap-3 sm:grid-cols-2 md:mt-7" style={{ ['--jc-i' as string]: 3 }}>
            <div className="rounded-[1.3rem] border border-white/15 bg-[rgba(16,12,28,0.55)] px-5 py-4 backdrop-blur-md md:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#BDB3E8]">When</p>
              <p className="mt-1.5 text-lg font-bold leading-snug text-[#FCF4EB] md:mt-2 md:text-2xl">
                {event.dateLabel}
              </p>
              <p className="mt-1 text-sm text-[#FCF4EB]/70">{event.timeLabel}</p>
            </div>
            <div className="rounded-[1.3rem] border border-white/15 bg-[rgba(16,12,28,0.55)] px-5 py-4 backdrop-blur-md md:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#BDB3E8]">Where</p>
              <p className="mt-1.5 text-lg font-bold leading-snug text-[#FCF4EB] md:mt-2 md:text-2xl">
                {event.locationLabel}
              </p>
              <p className="mt-1 text-sm text-[#FCF4EB]/70">{event.durationLabel}</p>
            </div>
          </div>

          <div className="jc-rise mt-6 flex flex-col gap-2" style={{ ['--jc-i' as string]: 4 }}>
            <div className="flex flex-wrap items-center gap-3">
              {eventEnded ? (
                <button type="button" disabled className={`${primaryButton} cursor-not-allowed opacity-65`}>
                  This event has ended
                </button>
              ) : (
                <ScrollToRegisterButton className={primaryButton}>
                  {event.ctaLabel ?? 'Buy Ticket'}
                </ScrollToRegisterButton>
              )}
              <a
                href="#schedule"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-black/30 px-6 py-4 text-base font-semibold text-[#FCF4EB]/90 backdrop-blur-md transition hover:border-white/35 hover:bg-black/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BDB3E8]"
              >
                See the program
                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M10 14.5 4.5 9l1.4-1.4L10 11.7l4.1-4.1L15.5 9z" />
                </svg>
              </a>
            </div>
            {!eventEnded ? (
              <p className="pl-1 text-xs leading-5 text-[#FCF4EB]/60">
                Have a promo code? Enter it in the registration section below.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {ticker.length ? <Ticker items={ticker} /> : null}

      <section className="mx-auto max-w-6xl px-6 pb-2 pt-10 md:pt-14" data-jc-reveal="">
        <p className="max-w-4xl border-l-2 border-[#F5C3C6]/60 pl-5 text-lg leading-8 text-[#FCF4EB]/80 md:pl-7 md:text-[1.4rem] md:leading-10">
          {event.description}
        </p>
      </section>
    </>
  )
}
