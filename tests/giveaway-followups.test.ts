import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DM_ACK_BUBBLES, LAST, QUICKWIN, dayZeroPs, lastVariant, levelFromQuizScore, levelFromSource, parseLevelReply,
  planFollowups, renderDmLevel, renderLast, renderQuickwin, type Lead, type SentRow, type Subscriber,
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
  assert.match(dayZeroPs('lead-machine')!.text, /website-workshop\/demo/)
  assert.match(dayZeroPs('guardog')!.text, /meta-ads-with-claude-code/)
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
  assert.equal(after.skipped.finished, 1)
})

test('switching on never emails old leads, sales keywords or test addresses', () => {
  const r = plan({ leads: [lead('old@x.com', 200), lead('kw@x.com', 50, 'kw-book'), lead('delivered@resend.dev', 50)], startAt: new Date(ago(150)) })
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
