import type { FormEvent } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Star, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

const inputClass =
  'w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-chili focus:outline-none transition-colors'
const labelClass = 'mb-1.5 block text-xs font-mono uppercase tracking-wider text-ink/60'

interface ReviewFormProps {
  onSuccess: () => void
}

export function ReviewForm({ onSuccess }: ReviewFormProps) {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', quote: '', rating: 5 })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!isSupabaseConfigured) {
      toast.error('Connect Supabase to start receiving real reviews (see README).')
      return
    }

    if (form.quote.trim().length < 10) {
      toast.error('Please write at least 10 characters for your review.')
      return
    }

    if (form.name.trim().length < 2) {
      toast.error('Please enter your name.')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.from('testimonials').insert({
      name: form.name.trim(),
      quote: form.quote.trim(),
      photo_url: '',
      rating: form.rating,
      order_index: 0,
      is_active: true,
    })
    setSubmitting(false)

    if (error) {
      console.error('Review submission error:', error)
      toast.error('Something went wrong. Please try again.')
      return
    }

    setDone(true)
    setForm({ name: '', quote: '', rating: 5 })
    onSuccess()
  }

  if (done) {
    return (
      <div className="flex flex-col items-center rounded-2xl border-2 border-ink bg-white p-8 text-center">
        <CheckCircle2 size={48} className="text-chili mb-4" />
        <h3 className="font-display text-2xl text-ink mb-2">Review submitted!</h3>
        <p className="text-ink/60 mb-6 text-sm">Thanks for sharing your experience with City Events!</p>
        <Button variant="secondary" onClick={() => setDone(false)}>Submit another review</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>Your Name</label>
        <input
          required
          className={inputClass}
          placeholder="e.g. Priya Sharma"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          maxLength={60}
        />
      </div>

      <div>
        <label className={labelClass}>Your Rating</label>
        <div className="flex gap-1 items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setForm({ ...form, rating: i + 1 })}
              className="p-1 transition-transform hover:scale-110"
              aria-label={`Rate ${i + 1} star${i > 0 ? 's' : ''}`}
            >
              <Star
                size={28}
                className={
                  i < form.rating
                    ? 'fill-gold text-gold'
                    : 'text-ink/20 hover:text-ink/40'
                }
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Your Review</label>
        <textarea
          required
          rows={4}
          className={inputClass}
          placeholder="Tell us about your experience at a City Events night…"
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
          maxLength={500}
        />
        <p className="mt-1 text-xs text-ink/40 text-right">{form.quote.length}/500</p>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Review'}
      </Button>
    </form>
  )
}
