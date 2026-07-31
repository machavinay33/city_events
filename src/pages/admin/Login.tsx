import type { FormEvent } from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { isSupabaseConfigured } from '@/lib/supabase'

export default function AdminLogin() {
  const { isAuthenticated, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (isAuthenticated) return <Navigate to="/admin" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate('/admin')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not sign in')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm rounded-3xl border-2 border-gold bg-paper p-8 shadow-ticket">
        <div className="mb-6 flex flex-col items-center text-center">
          <img src="/assets/logo/city-events-logo.jpeg" alt="City Events" className="h-14 w-14 rounded-xl border-2 border-ink object-cover mb-3" />
          <h1 className="font-display text-2xl text-ink">Admin Sign In</h1>
          <p className="text-sm text-ink/60 mt-1">Manage the City Events website</p>
        </div>

        {!isSupabaseConfigured && (
          <p className="mb-4 rounded-xl bg-chili/10 border border-chili/30 p-3 text-xs text-chili">
            Supabase isn't connected yet — add your project keys to .env first.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-ink/60">Email</label>
            <input
              required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-3 text-sm focus:border-chili focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-ink/60">Password</label>
            <input
              required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-3 text-sm focus:border-chili focus:outline-none"
            />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>
        <p className="mt-5 text-center text-xs text-ink/40">
          Admins are created in Supabase → Authentication → Users, not on this page.
        </p>
      </div>
    </div>
  )
}
