import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Search, X } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { supabase } from '@/lib/supabase'
import type { Booking, BookingStatus } from '@/types'
import { formatDate } from '@/lib/utils'

const STATUSES: BookingStatus[] = ['new', 'contacted', 'confirmed', 'completed', 'cancelled']
const STATUS_COLORS: Record<BookingStatus, string> = {
  new: 'bg-gold-100 text-ink',
  contacted: 'bg-ink/10 text-ink',
  confirmed: 'bg-[#25D366]/20 text-[#1b7a43]',
  completed: 'bg-ink text-gold',
  cancelled: 'bg-chili/15 text-chili',
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all')
  const [selected, setSelected] = useState<Booking | null>(null)

  async function load() {
    const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
    setBookings((data ?? []) as Booking[])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const filtered = bookings.filter((b) => {
    const matchesSearch = `${b.full_name} ${b.phone} ${b.email} ${b.service_title ?? ''}`.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter
    return matchesSearch && matchesStatus
  })

  async function updateStatus(id: string, status: BookingStatus) {
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
    if (error) return toast.error(error.message)
    load()
    if (selected?.id === id) setSelected({ ...selected, status })
  }

  async function saveNotes(id: string, notes: string) {
    const { error } = await supabase.from('bookings').update({ internal_notes: notes }).eq('id', id)
    if (error) return toast.error(error.message)
    toast.success('Notes saved')
    load()
  }

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl text-ink mb-1">Bookings</h1>
      <p className="text-ink/60 mb-6">Requests submitted through the "Book Service" form.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            placeholder="Search by name, phone, email or service…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border-2 border-ink/20 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-chili focus:outline-none"
          />
        </div>
        <select
          value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}
          className="rounded-xl border-2 border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-chili focus:outline-none"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <p className="text-ink/50">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-ink/50">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border-2 border-ink bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-ink text-left text-xs font-mono uppercase tracking-wider text-ink/50">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Event Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} onClick={() => setSelected(b)} className="border-b border-line last:border-0 cursor-pointer hover:bg-gold-50">
                  <td className="px-4 py-3 font-semibold text-ink">{b.full_name}</td>
                  <td className="px-4 py-3 text-ink/70">{b.service_title ?? b.event_type ?? '—'}</td>
                  <td className="px-4 py-3 text-ink/70">{b.event_date ? formatDate(b.event_date) : '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                  </td>
                  <td className="px-4 py-3 text-ink/50">{formatDate(b.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-ink bg-paper p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl">{selected.full_name}</h3>
              <button onClick={() => setSelected(null)}><X size={20} /></button>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm mb-5">
              <div><dt className="text-ink/50 text-xs">Phone</dt><dd className="font-semibold">{selected.phone}</dd></div>
              <div><dt className="text-ink/50 text-xs">Email</dt><dd className="font-semibold break-all">{selected.email}</dd></div>
              <div><dt className="text-ink/50 text-xs">Service</dt><dd className="font-semibold">{selected.service_title ?? '—'}</dd></div>
              <div><dt className="text-ink/50 text-xs">Event Type</dt><dd className="font-semibold">{selected.event_type ?? '—'}</dd></div>
              <div><dt className="text-ink/50 text-xs">Event Date</dt><dd className="font-semibold">{selected.event_date ? formatDate(selected.event_date) : '—'}</dd></div>
              <div><dt className="text-ink/50 text-xs">Preferred Time</dt><dd className="font-semibold">{selected.preferred_time ?? '—'}</dd></div>
              <div><dt className="text-ink/50 text-xs">Location</dt><dd className="font-semibold">{selected.event_location ?? '—'}</dd></div>
              <div><dt className="text-ink/50 text-xs">Audience</dt><dd className="font-semibold">{selected.audience_size ?? '—'}</dd></div>
              <div><dt className="text-ink/50 text-xs">Budget</dt><dd className="font-semibold">{selected.budget ?? '—'}</dd></div>
            </dl>
            {selected.additional_requirements && (
              <div className="mb-5">
                <p className="text-xs text-ink/50 mb-1">Additional Requirements</p>
                <p className="text-sm">{selected.additional_requirements}</p>
              </div>
            )}
            <div className="mb-5">
              <p className="text-xs font-mono uppercase tracking-wider text-ink/60 mb-2">Status</p>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s} onClick={() => updateStatus(selected.id, s)}
                    className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase border-2 ${selected.status === s ? 'border-ink bg-ink text-gold' : 'border-ink/20 text-ink/60'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-ink/60 mb-2">Internal Notes</p>
              <textarea
                rows={3}
                defaultValue={selected.internal_notes}
                onBlur={(e) => saveNotes(selected.id, e.target.value)}
                className="w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-3 text-sm focus:border-chili focus:outline-none"
                placeholder="Notes only visible to admins…"
              />
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
