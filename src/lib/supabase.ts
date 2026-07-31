import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// The app runs (with fallback/demo content) even before Supabase is configured,
// so pages don't hard-crash while someone is still filling in .env.
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured
  ? createClient<Database>(url, anonKey)
  : (null as unknown as ReturnType<typeof createClient<Database>>)

export function requireSupabase() {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.',
    )
  }
  return supabase
}
