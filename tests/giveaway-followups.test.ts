import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DM_ACK_BUBBLES, LAST, QUICKWIN, dayZeroPs, lastVariant, levelFromQuizScore, levelFromSource, parseLevelReply,
  planFollowups, renderDmLevel, renderLast, renderQuickwin, STEPS, renderGift2, renderLive, GIFTS, LIVE_EVENTS,
  SALES_DAY2, SALES_LAST, renderSalesDay2, renderSalesDay5, toHtml,
  type Lead, type SentRow, type Subscriber,
} from '../src/lib/giveaway-followups'

const H = 3600 * 1000
const START = new Date('2026-10-18T00:00:00Z')
const NOW = new Date('2026-10-25T00:00:00Z')
const ago = (h: number) => new Date(NOW.getTime() - h * H).toISOString()
const lead = (email: string, hoursAgo: number, source = 'lead-machine'): Lead => ({ email, lead_source: source, updated_at: ago(hoursAgo) })
const plan = (over: Partial<Parameters<typeof planFollowups>[0]>) => planFollowups({ leads: [], startAt: START, now: NOW, ...over })

test('every email renders with no placeholders, no em dashes, and an unsubscribe line', () => {
  const v = { first_name: 'Rick', unsubscribe_url: 'https://x/u', bonus_link: 'https://b/l' }
  for (const level of Object.keys(QUICKWIN) as (keyof typeof QUICKWIN)[]) {
    const { text } = renderQuickwin(level, v)
    assert.match(text, /^Hi Rick,/)
    assert.match(text, /Unsubscribe any time: https:\/\/x\/u/)
  }
  for (const variant of Object.keys(LAST) as (keyof typeof LAST)[]) assert.match(renderLast(variant, v).text, /Joe/)
  assert.match(renderQuickwin('starter', {}).text, /^Hi,/)
  for (const b of [...renderDmLevel('Rick'), ...DM_ACK_BUBBLES]) assert.ok(!b.includes('—'))
})

test('free emails never quote the price of a paid product except the offer itself', () => {
  for (const level of ['starter', 'everyday'] as const) assert.doesNotMatch(renderQuickwin(level, {}).text, /\$\d/)
})

test('copy never says how long the demo or a session is (Illy, 17 Oct)', () => {
  const v = { first_name: 'Rick', unsubscribe_url: 'https://x/u', bonus_link: 'https://b/l' }
  const all = [
    ...(Object.keys(QUICKWIN) as (keyof typeof QUICKWIN)[]).map((l) => renderQuickwin(l, v).text),
    ...(Object.keys(LAST) as (keyof typeof LAST)[]).map((k) => renderLast(k, v).text),
    dayZeroPs('lead-machine')!.text, dayZeroPs('tokens')!.text, ...renderDmLevel('Rick'), ...DM_ACK_BUBBLES,
    ...Object.values(GIFTS).flatMap((g) => (['starter', 'everyday', 'builder'] as const).map((l) => renderGift2(l, g, v).text)),
    ...LIVE_EVENTS.map((e) => renderLive(e, v).text),
    ...(Object.keys(SALES_DAY2) as (keyof typeof SALES_DAY2)[]).map((o) => renderSalesDay2(o, v).text),
    ...(Object.keys(SALES_LAST) as (keyof typeof SALES_LAST)[]).map((k) => renderSalesDay5(k, v).text),
  ]
  const duration = /(\d+|one|two|three|five|ten|fifteen|twenty|thirty)[\s-]*(min|minute|hour|hr)/i
  for (const text of all) {
    for (const sentence of text.split(/(?<=[.?!:])\s+|\n/)) {
      if (/demo|session/i.test(sentence)) assert.doesNotMatch(sentence, duration, sentence)
    }
  }
})

test('workshop last email carries the personal 72h bonus link and refuses to render without it', () => {
  const { text } = renderLast('last_workshop', { first_name: 'Rick', bonus_link: 'https://b/l' })
  assert.match(text, /kit included: https:\/\/b\/l/)
  assert.match(text, /72 hours/)
  assert.throws(() => renderLast('last_workshop', { first_name: 'Rick' }), /Unfilled placeholder/)
})

test('every link in every email is a Shlink short link, and the HTML footer shows one word', () => {
  const v = { first_name: 'Rick', unsubscribe_url: 'https://workshop.mastermindshq.business/api/unsubscribe?token=LONG.TOKEN', bonus_link: 'https://a.mastermindshq.business/fg-bonus-ab12cd' }
  const texts = [
    ...(Object.keys(QUICKWIN) as (keyof typeof QUICKWIN)[]).map((l) => renderQuickwin(l, v).text),
    ...(Object.keys(LAST) as (keyof typeof LAST)[]).map((k) => renderLast(k, v).text),
    ...Object.values(GIFTS).map((g) => renderGift2('starter', g, v).text),
    ...LIVE_EVENTS.map((e) => renderLive(e, v).text),
    ...(Object.keys(SALES_DAY2) as (keyof typeof SALES_DAY2)[]).map((o) => renderSalesDay2(o, v).text),
    ...(Object.keys(SALES_LAST) as (keyof typeof SALES_LAST)[]).map((k) => renderSalesDay5(k, v).text),
  ]
  for (const text of texts) {
    const body = text.split('\n--\n')[0]
    for (const url of body.match(/https?:\/\/\S+/g) || []) assert.match(url, /^https:\/\/a\.mastermindshq\.business\/fg-/, url)
    const html = toHtml(text)
    assert.doesNotMatch(html, />https:\/\/workshop\.mastermindshq\.business\/api\/unsubscribe/)
    assert.match(html, />Unsubscribe<\/a> any time\./)
  }
})

test('each email step uses its own slugs, so clicks count per email', () => {
  const v = { first_name: 'R', bonus_link: 'https://a.mastermindshq.business/fg-bonus-1' }
  assert.match(renderQuickwin('starter', v).text, /fg-q-demo/)
  assert.match(renderQuickwin('builder', v).text, /fg-q-meta/)
  assert.match(renderLast('last_meta_final_review', v).text, /fg-l-meta/)
  assert.match(renderSalesDay5('last_meta_final_review', v).text, /fg-s5-meta/)
  assert.match(renderSalesDay5('sales_last_book', v).text, /fg-s5-book/)
  assert.match(renderGift2('starter', GIFTS['lead-machine'], v).text, /fg-gift-lead-machine[\s\S]*fg-g-demo/)
  assert.match(renderLive(LIVE_EVENTS[0], v).text, /fg-v-meta/)
})

test('DM greeting uses the first name only, or none', () => {
  assert.equal(renderDmLevel('rick visca')[0], 'Hey rick, glad you grabbed it')
  assert.equal(renderDmLevel('')[0], 'Hey, glad you grabbed it')
})

test('level replies: only a bare 1, 2 or 3 counts', () => {
  assert.equal(parseLevelReply('1'), 'starter')
  assert.equal(parseLevelReply(' 2. '), 'everyday')
  assert.equal(parseLevelReply('#3'), 'builder')
  assert.equal(parseLevelReply('3 but I am stuck on hosting'), null)
  assert.equal(parseLevelReply('hi joe'), null)
})

test('levels from gift and quiz score', () => {
  assert.equal(levelFromSource('tokens'), 'builder')
  assert.equal(levelFromSource('lead-machine'), 'starter')
  assert.equal(levelFromQuizScore(6), 'starter')
  assert.equal(levelFromQuizScore(15), 'everyday')
  assert.equal(levelFromQuizScore(25), 'builder')
  assert.equal(levelFromQuizScore(null), null)
})

test('day 0 P.S.: starter gifts get the demo, builder gifts the Meta course, quiz and sales keywords none', () => {
  assert.match(dayZeroPs('lead-machine')!.text, /a\.mastermindshq\.business\/fg-p-demo/)
  assert.match(dayZeroPs('guardog')!.text, /a\.mastermindshq\.business\/fg-p-meta/)
  assert.equal(dayZeroPs('ai-levels-quiz'), null)
  assert.equal(dayZeroPs('kw-book'), null)
})

test('Meta Ads deadline email is only sent while the deadline is true', () => {
  assert.equal(lastVariant('builder', new Date('2026-10-19T10:00:00Z')), 'hold_meta')
  assert.equal(lastVariant('builder', new Date('2026-10-25T00:00:00Z')), 'last_meta_final_review')
  assert.equal(lastVariant('builder', new Date('2026-11-02T05:00:00Z')), 'hold_meta')
  assert.equal(lastVariant('builder', new Date('2026-11-03T01:00:00Z')), 'last_meta_recorded')
  assert.equal(lastVariant('everyday', NOW), 'last_workshop')
})

test('quick win at 48h, last email at day 5, then nothing', () => {
  assert.equal(plan({ leads: [lead('a@x.com', 30)] }).due.length, 0)
  const qw = plan({ leads: [lead('a@x.com', 50)] }).due
  assert.deepEqual(qw.map((d) => [d.step, d.level]), [['email_quickwin', 'starter']])
  const sentQw: SentRow[] = [{ email: 'a@x.com', step: 'email_quickwin', sent_at: ago(70) }]
  assert.equal(plan({ leads: [lead('a@x.com', 100)], sent: sentQw }).due.length, 0)
  const last = plan({ leads: [lead('a@x.com', 121)], sent: sentQw }).due
  assert.deepEqual(last.map((d) => [d.step, d.variant]), [['email_last', 'last_workshop']])
  const done: SentRow[] = [...sentQw, { email: 'a@x.com', step: 'email_last', sent_at: ago(1) }]
  const after = plan({ leads: [lead('a@x.com', 160)], sent: done })
  assert.equal(after.due.length, 0)
  assert.equal(after.skipped.waiting_gift2, 1)
})

const EARLY = new Date('2026-09-01T00:00:00Z')
const throughLast = (email: string): SentRow[] => [
  { email, step: 'email_quickwin', sent_at: ago(14 * 24 - 50), source: 'lead-machine' },
  { email, step: 'email_last', sent_at: ago(14 * 24 - 125) },
]

test('day 14 sends a gift they have not grabbed, for their level', () => {
  const r = plan({ startAt: EARLY, leads: [lead('a@x.com', 14 * 24 + 1)], sent: throughLast('a@x.com'), grabbedGifts: new Map([['a@x.com', new Set(['giveaway-hated-task-prompts'])]]) })
  assert.deepEqual(r.due.map((d) => [d.step, d.gift?.slug]), [['email_gift2', 'free-ai-tools']])
  const b = plan({ startAt: EARLY, leads: [lead('b@x.com', 14 * 24 + 1, 'tokens')], sent: throughLast('b@x.com') })
  assert.equal(b.due[0].gift?.slug, 'claude-md')
  const none = plan({ startAt: EARLY, leads: [lead('c@x.com', 14 * 24 + 1)], sent: throughLast('c@x.com'), grabbedGifts: new Map([['c@x.com', new Set(['hated-task-prompts', 'free-ai-tools'])]]) })
  assert.equal(none.skipped.gift2_none_left, 1)
})

test('clicking through to an offer or booking a call leaves the sequence', () => {
  const leads = [lead('a@x.com', 14 * 24 + 1), lead('b@x.com', 14 * 24 + 1), lead('c@x.com', 14 * 24 + 1)]
  const sent = [...throughLast('a@x.com'), ...throughLast('b@x.com'), ...throughLast('c@x.com')]
  const r = plan({ startAt: EARLY, leads, sent, clickedOffer: ['a@x.com'], booked: ['b@x.com'], inWorkshopFunnel: ['c@x.com'] })
  assert.equal(r.due.length, 0)
  assert.deepEqual(r.skipped, { clicked_offer: 2, booked: 1 })
})

test('day 30 needs a sign of life AND a real live date in the window, else it is skipped', () => {
  const event = { id: 'e', startsAt: new Date(NOW.getTime() + 7 * 24 * H).toISOString(), levels: ['starter' as const], subject: 'Live', intro: 'Come.', when: 'Monday', link: 'https://e' }
  const base = (email: string, extra: SentRow[] = []): SentRow[] => [
    { email, step: 'email_quickwin', sent_at: ago(30 * 24 - 50) },
    { email, step: 'email_last', sent_at: ago(30 * 24 - 125) },
    { email, step: 'email_gift2', sent_at: ago(30 * 24 - 14 * 24) },
    ...extra,
  ]
  // grabbed at day 0 only, never answered the DM: no sign of life
  assert.equal(plan({ startAt: EARLY, leads: [lead('a@x.com', 30 * 24 + 1)], sent: base('a@x.com'), liveEvents: [event] }).skipped.live_no_sign_of_life, 1)
  // answered the DM: invited
  const ack: SentRow = { email: 'b@x.com', step: 'dm_ack', sent_at: ago(30 * 24 - 25), level: 'starter' }
  const yes = plan({ startAt: EARLY, leads: [lead('b@x.com', 30 * 24 + 1)], sent: base('b@x.com', [ack]), liveEvents: [event] }).due
  assert.deepEqual(yes.map((d) => [d.step, d.event?.id]), [['email_live', 'e']])
  // no real date in the window: skipped, never invented
  assert.equal(plan({ startAt: EARLY, leads: [lead('b@x.com', 30 * 24 + 1)], sent: base('b@x.com', [ack]), liveEvents: [] }).skipped.live_no_real_date, 1)
  // after day 30: nothing, ever
  const all = base('b@x.com', [ack, { email: 'b@x.com', step: 'email_live', sent_at: ago(1) }])
  assert.equal(plan({ startAt: EARLY, leads: [lead('b@x.com', 32 * 24)], sent: all, liveEvents: [event] }).skipped.finished, 1)
})

test('cap: each track has at most 4 follow-up emails (5 with the delivery email) and one level DM', () => {
  const gift = STEPS.filter((s) => s.startsWith('email_'))
  const sales = [...STEPS.filter((s) => s.startsWith('sales_')), 'email_gift2', 'email_live']
  assert.equal(gift.length, 4)
  assert.equal(sales.length, 4)
  assert.deepEqual(STEPS.filter((s) => s.startsWith('dm_')), ['dm_level', 'dm_ack', 'dm_human'])
})

test('sales keywords: day 2 objection email for the offer they asked about, no DM', () => {
  const sub = new Map([['m@x.com', { id: '9', ig_last_interaction: ago(21) }]])
  const r = plan({ startAt: EARLY, leads: [lead('b@x.com', 50, 'kw-book'), lead('m@x.com', 50, 'kw-mastermind'), lead('t@x.com', 50, 'kw-team'), lead('w@x.com', 50, 'kw-build')], subscribers: sub })
  assert.deepEqual(r.due.map((d) => [d.email, d.step, d.offer]), [
    ['b@x.com', 'sales_day2', 'book'], ['m@x.com', 'sales_day2', 'mastermind'], ['t@x.com', 'sales_day2', 'meta'], ['w@x.com', 'sales_day2', 'workshop'],
  ])
  const early = plan({ startAt: EARLY, leads: [lead('m@x.com', 21, 'kw-mastermind')], subscribers: sub })
  assert.equal(early.due.length, 0)
  assert.equal(early.skipped.waiting_sales_day2, 1)
})

test('sales keywords: day 5 is the offer\'s own last email, Meta only on a true date, then the tail', () => {
  const d2 = (email: string): SentRow[] => [{ email, step: 'sales_day2', sent_at: ago(70) }]
  const r = plan({ startAt: EARLY, leads: ['kw-book', 'kw-mastermind', 'kw-meta', 'kw-build'].map((src, i) => lead(`${i}@x.com`, 121, src)), sent: [0, 1, 2, 3].flatMap((i) => d2(`${i}@x.com`)) })
  assert.deepEqual(r.due.map((d) => d.sales_variant), ['sales_last_book', 'sales_last_mastermind', 'last_meta_final_review', 'last_workshop'])
  const tail: SentRow[] = [...d2('b@x.com'), { email: 'b@x.com', step: 'sales_day5', sent_at: ago(14 * 24 - 125) }]
  const g = plan({ startAt: EARLY, leads: [lead('b@x.com', 14 * 24 + 1, 'kw-book')], sent: tail })
  assert.deepEqual(g.due.map((d) => [d.step, d.level, d.gift?.slug]), [['email_gift2', 'builder', 'claude-md']])
})

test('sales keywords: clicking through to checkout or booking a call ends it', () => {
  const r = plan({ startAt: EARLY, leads: [lead('a@x.com', 50, 'kw-meta'), lead('b@x.com', 50, 'kw-mastermind')], clickedOffer: ['a@x.com'], booked: ['b@x.com'] })
  assert.equal(r.due.length, 0)
  assert.deepEqual(r.skipped, { clicked_offer: 1, booked: 1 })
})

test('sales copy: no price in the Mastermind emails, one link that matches its offer', () => {
  for (const k of ['mastermind'] as const) assert.doesNotMatch(renderSalesDay2(k, {}).text, /\$\d|https?:/)
  assert.doesNotMatch(renderSalesDay5('sales_last_mastermind', {}).text, /\$\d|https?:/)
  assert.match(renderSalesDay2('book', {}).text, /a\.mastermindshq\.business\/fg-s2-book/)
  assert.match(renderSalesDay2('meta', {}).text, /a\.mastermindshq\.business\/fg-s2-meta/)
  assert.match(renderSalesDay2('workshop', {}).text, /a\.mastermindshq\.business\/fg-s2-workshop/)
  for (const o of Object.keys(SALES_DAY2) as (keyof typeof SALES_DAY2)[]) assert.doesNotMatch(renderSalesDay2(o, {}).text, /Your copy of/i)
})

test('switching on never emails old leads, sales keywords or test addresses', () => {
  const r = plan({ leads: [lead('old@x.com', 200), lead('kw@x.com', 50, 'kw-unknown'), lead('delivered@resend.dev', 50)], startAt: new Date(ago(150)) })
  assert.equal(r.due.length, 0)
  assert.equal(r.skipped.before_start, 1)
  assert.equal(r.skipped.not_free_gift, 1)
  assert.equal(r.skipped.test_address, 1)
})

test('unsubscribed, customers, close circle, email repliers and quiet late leads are skipped', () => {
  const leads = ['u', 'c', 'b', 'r'].map((n) => lead(`${n}@x.com`, 50))
  const r = plan({ leads, suppressed: ['u@x.com'], customers: ['c@x.com'], blocked: ['b@x.com'], repliedByEmail: ['r@x.com'] })
  assert.equal(r.due.length, 0)
  assert.deepEqual(r.skipped, { unsubscribed: 1, customer: 1, close_circle_or_dnc: 1, replied_by_email: 1 })
  assert.equal(plan({ leads: [lead('late@x.com', 100)] }).skipped.quickwin_too_late, 1)
})

test('Website Workshop funnel takes over starters, builders keep their Meta emails', () => {
  const r = plan({ leads: [lead('s@x.com', 50), lead('b@x.com', 50, 'tokens')], inWorkshopFunnel: ['s@x.com', 'b@x.com'] })
  assert.deepEqual(r.due.map((d) => d.email), ['b@x.com'])
})

test('DM goes out 20 to 23.5h after their last IG message, never outside the window', () => {
  const sub = (h: number): Subscriber => ({ id: '9', ig_username: 'rick', name: 'Rick', ig_last_interaction: ago(h) })
  const at = (h: number) => plan({ leads: [lead('a@x.com', h)], subscribers: new Map([['a@x.com', sub(h)]]) }).due.map((d) => d.step)
  assert.deepEqual(at(10), [])
  assert.deepEqual(at(21), ['dm_level'])
  assert.deepEqual(at(25), [])
})

test('a numbered answer gets the ack and sets the level; words go to a human and stop the bot', () => {
  const dm: SentRow[] = [{ email: 'a@x.com', step: 'dm_level', sent_at: ago(5) }]
  const withReply = (text: string): Map<string, Subscriber> => new Map([['a@x.com', { id: '9', ig_last_interaction: ago(1), last_input_text: text }]])
  const ack = plan({ leads: [lead('a@x.com', 26)], sent: dm, subscribers: withReply('3') }).due
  assert.deepEqual(ack.map((d) => [d.step, d.level]), [['dm_ack', 'builder']])
  const stale = plan({ leads: [lead('a@x.com', 26)], sent: dm, subscribers: withReply('a@x.com') }).due
  assert.deepEqual(stale.map((d) => [d.step, d.reply_text]), [['dm_human', '(their reply was not captured, read it in the DM thread)']])
  const human = plan({ leads: [lead('a@x.com', 26)], sent: dm, subscribers: withReply('I run a yoga studio') }).due
  assert.deepEqual(human.map((d) => d.step), ['dm_human'])
  const stopped = plan({ leads: [lead('a@x.com', 50)], sent: [...dm, { email: 'a@x.com', step: 'dm_human', sent_at: ago(20) }] })
  assert.equal(stopped.due.length, 0)
  // The DM answer beats the gift's level for the emails.
  const lvl = plan({ leads: [lead('a@x.com', 50)], sent: [...dm, { email: 'a@x.com', step: 'dm_ack', sent_at: ago(20), level: 'everyday' }] }).due
  assert.deepEqual(lvl.map((d) => [d.step, d.level]), [['email_quickwin', 'everyday']])
})

test('quiz score sets the level when there is no DM answer', () => {
  const r = plan({ leads: [lead('q@x.com', 50, 'ai-levels-quiz')], quizScores: new Map([['q@x.com', 28]]) })
  assert.equal(r.due[0].level, 'builder')
})
