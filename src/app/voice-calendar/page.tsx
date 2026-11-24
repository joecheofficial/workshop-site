import type { Metadata } from 'next'
import { getEventBySlug } from '@/lib/events'
import { buildGoogleCalendarUrl, buildOutlookCalendarUrl } from '@/lib/calendar'

// Linked from the P.S. of the voice class "5-minute setup" letter (Illy 24 Nov 2026:
// one sentence, "just tell them to add it", no extra Google invite email).
// Google: opens the invite registrants already hold (they are guests on Joe's
// event), so a Yes there shows in our count. Outlook web + .ics for everyone else.
// Same dark look as /voice-setup.
export const metadata: Metadata = {
  title: 'Add Tuesday to your calendar',
  description: 'Add the Make AI Sound Exactly Like You class to your calendar.',
  robots: { index: false, follow: false },
}

const SLUG = 'make-ai-sound-exactly-like-you'
const ORGANIZER_CALENDAR = 'newyork1@gmail.com'

function googleInviteUrl(eventId: string): string {
  const eid = Buffer.from(`${eventId} ${ORGANIZER_CALENDAR}`).toString('base64').replace(/=+$/, '')
  return `https://calendar.google.com/calendar/event?eid=${eid}`
}

export default function VoiceCalendarPage() {
  const event = getEventBySlug(SLUG)
  const cal = event?.calendarEvent
  const zoom = event?.zoomLink ?? ''
  const base = cal
    ? {
        title: event!.title,
        startIso: cal.startIso,
        endIso: cal.endIso,
        location: zoom,
        description: zoom ? `Join live on Zoom: ${zoom}` : undefined,
      }
    : null

  const googleHref = cal?.googleCalendarEventId
    ? googleInviteUrl(cal.googleCalendarEventId)
    : base
      ? buildGoogleCalendarUrl(base)
      : '#'
  const googleCopyHref = base ? buildGoogleCalendarUrl(base) : '#'

  const options = [
    { name: 'Google Calendar', note: 'Opens your invite. Tap Yes.', href: googleHref, cta: 'Open in Google Calendar' },
    { name: 'Outlook', note: 'Outlook.com, Hotmail or Live.', href: base ? buildOutlookCalendarUrl(base) : '#', cta: 'Add to Outlook' },
    { name: 'Apple or Outlook app', note: 'iPhone, Mac or the Outlook desktop app.', href: `/api/events/${SLUG}/calendar`, cta: 'Add to my calendar' },
  ]

  return (
    <main
      style={{
        width: '100%',
        maxWidth: 560,
        margin: '0 auto',
        padding: '56px 20px 96px',
        boxSizing: 'border-box',
        color: '#FCF4EB',
      }}
    >
      <p
        style={{
          margin: '0 0 12px',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#8B79D4',
        }}
      >
        Tuesday 1 Dec
      </p>
      <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(30px, 7vw, 40px)', lineHeight: 1.15, fontWeight: 800 }}>
        Add Tuesday to your calendar
      </h1>
      <p style={{ margin: '0 0 32px', fontSize: 17, lineHeight: 1.6, color: 'rgba(252,244,235,0.78)' }}>
        Pick your calendar. The Zoom link is inside, at your own time.
      </p>

      <div style={{ display: 'grid', gap: 16 }}>
        {options.map((o) => (
          <div
            key={o.name}
            style={{
              padding: '22px 20px',
              borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <p style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700 }}>{o.name}</p>
            <p style={{ margin: '0 0 16px', fontSize: 16, color: 'rgba(252,244,235,0.72)' }}>{o.note}</p>
            <a
              href={o.href}
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '14px 18px',
                borderRadius: 12,
                background: '#8B79D4',
                color: '#151515',
                fontSize: 16,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              {o.cta}
            </a>
          </div>
        ))}
      </div>

      <p style={{ margin: '24px 0 0', fontSize: 15, lineHeight: 1.6, color: 'rgba(252,244,235,0.6)' }}>
        Google says it can&apos;t find the invite?{' '}
        <a href={googleCopyHref} style={{ color: '#B9AEE8' }}>
          Add it to Google this way
        </a>
        .
      </p>
    </main>
  )
}
