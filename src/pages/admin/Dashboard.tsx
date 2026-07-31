import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardList, UserCheck, CalendarDays, Sparkles } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'

interface Counts {
  bookings: number
  registrations: number
  events: number
  services: number
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({ bookings: 0, registrations: 0, events: 0, services: 0 })
  const [recentBookings, setRecentBookings] = useState<any[]>([])
  const [recentRegs, setRecentRegs] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const [b, r, e, s] = await Promise.all([
        supabase.from('bookings').select('*', { count: 'exact', head: true }),
        supabase.from('event_registrations').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
      ])
      setCounts({
        bookings: b.count ?? 0,
        registrations: r.count ?? 0,
        events: e.count ?? 0,
        services: s.count ?? 0,
      })

      const { data: bookings } = await supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(5)
      const { data: regs } = await supabase.from('event_registrations').select('*').order('created_at', { ascending: false }).limit(5)
      setRecentBookings(bookings ?? [])
      setRecentRegs(regs ?? [])
    }
    load()
  }, [])

  const cards = [
    { label: 'Bookings', value: counts.bookings, icon: ClipboardList, to: '/admin/bookings' },
    { label: 'Event Registrations', value: counts.registrations, icon: UserCheck, to: '/admin/registrations' },
    { label: 'Active Events', value: counts.events, icon: CalendarDays, to: '/admin/events' },
    { label: 'Services Listed', value: counts.services, icon: Sparkles, to: '/admin/services' },
  ]

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl text-ink mb-1">Dashboard</h1>
      <p className="text-ink/60 mb-8">A quick look at what's happening on the site.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((card) => (
          <Link key={card.label} to={card.to} className="rounded-2xl border-2 border-ink bg-white p-5 hover:border-chili transition-colors">
            <card.icon size={22} className="text-chili mb-3" />
            <p className="font-display text-3xl text-ink">{card.value}</p>
            <p className="text-xs font-mono uppercase tracking-wider text-ink/50 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border-2 border-ink bg-white p-5">
          <h2 className="font-display text-lg text-ink mb-4">Recent Bookings</h2>
          {recentBookings.length === 0 ? (
            <p className="text-sm text-ink/50">No bookings yet.</p>
          ) : (
            <ul className="divide-y divide-line">
              {recentBookings.map((b) => (
                <li key={b.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-ink truncate">{b.full_name}</p>
                    <p className="text-xs text-ink/50">{b.service_title ?? b.event_type} · {formatDate(b.created_at)}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-bold uppercase text-ink">{b.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border-2 border-ink bg-white p-5">
          <h2 className="font-display text-lg text-ink mb-4">Recent Registrations</h2>
          {recentRegs.length === 0 ? (
            <p className="text-sm text-ink/50">No registrations yet.</p>
          ) : (
            <ul className="divide-y divide-line">
              {recentRegs.map((r) => (
                <li key={r.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-ink truncate">{r.full_name}</p>
                    <p className="text-xs text-ink/50">{r.event_title} · {r.attendees} attendee(s)</p>
                  </div>
                  <span className="shrink-0 text-xs text-ink/40">{formatDate(r.created_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
