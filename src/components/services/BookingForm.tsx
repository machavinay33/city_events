import type { FormEvent } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { CheckCircle2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import type { Service } from '@/types'

const inputClass =
  'w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-chili focus:outline-none transition-colors'
const labelClass = 'mb-1.5 block text-xs font-mono uppercase tracking-wider text-ink/60'

const EVENT_TYPES = ['Private Party', 'Cafe / Venue Night', 'Corporate', 'Wedding / Celebration', 'Community / Religious', 'Other']
const AUDIENCE_SIZES = ['Under 30', '30–75', '75–150', '150+']
const BUDGET_RANGES = ['Flexible', 'Under ₹10,000', '₹10,000–25,000', '₹25,000–50,000', '₹50,000+']

const initialForm = {
  full_name: '', phone: '', email: '', event_date: '', preferred_time: '',
  event_location: '', event_type: EVENT_TYPES[0], audience_size: AUDIENCE_SIZES[0],
  budget: BUDGET_RANGES[0], additional_requirements: '',
}

export function BookingModal({ service, onClose }: { service: Service | null; onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState(initialForm)

  function handleClose() {
    onClose()
    setTimeout(() => setDone(false), 300)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!service) return

    if (!isSupabaseConfigured) {
      toast.error('Connect Supabase to start receiving real bookings (see README).')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.from('bookings').insert({
      ...form,
      service_id: service.id,
      service_title: service.title,
      event_date: form.event_date || null,
      preferred_time: form.preferred_time || null,
    })
    setSubmitting(false)

    if (error) {
      toast.error('Something went wrong. Please try again.')
      return
    }
    setDone(true)
    setForm(initialForm)
  }

  return (
    <Modal open={Boolean(service)} onClose={handleClose} title={service ? `Book — ${service.title}` : 'Book Service'}>
      {done ? (
        <div className="flex flex-col items-center py-8 text-center">
          <CheckCircle2 size={48} className="text-chili mb-4" />
          <h4 className="font-display text-2xl text-ink mb-2">Request sent!</h4>
          <p className="text-ink/60 mb-6">We'll reach out on the number you shared to confirm details.</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Event Date</label>
              <input type="date" className={inputClass} value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Preferred Time</label>
              <input type="time" className={inputClass} value={form.preferred_time} onChange={(e) => setForm({ ...form, preferred_time: e.target.value })} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Event Location</label>
            <input required className={inputClass} placeholder="Venue / area in Nagpur" value={form.event_location} onChange={(e) => setForm({ ...form, event_location: e.target.value })} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Event Type</label>
              <select className={inputClass} value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })}>
                {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Expected Audience</label>
              <select className={inputClass} value={form.audience_size} onChange={(e) => setForm({ ...form, audience_size: e.target.value })}>
                {AUDIENCE_SIZES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Budget</label>
            <select className={inputClass} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
              {BUDGET_RANGES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Additional Requirements</label>
            <textarea rows={3} className={inputClass} value={form.additional_requirements} onChange={(e) => setForm({ ...form, additional_requirements: e.target.value })} />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send Booking Request'}
          </Button>
          <p className="text-center text-xs text-ink/40">No online payment — we'll confirm details with you directly.</p>
        </form>
      )}
    </Modal>
  )
}
