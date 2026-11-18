import { setTimeout as sleep } from 'node:timers/promises'

// Only idempotent reads use this helper. Never retry send claims or writes here.
const RETRYABLE = new Set([408, 429, 500, 502, 503, 504])
const DELAYS = [1000, 2000, 4000]

export async function readSupabaseJson(request, table, { wait = sleep } = {}) {
  for (let attempt = 0; ; attempt++) {
    let res
    try {
      // Each attempt has its own deadline; a stalled upstream cannot hang cron.
      res = await request(AbortSignal.timeout(30000))
    } catch (err) {
      if (attempt >= DELAYS.length || !['TypeError', 'TimeoutError', 'AbortError'].includes(err?.name)) throw err
      await wait(DELAYS[attempt])
      continue
    }
    if (res.ok) return res.json()
    if (RETRYABLE.has(res.status) && attempt < DELAYS.length) {
      await res.body?.cancel()
      await wait(DELAYS[attempt])
      continue
    }
    throw new Error(`Supabase ${table} ${res.status}: ${(await res.text()).slice(0, 200)}`)
  }
}
