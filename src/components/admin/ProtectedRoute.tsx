import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { isSupabaseConfigured } from '@/lib/supabase'

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated, loading } = useAuth()

  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-center text-paper">
        <div>
          <p className="font-display text-2xl mb-2">Supabase isn't connected yet</p>
          <p className="text-paper/60 max-w-md mx-auto">
            Add your Supabase URL and anon key to .env, run supabase/schema.sql, then create an admin user
            under Authentication → Users to unlock this dashboard.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-gold">
        <p className="font-mono text-sm uppercase tracking-widest">Checking session…</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
