'use client'

import { useRef, useState } from 'react'

const photos = [
  { src: '/events/connection-dinner-canggu/guests-1.jpg', alt: 'Joe and guests at a Connection Dinner' },
  { src: '/events/connection-dinner-canggu/guests-3.jpg', alt: 'Guests sharing an evening at a Connection Dinner' },
  { src: '/events/connection-dinner-canggu/guests-2.jpg', alt: 'Three guests at Mostly Restaurant' },
  { src: '/events/connection-dinner-canggu/guests-4.jpg', alt: 'Joe and a guest at Mostly Restaurant' },
]

export default function DinnerPhotoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ atStart: true, atEnd: false })

  function updatePosition() {
    const track = trackRef.current
    if (!track) return
    setPosition({
      atStart: track.scrollLeft <= 2,
      atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2,
    })
  }

  function move(direction: number) {
    const track = trackRef.current
    if (!track) return
    const slide = track.firstElementChild as HTMLElement | null
    if (!slide) return
    track.scrollBy({
      left: direction * (slide.getBoundingClientRect().width + 16),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  return (
    <section id="dinner-photo-carousel" aria-label="Photos from past Connection Dinners" aria-roledescription="carousel" className="mx-auto max-w-6xl px-6 py-6 md:py-8">
      <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.24em] text-[#BDB3E8] md:text-[13px]">Past Dinners</p>
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 md:p-6">
        <div
          ref={trackRef}
          onScroll={updatePosition}
          onLoad={updatePosition}
          tabIndex={0}
          aria-label="Dinner photos. Swipe or use the previous and next buttons."
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#BDB3E8]"
        >
          {photos.map((photo, index) => (
            <figure key={photo.src} aria-label={`Photo ${index + 1} of ${photos.length}`} aria-roledescription="slide" className="relative m-0 aspect-[2/3] w-full shrink-0 snap-start overflow-hidden rounded-2xl bg-black/20 md:w-[calc((100%-1rem)/2)]">
              <img src={photo.src} alt={photo.alt} width={567} height={850} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center" />
            </figure>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-sm text-[#FCF4EB]/65">Moments from past dinners</p>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous dinner photo" disabled={position.atStart} onClick={() => move(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-xl text-[#FCF4EB] transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#BDB3E8] disabled:cursor-default disabled:opacity-30">←</button>
            <button type="button" aria-label="Next dinner photo" disabled={position.atEnd} onClick={() => move(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-xl text-[#FCF4EB] transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#BDB3E8] disabled:cursor-default disabled:opacity-30">→</button>
          </div>
        </div>
      </div>
    </section>
  )
}
