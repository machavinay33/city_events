import type { FormEvent } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

const inputClass =
  'w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-chili focus:outline-none transition-colors'
const labelClass = 'mb-1.5 block text-xs font-mono uppercase tracking-wider text-ink/60'

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', additional_requirements: '' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!isSupabaseConfigured) {
      toast.error('Connect Supabase to start receiving real messages (see README).')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.from('bookings').insert({
      full_name: form.full_name,
      phone: form.phone,
      email: form.email,
      event_type: 'General Enquiry',
      additional_requirements: form.additional_requirements,
    })
    setSubmitting(false)

    if (error) {
      toast.error('Something went wrong. Please try again.')
      return
    }
    setDone(true)
    setForm({ full_name: '', phone: '', email: '', additional_requirements: '' })
  }

  if (done) {
    return (
      <div className="flex flex-col items-center rounded-3xl border-2 border-ink bg-white p-10 text-center">
        <CheckCircle2 size={48} className="text-chili mb-4" />
        <h3 className="font-display text-2xl text-ink mb-2">Message sent!</h3>
        <p className="text-ink/60 mb-6">We usually reply within a day. You can also reach us directly on WhatsApp.</p>
        <Button variant="secondary" onClick={() => setDone(false)}>Send another message</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border-2 border-ink bg-white p-6 sm:p-8">
      <div>
        <label className={labelClass}>Full Name</label>
        <input required className={inputClass} value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Phone Number</label>
          <input required type="tel" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea required rows={4} className={inputClass} placeholder="Tell us what you're planning…" value={form.additional_requirements} onChange={(e) => setForm({ ...form, additional_requirements: e.target.value })} />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}
