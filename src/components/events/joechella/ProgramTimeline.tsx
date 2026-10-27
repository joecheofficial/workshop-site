import type { CSSProperties } from 'react'
import type { EventSection, EventTimelineGroup, EventTimelineItem } from '@/lib/events'
import './festival.css'

type TimelineSection = Extract<EventSection, { type: 'timeline' }>
type Tone = EventTimelineGroup['tone']

const TONES: Record<Tone, { accent: string; line: string; label: string }> = {
  morning: {
    accent: '#FCF4EB',
    line: 'linear-gradient(180deg, rgba(252,244,235,0.55), rgba(252,244,235,0.12))',
    label: 'linear-gradient(90deg, #FCF4EB 0%, #F3E2CF 100%)',
  },
  afternoon: {
    accent: '#F5C3C6',
    line: 'linear-gradient(180deg, rgba(245,195,198,0.7), rgba(189,179,232,0.25))',
    label: 'linear-gradient(90deg, #FCF4EB 0%, #F5C3C6 100%)',
  },
  sunset: {
    accent: '#F4A9A0',
    line: 'linear-gradient(180deg, rgba(244,169,160,0.75), rgba(245,195,198,0.25))',
    label: 'linear-gradient(90deg, #F8D2B8 0%, #F4A9A0 55%, #F5C3C6 100%)',
  },
  night: {
    accent: '#BDB3E8',
    line: 'linear-gradient(180deg, rgba(189,179,232,0.8), rgba(139,121,212,0.2))',
    label: 'linear-gradient(90deg, #FCF4EB 0%, #b7a6f0 100%)',
  },
}

function ToneIcon({ tone }: { tone: Tone }) {
  const common = 'h-5 w-5'
  if (tone === 'night') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={common}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
      </svg>
    )
  }
  if (tone === 'sunset') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={common}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M6 16a6 6 0 0 1 12 0M3 16h18M5 20h14M12 4v3M4.9 8.9l1.4 1.4M19.1 8.9l-1.4 1.4" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r={tone === 'morning' ? 3.2 : 4} />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function HighlightIcon({ kind }: { kind: NonNullable<EventTimelineItem['highlight']> }) {
  if (kind === 'music') {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M9 18V5l11-2v13" strokeLinejoin="round" />
        <circle cx="6.5" cy="18" r="2.5" />
        <circle cx="17.5" cy="16" r="2.5" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" strokeLinecap="round" />
    </svg>
  )
}

/** Keeps the full title text, but softens a trailing "(to be confirmed)". */
function ItemTitle({ title }: { title: string }) {
  const marker = ' (to be confirmed)'
  if (!title.endsWith(marker)) return <>{title}</>
  return (
    <>
      {title.slice(0, -marker.length)}{' '}
      <span className="whitespace-nowrap text-[0.78em] font-medium text-[#FCF4EB]/55">(to be confirmed)</span>
    </>
  )
}

function ItemCard({ item, accent }: { item: EventTimelineItem; accent: string }) {
  const highlighted = Boolean(item.highlight)
  return (
    <article
      className={`jc-card h-full rounded-[1.25rem] border p-4 md:p-5 ${
        item.highlight === 'talk'
          ? 'jc-card-highlight border-transparent bg-[linear-gradient(140deg,rgba(245,195,198,0.20),rgba(139,121,212,0.14))] shadow-[0_18px_55px_rgba(245,195,198,0.16)]'
          : highlighted
            ? 'jc-card-highlight border-transparent bg-[linear-gradient(140deg,rgba(139,121,212,0.18),rgba(245,195,198,0.07))] shadow-[0_18px_50px_rgba(139,121,212,0.18)]'
            : 'border-white/10 bg-white/[0.04]'
      }`}
    >
      {item.highlight ? (
        <span
          className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/30"
          style={{ color: item.highlight === 'talk' ? '#F5C3C6' : accent }}
        >
          <HighlightIcon kind={item.highlight} />
        </span>
      ) : null}
      <h4
        className={`font-bold leading-snug tracking-tight text-[#FCF4EB] ${
          highlighted ? 'text-[1.35rem] md:text-[1.6rem]' : 'text-[1.08rem] md:text-[1.2rem]'
        }`}
      >
        <ItemTitle title={item.title} />
      </h4>
      {item.body ? (
        <p className={`mt-2 text-sm leading-6 ${highlighted ? 'text-[#FCF4EB]/80' : 'text-[#FCF4EB]/64'}`}>
          {item.body}
        </p>
      ) : null}
    </article>
  )
}

/** Merges back-to-back items that share a time slot into one row. */
function toRows(items: EventTimelineItem[]) {
  const rows: Array<{ time: string; items: EventTimelineItem[] }> = []
  for (const item of items) {
    const last = rows[rows.length - 1]
    if (last && last.time === item.time) last.items.push(item)
    else rows.push({ time: item.time, items: [item] })
  }
  return rows
}

function startOf(time: string) {
  return time.split(' to ')[0]
}

function Group({ group }: { group: EventTimelineGroup }) {
  const tone = TONES[group.tone]
  const rows = toRows(group.items)
  const firstTime = group.items[0] ? startOf(group.items[0].time) : null

  return (
    <div
      data-jc-line=""
      className={`jc-group relative overflow-hidden rounded-[1.6rem] border border-white/10 p-4 shadow-[0_22px_60px_rgba(0,0,0,0.22)] md:rounded-[2rem] md:p-8 ${
        group.tone === 'night' ? 'jc-night-glow bg-[rgba(18,12,34,0.6)]' : 'bg-white/[0.025]'
      }`}
    >
      <header className="mb-6 flex flex-col gap-2 md:mb-8 md:flex-row md:items-end md:justify-between md:gap-8">
        <div>
          <p
            className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em]"
            style={{ color: tone.accent }}
          >
            <ToneIcon tone={group.tone} />
            {firstTime ? <span>From {firstTime}</span> : null}
          </p>
          <h3
            className="mt-2 text-[2.2rem] font-extrabold leading-[1.02] tracking-tight md:text-[3rem]"
            style={{
              backgroundImage: tone.label,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              paddingBottom: '0.12em',
            }}
          >
            {group.label}
          </h3>
        </div>
        {group.note ? (
          <p className="max-w-sm text-sm leading-6 text-[#FCF4EB]/62 md:text-right md:text-base">{group.note}</p>
        ) : null}
      </header>

      <ol className="relative grid gap-5 md:gap-6">
        <span
          aria-hidden="true"
          className="jc-rail-line pointer-events-none absolute bottom-3 left-[9.5px] top-3 w-px md:left-[179.5px]"
          style={{ backgroundImage: tone.line }}
        />
        {rows.map((row, rowIndex) => {
          const highlighted = row.items.some((item) => item.highlight)
          const cols =
            row.items.length >= 3 ? 'sm:grid-cols-2 xl:grid-cols-3' : row.items.length === 2 ? 'sm:grid-cols-2' : ''
          return (
            <li
              key={`${row.time}-${rowIndex}`}
              data-jc-reveal=""
              className="jc-row grid grid-cols-[20px_minmax(0,1fr)] gap-x-3 gap-y-2 md:grid-cols-[150px_20px_minmax(0,1fr)] md:gap-x-5"
              style={{ '--jc-delay': `${Math.min(rowIndex, 5) * 70}ms` } as CSSProperties}
            >
              <p className="col-start-2 row-start-1 pt-0.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#FCF4EB]/78 tabular-nums md:col-start-1 md:pt-[1.05rem] md:text-right md:text-[14px] md:normal-case md:tracking-normal">
                {row.time}
              </p>
              <span
                className="col-start-1 row-start-1 flex justify-center pt-[0.3rem] md:col-start-2 md:pt-[1.25rem]"
                aria-hidden="true"
              >
                <span
                  className={`jc-dot relative z-10 block rounded-full border-2 ${highlighted ? 'h-[14px] w-[14px]' : 'h-3 w-3'}`}
                  style={{
                    borderColor: tone.accent,
                    backgroundColor: highlighted ? tone.accent : '#151515',
                  }}
                />
              </span>
              <div className={`col-start-2 row-start-2 grid gap-3 md:col-start-3 md:row-start-1 ${cols}`}>
                {row.items.map((item) => (
                  <ItemCard key={item.title} item={item} accent={tone.accent} />
                ))}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default function ProgramTimeline({ section }: { section: TimelineSection }) {
  return (
    <section id={section.id} className="mx-auto max-w-6xl scroll-mt-24 px-6 py-8 md:py-12">
      <div className="mb-7 md:mb-9" data-jc-reveal="">
        {section.eyebrow ? (
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-[#BDB3E8] md:text-[13px]">
            {section.eyebrow}
          </p>
        ) : null}
        <h2 className="event-gradient-title text-[2.2rem] font-extrabold leading-[1.02] tracking-tight md:text-[3.4rem]">
          {section.title}
        </h2>
        {section.intro ? (
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#FCF4EB]/68 md:text-lg">{section.intro}</p>
        ) : null}
      </div>
      <div className="grid gap-5 md:gap-6">
        {section.groups.map((group) => (
          <Group key={group.label} group={group} />
        ))}
      </div>
    </section>
  )
}
