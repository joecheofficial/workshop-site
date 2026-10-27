import Image from 'next/image'
import type { EventSection } from '@/lib/events'
import EventMediaVideo from '@/components/events/EventMediaVideo'
import './festival.css'

type GallerySection = Extract<EventSection, { type: 'gallery' }>

const tileLayouts = [
  'col-span-2 aspect-[16/10] md:aspect-auto md:h-[320px]',
  'col-span-1 aspect-[4/5] md:aspect-auto md:h-[320px]',
  'col-span-1 aspect-[4/5] md:aspect-auto md:h-[320px]',
]

export default function VenueGallery({ section }: { section: GallerySection }) {
  return (
    <section id={section.id} className="mx-auto max-w-6xl px-6 py-8 md:py-12">
      {section.eyebrow || section.title ? (
        <div className="mb-5" data-jc-reveal="">
          {section.eyebrow ? (
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-[#BDB3E8] md:text-[13px]">
              {section.eyebrow}
            </p>
          ) : null}
          {section.title ? (
            <h2 className="event-gradient-title text-[1.7rem] font-extrabold leading-[1.05] tracking-tight md:text-[2.65rem]">
              {section.title}
            </h2>
          ) : null}
        </div>
      ) : null}

      {section.video ? (
        <figure
          data-jc-reveal=""
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
        >
          <div className="relative aspect-video w-full bg-black">
            <EventMediaVideo
              className="absolute inset-0 h-full w-full object-cover"
              src={section.video.src}
              poster={section.video.poster}
              aria-label={section.video.label}
              controls
              playsInline
              preload="none"
            />
          </div>
          {section.video.caption ? (
            <figcaption className="border-t border-white/10 px-6 py-4 text-sm leading-6 text-[#FCF4EB]/62">
              {section.video.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      {section.images.length ? (
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {section.images.map((image, index) => (
            <figure
              key={image.src}
              data-jc-reveal=""
              style={{ ['--jc-delay' as string]: `${index * 90}ms` }}
              className={`jc-tile group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.04] shadow-[0_18px_50px_rgba(0,0,0,0.25)] ${
                tileLayouts[index] ?? 'col-span-1 aspect-[4/5] md:aspect-auto md:h-[320px]'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={index === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(10,7,20,0.75))]"
              />
              <figcaption
                aria-hidden="true"
                className="absolute bottom-3 left-4 right-4 text-xs font-semibold leading-5 text-[#FCF4EB]/90 md:bottom-4 md:text-sm"
              >
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </section>
  )
}
