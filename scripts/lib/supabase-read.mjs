import { setTimeout as sleep } from 'node:timers/promises'

// Only idempotent reads use this helper. Never retry send claims or writes here.
const RETRYABLE = new Set([408, 429, 500, 502, 503, 504])
const DELAYS = [1000, 2000, 4000]

export async function readSupabaseJson(request, table, { wait = sleep } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      // The deadline covers headers AND body; body transport failures also retry.
      const res = await request(AbortSignal.timeout(30000))
      if (res.ok) return await res.json()
      if (RETRYABLE.has(res.status) && attempt < DELAYS.length) {
        await res.body?.cancel()
      } else {
        throw new Error(`Supabase ${table} ${res.status}: ${(await res.text()).slice(0, 200)}`)
      }
    } catch (err) {
      if (attempt >= DELAYS.length || !['TypeError', 'TimeoutError', 'AbortError'].includes(err?.name)) throw err
    }
    await wait(DELAYS[attempt])
  }
}
