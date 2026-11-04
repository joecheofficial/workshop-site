import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | undefined

function getClient(): SupabaseClient {
  client ??= createClient(
    (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL)!,
    process.env.SUPABASE_SECRET_KEY!,
  )
  return client
}

// Created on first use, not on import, so preview builds work without the
// production-only Supabase env vars (only production has them on Vercel).
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const instance = getClient()
    const value = Reflect.get(instance, prop)
    return typeof value === 'function' ? value.bind(instance) : value
  },
})
