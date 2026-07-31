import type { FormEvent } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { CheckCircle2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import type { EventItem } from '@/types'

const inputClass =
  'w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-chili focus:outline-none transition-colors'
const labelClass = 'mb-1.5 block text-xs font-mono uppercase tracking-wider text-ink/60'

export function RegisterModal({ event, onClose }: { event: EventItem | null; onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', attendees: 1, notes: '' })

  function handleClose() {
    onClose()
    setTimeout(() => setDone(false), 300)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!event) return

    if (!isSupabaseConfigured) {
      toast.error('Connect Supabase to start collecting real registrations (see README).')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.from('event_registrations').insert({
      event_id: event.id,
      event_title: event.title,
      full_name: form.full_name,
      phone: form.phone,
      email: form.email,
      attendees: form.attendees,
      notes: form.notes,
    })
    setSubmitting(false)

    if (error) {
      toast.error('Something went wrong. Please try again.')
      return
    }
    setDone(true)
    setForm({ full_name: '', phone: '', email: '', attendees: 1, notes: '' })
  }

  return (
    <Modal open={Boolean(event)} onClose={handleClose} title={event ? `Register — ${event.title}` : 'Register'}>
      {done ? (
        <div className="flex flex-col items-center py-8 text-center">
          <CheckCircle2 size={48} className="text-chili mb-4" />
          <h4 className="font-display text-2xl text-ink mb-2">You're on the list!</h4>
          <p className="text-ink/60 mb-6">We'll see you at {event?.venue}. Keep an eye on WhatsApp/email for reminders.</p>
          <Button variant="secondary" onClick={handleClose}>Done</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input required className={inputClass} value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <label className={labelClass}>Number of Attendees</label>
            <input required type="number" min={1} className={inputClass} value={form.attendees} onChange={(e) => setForm({ ...form, attendees: Number(e.target.value) })} />
          </div>
          <div>
            <label className={labelClass}>Notes (optional)</label>
            <textarea rows={3} className={inputClass} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Confirm Registration'}
          </Button>
        </form>
      )}
    </Modal>
  )
}
