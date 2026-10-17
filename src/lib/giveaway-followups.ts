// Free-gift follow-up sequence (Illy approved the outline 17 Oct 2026, Hormozi
// "don't go quiet after the free gift"). Copy and rules live here; the sender is
// scripts/giveaway-followups.ts. Docs: docs/giveaway-followups.md.
//
// Who: anyone in Supabase `leads` who grabbed a free gift (ManyChat v2 IG flow or
// a giveaway page) AFTER the sender was switched on. Never the IG sales keywords
// (source kw-*), never test addresses.
//
//   day 0   the delivery email /api/lead-magnet already sends, plus one P.S. that
//           matches the gift's level (dayZeroPs below)
//   dm_level   ~20h after their last IG message, inside Instagram's 24h window:
//              one DM asking where they are with AI (reply 1, 2 or 3)
//   dm_ack     they answered with a number: one short "got it" DM, level saved
//   dm_human   they wrote something else: no bot reply, Illy gets a Telegram ping
//   email_quickwin  48h after the gift: one quick win for their level + a soft link
//   email_last      5 days after the gift: the one email with the real deadline
//                   (or, when there is no real deadline, an honest "last one")
//   then NOTHING. Illy: "we decide later. we are not doing weekly rn."
//
// Each (email, step) is claimed in giveaway_followup_sends before it is sent, so
// nobody ever gets the same message twice. Pure module: no network, no clock
// except `now`, so the tests can drive every branch.

export type Level = 'starter' | 'everyday' | 'builder'
export type Step = 'dm_level' | 'dm_ack' | 'dm_human' | 'email_quickwin' | 'email_last'
export const STEPS: Step[] = ['dm_level', 'dm_ack', 'dm_human', 'email_quickwin', 'email_last']

const HOUR = 3600 * 1000
const DAY = 24 * HOUR

/** Instagram allows a reply only within 24h of the person's last message. */
export const DM_AFTER_HOURS = 20
export const DM_WINDOW_CLOSES_HOURS = 23.5
export const QUICKWIN_AFTER_HOURS = 48
export const QUICKWIN_TOO_LATE_HOURS = 96
export const LAST_AFTER_DAYS = 5
export const LAST_MIN_GAP_HOURS = 48
export const LAST_TOO_LATE_DAYS = 8

export const LINKS = {
  demo: 'https://mastermindshq.business/website-workshop/demo',
  workshop: 'https://mastermindshq.business/website-workshop',
  metaAds: 'https://mastermindshq.business/meta-ads-with-claude-code',
}

/**
 * Gifts that only make sense if you already work in Claude Code or with agents.
 * Everything else is treated as a starter gift until the person tells us more.
 */
export const BUILDER_SOURCES = new Set([
  'tokens',
  'claude-md',
  'benchmark',
  'anthropic-safety-checklist',
  'cross-cli-compatibility-routing',
  'guardog',
  'fable-worth-it-audit',
  'terminal-to-claude-desktop',
  'staying-alive-mission-control',
])

/** The quiz result page already recommends next moves, so it gets no day-0 P.S. */
export const NO_PS_SOURCES = new Set(['ai-levels-quiz'])

/** IG sales keywords (BOOK, MASTERMIND, META, ADS, TEAM, BUILD) are not free gifts. */
export function isSalesKeywordSource(source: string): boolean {
  return /^kw-/.test(source)
}

const TEST_EMAIL = /(^|[+.])(test|wstest)|@example\.|@resend\.dev$/i
export function isTestEmail(email: string): boolean {
  return TEST_EMAIL.test(email)
}

/** Website Workshop funnel sources: once someone is in there, its own emails take over. */
export const WW_FUNNEL_SOURCES = new Set(['workshop_demo', 'workshop_inline', 'workshop_exit_intent', 'workshop_checkout_step1'])

export function levelFromSource(source: string): Level {
  return BUILDER_SOURCES.has(source) ? 'builder' : 'starter'
}

/** AI Capability Levels quiz (0 to 40): 0-10 exploring, 11-20 applying, 21+ integrating/compounding. */
export function levelFromQuizScore(score: number | null | undefined): Level | null {
  if (score == null || !Number.isFinite(Number(score))) return null
  const n = Number(score)
  if (n >= 21) return 'builder'
  if (n >= 11) return 'everyday'
  return 'starter'
}

/** "1", "2.", " 3 ", "option 2", "#3" -> level. Anything else -> null (a human answers). */
export function parseLevelReply(text: string | null | undefined): Level | null {
  const t = String(text || '').trim().toLowerCase()
  const m = t.match(/^(?:option\s*|#|number\s*)?([123])[\s.!)]*$/)
  if (!m) return null
  return ({ '1': 'starter', '2': 'everyday', '3': 'builder' } as const)[m[1] as '1' | '2' | '3']
}

// ---------------------------------------------------------------- Meta Ads dates
// Shared Mastermind calendar: Final Review live Mon 2 Nov 2026, 7-9pm Bali.
// The deadline email only goes out while that is still true, with a margin so
// it never lands after the session has started.
export const META_FINAL_REVIEW_START = new Date('2026-11-02T11:00:00Z') // 19:00 Bali
/** Same switch as mhq-homepage meta-ads-course-phase.ts: the page says "recorded" from here. */
export const META_RECORDED_FROM = new Date('2026-11-02T16:00:00Z') // Tue 3 Nov 00:00 Bali
export const META_DEADLINE_EMAIL_UNTIL = new Date('2026-11-02T04:00:00Z') // 12:00 Bali, same day
/** Before this the Session 3 replay may not be up, so "three replays" would be false. */
export const META_DEADLINE_EMAIL_FROM = new Date('2026-10-19T16:00:00Z') // Tue 20 Oct 00:00 Bali

export type LastVariant = 'last_workshop' | 'last_meta_final_review' | 'last_meta_recorded' | 'hold_meta'
export function lastVariant(level: Level, now: Date): LastVariant {
  if (level !== 'builder') return 'last_workshop'
  if (now < META_DEADLINE_EMAIL_FROM) return 'hold_meta'
  if (now < META_DEADLINE_EMAIL_UNTIL) return 'last_meta_final_review'
  if (now < META_RECORDED_FROM) return 'hold_meta'
  return 'last_meta_recorded'
}

// ---------------------------------------------------------------- copy
// Every word below is waiting for Illy's approval of the FINAL text. Change copy
// here only, then re-render with `--render-dir` and show her the new version.

const FOOTER =
  "\n\n--\nYou're getting this because you grabbed a free gift from Joe Che. Unsubscribe any time: {unsubscribe_url}"

export const DAY_ZERO_PS: Record<'starter' | 'builder', string> = {
  starter:
    'P.S. New to building with AI? Start with my free demo. You watch beginners build a real website just by talking to AI, no code: {demo_link}',
  builder:
    'P.S. Already building with Claude Code? I teach how to run your Meta ads through it. Claude drafts the campaign, creates it paused, and nothing spends a dollar until you say go: {meta_link}',
}

export const DM_LEVEL_BUBBLES = [
  'Hey{name_part}, glad you grabbed it',
  'Quick question so I only send you stuff that fits',
  'Where are you with AI right now?',
  '1 just getting started\n2 I use ChatGPT or Claude most days\n3 I build with Claude Code or agents',
  'Just reply with the number',
]

export const DM_ACK_BUBBLES = ["Got it, thank you", "I'll email you one quick win for where you're at"]

type Template = { subject: string; body: string }

export const QUICKWIN: Record<Level, Template> = {
  starter: {
    subject: 'One thing to try with AI today',
    body: `Hi {first_name},

Most people use AI like a search engine. They ask it a question and get an answer. The real jump is when it does a job for you.

Here's one to try today. Think of an email you've been putting off answering. Open ChatGPT or Claude, paste it in, and type:

"Write a short, kind reply to this in my voice. Ask me two questions first if you need to."

Ten minutes, and the thing you've been avoiding is done.

If you want to see how far that goes, I made a free demo where beginners build a real website just by talking to AI. No code: {demo_link}

Hit reply and tell me how it went. I read these.

Joe`,
  },
  everyday: {
    subject: 'Stop explaining yourself to AI every time',
    body: `Hi {first_name},

If you use ChatGPT or Claude most days, you probably explain who you are and what you want at the start of every chat. That's the slow part.

Write it once instead:
- who you are and what you sell
- who your customers are
- how you like to sound (paste two emails you wrote yourself)

In ChatGPT, put it in Settings, Personalization, Custom instructions. In Claude, make a Project and paste it into the project instructions. Now every chat starts already knowing you.

The next step after that is having AI build things for you, not just write. My free demo shows beginners building a real website just by talking to AI: {demo_link}

Hit reply and tell me what you use AI for most. I read these.

Joe`,
  },
  builder: {
    subject: 'Make Claude Code check its own work',
    body: `Hi {first_name},

The biggest time sink I see with Claude Code is not the building. It's the back and forth when it says "done" and it isn't.

Add this line to the end of every task you give it:

"Before you say done, run it, show me the output, and fix anything that fails."

It sounds small. It cuts most of the "that didn't work" round trips, because it tests its own work before it hands it back.

If you have something to sell, the next thing worth building is your ads. I teach how to run Meta ads through Claude Code. It drafts the campaign, creates it paused, and nothing spends a dollar until you say go: {meta_link}

Hit reply and tell me what you're building. I read these.

Joe`,
  },
}

export const LAST: Record<Exclude<LastVariant, 'hold_meta'>, Template> = {
  last_workshop: {
    // Hormozi rewrite approved by Illy 17 Oct: one ask, proof, value stack, "last email" at the end.
    // 72h bonus (Illy 17 Oct "lets add it"): {bonus_link} is a per-person signed checkout link
    // (workshop + Get Found kit as its own $0 price) that the checkout refuses after 72h.
    subject: 'Your website, without paying anyone',
    body: `Hi {first_name},

Most people I talk to either paid someone thousands for their website, or pay Wix or Squarespace every month. I was paying $168 a month for my Wix.

In my Website Workshop you build your own site just by talking to AI, then put it live on your own domain. Here's one a member built: theartoftantra.com

Here is what you get for $67, once:
- Both sessions recorded. Start tonight, go at your own pace.
- Your Web Designer Agent and every prompt, ready to copy.
- Change your site any time, without paying anyone.

If you do both sessions and your site is not live, I refund every cent and you keep everything you built.

Get it in the next 72 hours and I'll add my Get Found on Google and ChatGPT kit for free. It normally costs $47. It gets your new site listed on Google and Bing so people (and ChatGPT) can find you by your name and your service.

Get instant access, kit included: {bonus_link}

That link works for 72 hours. This is my last email about it.

Joe`,
  },
  last_meta_final_review: {
    subject: 'Last live session is Monday 2 November',
    body: `Hi {first_name},

Quick heads up. My Meta Ads with Claude Code course has one live session left: the Final Review, Monday 2 November, 7pm Bali time (6am New York, 11am London). That's where we look at real campaign numbers live and decide what to pause and what to scale.

Join before then and you get Sessions 1 to 3 as replays plus that last live session. After 2 November it's recorded only.

It's $397, or two payments of $199: {meta_link}

It's built for people who already have an offer and a page to send traffic to. If that's not you yet, skip this one.

Joe`,
  },
  last_meta_recorded: {
    subject: 'Your Meta ads, run through Claude Code',
    body: `Hi {first_name},

Last one from me on this.

My Meta Ads with Claude Code course is now a recorded course: all four sessions, the guides, and the agent I use to run my own ads. You draft a campaign by talking to Claude Code, it gets created paused, and nothing spends a dollar until you say go.

It's $397, or two payments of $199: {meta_link}

It's built for people who already have an offer and a page to send traffic to. If that's not you yet, skip this one.

Joe`,
  },
}

export type RenderVars = { first_name?: string; unsubscribe_url?: string; name?: string; bonus_link?: string }

/** How long the day 5-7 workshop bonus link works. The email text says 72 hours. */
export const BONUS_TTL_HOURS = 72

function fill(s: string, vars: Record<string, string>): string {
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m))
}

function baseVars(v: RenderVars): Record<string, string> {
  return {
    first_name: v.first_name || '',
    unsubscribe_url: v.unsubscribe_url || '',
    demo_link: LINKS.demo,
    workshop_link: LINKS.workshop,
    meta_link: LINKS.metaAds,
    ...(v.bonus_link ? { bonus_link: v.bonus_link } : {}),
  }
}

export function renderTemplate(t: Template, v: RenderVars): { subject: string; text: string } {
  let body = t.body
  if (!v.first_name) body = body.replace('Hi {first_name},', 'Hi,')
  const text = fill(body, baseVars(v)) + (v.unsubscribe_url ? fill(FOOTER, baseVars(v)) : '')
  if (/\{\w+\}/.test(text)) throw new Error(`Unfilled placeholder in "${t.subject}"`)
  if (text.includes('—') || t.subject.includes('—')) throw new Error('Em dash in copy')
  return { subject: t.subject, text }
}

export function renderQuickwin(level: Level, v: RenderVars) {
  return renderTemplate(QUICKWIN[level], v)
}

export function renderLast(variant: Exclude<LastVariant, 'hold_meta'>, v: RenderVars) {
  return renderTemplate(LAST[variant], v)
}

export function renderDmLevel(name?: string): string[] {
  const clean = String(name || '').trim().split(/\s+/)[0] || ''
  return DM_LEVEL_BUBBLES.map((b) => b.replace('{name_part}', clean ? ` ${clean}` : ''))
}

/** Day-0 P.S. for /api/lead-magnet. Null when the gift should not carry one. */
export function dayZeroPs(source: string): { text: string; html: string } | null {
  if (!source || NO_PS_SOURCES.has(source) || isSalesKeywordSource(source)) return null
  const raw = DAY_ZERO_PS[levelFromSource(source) === 'builder' ? 'builder' : 'starter']
  const text = fill(raw, baseVars({}))
  const link = levelFromSource(source) === 'builder' ? LINKS.metaAds : LINKS.demo
  const html = `<p style="margin-top:20px;">${text
    .replace(link, `<a href="${link}" style="color:#6f5cc4;font-weight:bold;">${link.replace('https://', '')}</a>`)}</p>`
  return { text, html }
}

/** Plain text to simple HTML: paragraphs, line breaks, clickable links (house pretty-light format). */
export function toHtml(text: string): string {
  const escape = (v: string) => v.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!)
  const paras = text.split(/\n\s*\n/).filter(Boolean).map((paragraph) => {
    let out = ''
    let offset = 0
    for (const match of paragraph.matchAll(/https?:\/\/[^\s<>"']+/g)) {
      const url = match[0].replace(/[.,!?;:)]+$/, '')
      out += escape(paragraph.slice(offset, match.index))
      out += `<a href="${escape(url)}" style="color:#6f5cc4;font-weight:bold;">${escape(url)}</a>`
      offset = (match.index ?? 0) + url.length
    }
    return `<p>${(out + escape(paragraph.slice(offset))).replace(/\n/g, '<br>')}</p>`
  })
  return `<div style="font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.7;color:#2a2536;max-width:560px;">\n${paras.join('\n')}\n</div>`
}

// ---------------------------------------------------------------- planning

export type Lead = { email: string; lead_source: string; first_name?: string | null; created_at?: string; updated_at?: string }
export type Subscriber = {
  id: string
  ig_username?: string | null
  name?: string | null
  ig_last_interaction?: string | null
  last_input_text?: string | null
}
export type SentRow = { email: string; step: Step; sent_at: string; level?: Level | null; detail?: Record<string, unknown> | null }

export type PlanInput = {
  leads: Lead[]
  sent?: SentRow[]
  /** email -> ManyChat subscriber, only for people found on Instagram */
  subscribers?: Map<string, Subscriber>
  /** email -> latest AI Capability Levels quiz score */
  quizScores?: Map<string, number>
  /** emails that entered the Website Workshop funnel (demo / checkout form) */
  inWorkshopFunnel?: Iterable<string>
  suppressed?: Iterable<string>
  /** participants, Stripe buyers: customers are Joe's, never sold to here */
  customers?: Iterable<string>
  /** close-circle guard blocks/holds and the do-not-contact list */
  blocked?: Iterable<string>
  /** wrote to joe@ by email since the gift: a human is talking to them */
  repliedByEmail?: Iterable<string>
  /** Leads who grabbed the gift before this never enter the sequence. */
  startAt: Date
  now?: Date
}

export type DueItem = {
  email: string
  step: Step
  level: Level
  first_name: string
  source: string
  subscriber_id?: string
  ig_username?: string | null
  variant?: Exclude<LastVariant, 'hold_meta'>
  reply_text?: string
}

function firstName(raw: string | null | undefined): string {
  const w = String(raw || '').trim().split(/\s+/)[0] || ''
  if (!w || /[@\d]/.test(w) || w.length > 30) return ''
  return w.charAt(0).toUpperCase() + w.slice(1)
}

export function planFollowups(input: PlanInput): { due: DueItem[]; skipped: Record<string, number> } {
  const now = input.now ?? new Date()
  const set = (xs?: Iterable<string>) => new Set([...(xs || [])].map((e) => String(e).trim().toLowerCase()))
  const suppressed = set(input.suppressed)
  const customers = set(input.customers)
  const blocked = set(input.blocked)
  const replied = set(input.repliedByEmail)
  const inFunnel = set(input.inWorkshopFunnel)
  const sentBy = new Map<string, Map<Step, SentRow>>()
  for (const s of input.sent || []) {
    const e = String(s.email).toLowerCase()
    if (!sentBy.has(e)) sentBy.set(e, new Map())
    sentBy.get(e)!.set(s.step, s)
  }

  const skipped: Record<string, number> = {}
  const skip = (why: string) => { skipped[why] = (skipped[why] || 0) + 1 }
  const due: DueItem[] = []
  const seen = new Set<string>()

  for (const lead of input.leads) {
    const email = String(lead.email || '').trim().toLowerCase()
    const source = String(lead.lead_source || '').trim()
    if (!email || seen.has(email)) continue
    seen.add(email)
    if (!source || isSalesKeywordSource(source)) { skip('not_free_gift'); continue }
    if (isTestEmail(email)) { skip('test_address'); continue }
    const grabbedAt = new Date(lead.updated_at || lead.created_at || 0)
    if (grabbedAt < input.startAt) { skip('before_start'); continue }
    if (suppressed.has(email)) { skip('unsubscribed'); continue }
    if (customers.has(email)) { skip('customer'); continue }
    if (blocked.has(email)) { skip('close_circle_or_dnc'); continue }

    const mine = sentBy.get(email) || new Map<Step, SentRow>()
    if (mine.has('dm_human')) { skip('talking_to_a_human'); continue }
    if (replied.has(email)) { skip('replied_by_email'); continue }

    const sub = input.subscribers?.get(email)
    const ageH = (now.getTime() - grabbedAt.getTime()) / HOUR
    const fromDm = mine.get('dm_ack')?.level ?? null
    const level: Level = (fromDm as Level | null) ?? levelFromQuizScore(input.quizScores?.get(email)) ?? levelFromSource(source)
    const base = { email, level, source, first_name: firstName(lead.first_name || sub?.name), subscriber_id: sub?.id, ig_username: sub?.ig_username }

    // ---- Instagram: the level question, then the answer.
    if (sub) {
      const dm = mine.get('dm_level')
      const lastIg = sub.ig_last_interaction ? new Date(sub.ig_last_interaction) : null
      if (!dm && lastIg && ageH < 30) {
        const sinceIgH = (now.getTime() - lastIg.getTime()) / HOUR
        if (sinceIgH >= DM_AFTER_HOURS && sinceIgH < DM_WINDOW_CLOSES_HOURS) {
          due.push({ ...base, step: 'dm_level' })
          continue
        }
        if (sinceIgH < DM_AFTER_HOURS) { skip('waiting_dm'); continue }
      }
      if (dm && !mine.has('dm_ack') && lastIg && lastIg.getTime() > new Date(dm.sent_at).getTime() + 5000) {
        const reply = (sub.last_input_text || '').trim()
        const answered = parseLevelReply(reply)
        const sinceReplyH = (now.getTime() - lastIg.getTime()) / HOUR
        if (answered && sinceReplyH < DM_WINDOW_CLOSES_HOURS) {
          due.push({ ...base, level: answered, step: 'dm_ack' })
          continue
        }
        if (!answered && reply) {
          due.push({ ...base, step: 'dm_human', reply_text: reply.slice(0, 500) })
          continue
        }
      }
    }

    // ---- Email: quick win, then the last one.
    if (inFunnel.has(email) && level !== 'builder') { skip('in_workshop_funnel'); continue }
    const qw = mine.get('email_quickwin')
    if (!qw) {
      if (ageH < QUICKWIN_AFTER_HOURS) { skip('waiting_quickwin'); continue }
      if (ageH > QUICKWIN_TOO_LATE_HOURS) { skip('quickwin_too_late'); continue }
      due.push({ ...base, step: 'email_quickwin' })
      continue
    }
    if (mine.has('email_last')) { skip('finished'); continue }
    const sinceQwH = (now.getTime() - new Date(qw.sent_at).getTime()) / HOUR
    if (ageH < LAST_AFTER_DAYS * 24 || sinceQwH < LAST_MIN_GAP_HOURS) { skip('waiting_last'); continue }
    if (ageH > LAST_TOO_LATE_DAYS * 24) { skip('last_too_late'); continue }
    const variant = lastVariant(level, now)
    if (variant === 'hold_meta') { skip('meta_date_hold'); continue }
    due.push({ ...base, step: 'email_last', variant })
  }
  return { due, skipped }
}
