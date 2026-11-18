import test from 'node:test'
import assert from 'node:assert/strict'
import { readSupabaseJson } from '../scripts/lib/supabase-read.mjs'

test('Supabase read recovers from the logged upstream 504', async () => {
  let calls = 0
  const delays: number[] = []
  const rows = [{ email: 'fixture@example.invalid' }]
  const result = await readSupabaseJson(async (signal: AbortSignal) => {
    assert.ok(signal instanceof AbortSignal)
    calls++
    return calls === 1 ? new Response('upstream request timeout', { status: 504 }) : Response.json(rows)
  }, 'leads', { wait: async (ms: number) => { delays.push(ms) } })
  assert.deepEqual(result, rows)
  assert.equal(calls, 2)
  assert.deepEqual(delays, [1000])
})

for (const status of [408, 429, 500, 502, 503, 504]) {
  test(`Supabase ${status} stops after four attempts and preserves the failure`, async () => {
    let calls = 0
    const delays: number[] = []
    await assert.rejects(readSupabaseJson(async () => {
      calls++
      return new Response('upstream unavailable', { status })
    }, 'leads', { wait: async (ms: number) => { delays.push(ms) } }), new RegExp(`Supabase leads ${status}: upstream unavailable`))
    assert.equal(calls, 4)
    assert.deepEqual(delays, [1000, 2000, 4000])
  })
}

for (const status of [400, 401, 403, 404]) {
  test(`Supabase ${status} fails closed without retry`, async () => {
    let calls = 0
    await assert.rejects(readSupabaseJson(async () => {
      calls++
      return new Response('refused', { status })
    }, 'leads', { wait: async () => { assert.fail('unexpected retry') } }), new RegExp(`Supabase leads ${status}`))
    assert.equal(calls, 1)
  })
}

for (const name of ['TypeError', 'TimeoutError', 'AbortError']) {
  test(`Supabase read recovers from ${name} with a fresh deadline`, async () => {
    const signals: AbortSignal[] = []
    assert.deepEqual(await readSupabaseJson(async (signal: AbortSignal) => {
      signals.push(signal)
      if (signals.length === 1) throw Object.assign(new Error('temporary transport failure'), { name })
      return Response.json([])
    }, 'leads', { wait: async () => {} }), [])
    assert.equal(signals.length, 2)
    assert.notEqual(signals[0], signals[1])
  })
}

test('invalid JSON fails closed without retry', async () => {
  let calls = 0
  await assert.rejects(readSupabaseJson(async () => {
    calls++
    return new Response('not JSON')
  }, 'leads', { wait: async () => { assert.fail('unexpected retry') } }), SyntaxError)
  assert.equal(calls, 1)
})
