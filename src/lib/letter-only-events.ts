import type { LetterEvent } from './letter-schedule'

/**
 * Events that get Illy's scheduled letters but have NO page on this site.
 *
 * Maven Lightning Lesson "Make AI Sound Exactly Like You", Tue 26 Jan 2027
 * 21:00 Singapore/Bali (maven.com/p/b6c209). Illy 23 Nov 2026: Maven sends its
 * own confirmation, 1-2 hour reminder and recording email; we add only the
 * approved voice class letters Maven does not cover, from our own system.
 * Sign-ups are copied in by the Studio job agents/events-manager/maven-lesson
 * (event_registrations, acquisition_ref 'maven'), which also writes the
 * event flags below.
 *
 * Text = the approved 1 Dec letters. e2 and e3 carry browser-lesson word
 * changes (no app install), so they wait for the event flag copy_approved,
 * set only after Illy's yes on those exact words. e5 and a2 are word for word.
 */
export const MAVEN_VOICE_LESSON_SLUG = 'maven-voice-lesson-2027-01-26'

export const letterOnlyEvents: LetterEvent[] = [
  {
    slug: MAVEN_VOICE_LESSON_SLUG,
    zoomLink: 'https://us02web.zoom.us/j/87862308220?pwd=U9LCajR1OSTIhQhMa1EKMShtNxgdYT.1',
    letterSchedule: [
      {
        key: 'e2-setup',
        sendAtIso: '2027-01-22T17:00:00+08:00',
        windowMinutes: 360,
        subject: 'Your 5-minute setup for Tuesday',
        preview: "Two small things, then you're ready",
        body: "Hi {first},\n\nHere's your 5-minute setup. Do it now and Tuesday is all building, no installing.\n\n1. Open ChatGPT or Claude in your browser and sign in. The free plan works.\n\n2. Put 3 to 5 things you've written into one document: an email to a client, a post, a newsletter. Take out anything private.\n\nReply DONE when you're signed in. If something doesn't work, reply with what you see and we'll get it working before Tuesday.\n\nJoe",
        audience: { signedUpBeforeIso: '2027-01-22T17:00:00+08:00', requiresEventFlag: 'copy_approved' },
      },
      {
        key: 'e3-tomorrow',
        sendAtIso: '2027-01-25T16:00:00+08:00',
        windowMinutes: 360,
        subject: 'Our class is tomorrow',
        preview: 'Your Zoom link is inside',
        body: "Hi {first},\n\nQuick reminder, we're on tomorrow. It's in your calendar at your own time.\n\nJoin the class on Zoom\n\nHave ChatGPT or Claude open in your browser and your writing in one document, and you're ready.\n\nWhat's the first thing you want to write in your voice? Hit reply and tell me.\n\nJoe",
        audience: { requiresEventFlag: 'copy_approved' },
      },
      {
        key: 'e5-we-started',
        sendAtIso: '2027-01-26T21:05:00+08:00',
        windowMinutes: 15,
        subject: 'We started, jump in',
        preview: "You haven't missed the building",
        body: "Hi {first},\n\nWe just started and we're still getting everyone set up. Jump in now.\n\nJoin the class on Zoom\n\nJoe",
      },
      {
        key: 'a2-story',
        sendAtIso: '2027-01-29T21:00:00+08:00',
        windowMinutes: 360,
        subject: 'It thinks like me',
        preview: 'What happens after your voice profile',
        body: "Hi {first},\n\nYour voice profile is step one. Here's what happens when you keep going.\n\nTiyana Jovic runs TI YA RA in Ubud. In my Mastermind she built AI agents that research and write for her. In her words, they're \"resonating with my voice, with my brand, with my way of thinking.\"\n\nLanding pages that used to take her three days or more now take her 30 minutes.\n\nThat's what we build together in Cohort 6, every Monday from 8 Feb. If you'd like to talk about your business, here's my calendar:\n\nBook a call with Joe\n\nOr hit reply: what's the one job you'd hand to your AI first?\n\nJoe",
        links: { 'Book a call with Joe': 'https://a.mastermindshq.business/voice-f2-book' },
        // stop_checked: the Studio job has run its member/replied/booked/paid check after the lesson.
        audience: { requiresEventFlag: 'stop_checked', stopFlags: ['stop'] },
        unsubscribeFooter: true,
      },
    ],
  },
]

export function getLetterOnlyEvent(slug: string): LetterEvent | undefined {
  return letterOnlyEvents.find((event) => event.slug === slug)
}
