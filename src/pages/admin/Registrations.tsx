import { useEffect, useState } from 'react'
import { Search, Download } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import type { EventRegistration } from '@/types'
import { formatDate } from '@/lib/utils'

function toCSV(rows: EventRegistration[]) {
  const headers = ['Full Name', 'Phone', 'Email', 'Event', 'Attendees', 'Notes', 'Submitted']
  const lines = rows.map((r) =>
    [r.full_name, r.phone, r.email, r.event_title ?? '', r.attendees, r.notes, formatDate(r.created_at)]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(','),
  )
  return [headers.join(','), ...lines].join('\n')
}

export default function AdminRegistrations() {
  const [regs, setRegs] = useState<EventRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('event_registrations').select('*').order('created_at', { ascending: false })
      setRegs((data ?? []) as EventRegistration[])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = regs.filter((r) =>
    `${r.full_name} ${r.phone} ${r.email} ${r.event_title ?? ''}`.toLowerCase().includes(search.toLowerCase()),
  )

  function exportCSV() {
    const csv = toCSV(filtered)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `city-events-registrations-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-3xl text-ink">Event Registrations</h1>
        <Button variant="secondary" onClick={exportCSV} disabled={filtered.length === 0}>
          <Download size={16} /> Export CSV
        </Button>
      </div>
      <p className="text-ink/60 mb-6">Everyone who's registered for an upcoming event.</p>

      <div className="relative mb-5 max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
        <input
          placeholder="Search by name, phone, email or event…"
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border-2 border-ink/20 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-chili focus:outline-none"
        />
      </div>

      {loading ? (
        <p className="text-ink/50">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-ink/50">No registrations found.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border-2 border-ink bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-ink text-left text-xs font-mono uppercase tracking-wider text-ink/50">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Attendees</th>
                <th className="px-4 py-3">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-semibold text-ink">{r.full_name}</td>
                  <td className="px-4 py-3 text-ink/70">{r.event_title ?? '—'}</td>
                  <td className="px-4 py-3 text-ink/70">
                    <div>{r.phone}</div>
                    <div className="text-xs text-ink/40">{r.email}</div>
                  </td>
                  <td className="px-4 py-3 text-ink/70">{r.attendees}</td>
                  <td className="px-4 py-3 text-ink/50">{formatDate(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
