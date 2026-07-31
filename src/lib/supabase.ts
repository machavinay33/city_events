import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// The app runs (with fallback/demo content) even before Supabase is configured,
// so pages don't hard-crash while someone is still filling in .env.
export const isSupabaseConfigured = Boolean(url && anonKey)

// Deliberately untyped (no generic Database param): a generic keyed by a
// loose `[key: string]: {...}` index signature makes supabase-js infer
// `never` for .insert()/.update() payloads. The app types its own data with
// src/types/index.ts on the way in and out, so this trade-off is fine.
export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey)
  : (null as unknown as ReturnType<typeof createClient>)

export function requireSupabase() {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.',
    )
  }
  return supabase
}
