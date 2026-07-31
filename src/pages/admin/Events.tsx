import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Trash2, X, Star } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import type { EventItem } from '@/types'
import { formatDate } from '@/lib/utils'

const inputClass = 'w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-chili focus:outline-none'
const labelClass = 'mb-1.5 block text-xs font-mono uppercase tracking-wider text-ink/60'

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const emptyEvent: EventItem = {
  id: '', title: '', slug: '', description: '', poster_url: '', cover_url: '',
  venue: '', event_date: '', event_time: '18:30', total_seats: 100, remaining_seats: 100,
  is_featured: false, is_active: true,
}

export default function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [editing, setEditing] = useState<EventItem | null>(null)
  const [loading, setLoading] = useState(true)

  async function load() {
    const { data } = await supabase.from('events').select('*').order('event_date')
    setEvents(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function save() {
    if (!editing) return
    const payload = { ...editing, slug: editing.slug || slugify(editing.title) }
    if (editing.id) {
      const { error } = await supabase.from('events').update(payload).eq('id', editing.id)
      if (error) return toast.error(error.message)
    } else {
      const { id, ...rest } = payload
      const { error } = await supabase.from('events').insert(rest)
      if (error) return toast.error(error.message)
    }
    toast.success('Saved')
    setEditing(null)
    load()
  }

  async function remove(id: string) {
    if (!confirm('Delete this event?')) return
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) return toast.error(error.message)
    toast.success('Deleted')
    load()
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ink">Upcoming Events</h1>
          <p className="text-ink/60">Posters, seats, schedule — all live once saved.</p>
        </div>
        <Button onClick={() => setEditing(emptyEvent)}><Plus size={16} /> Add Event</Button>
      </div>

      {loading ? (
        <p className="text-ink/50">Loading…</p>
      ) : events.length === 0 ? (
        <p className="text-ink/50">No events yet.</p>
      ) : (
        <div className="space-y-3">
          {events.map((e) => (
            <div key={e.id} className="flex items-center gap-4 rounded-2xl border-2 border-ink bg-white p-4">
              {e.poster_url && <img src={e.poster_url} alt="" className="h-16 w-14 rounded-lg object-cover border border-ink/10 shrink-0" />}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink truncate flex items-center gap-2">
                  {e.title} {e.is_featured && <Star size={13} className="fill-gold text-gold" />}
                </p>
                <p className="text-xs text-ink/50">{formatDate(e.event_date)} · {e.venue} · {e.remaining_seats}/{e.total_seats} seats left</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setEditing(e)} className="rounded-lg px-3 py-1.5 text-xs font-bold bg-ink text-gold">Edit</button>
                <button onClick={() => remove(e.id)} className="rounded-lg p-1.5 text-chili hover:bg-chili/10"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 overflow-y-auto">
          <div className="w-full max-w-lg my-8 max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-ink bg-paper p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl">{editing.id ? 'Edit Event' : 'Add Event'}</h3>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Event Name</label>
                <input className={inputClass} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea rows={3} className={inputClass} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Poster</label>
                  <ImageUploader value={editing.poster_url} onUploaded={(url) => setEditing({ ...editing, poster_url: url })} aspect="aspect-[3/4]" />
                </div>
                <div>
                  <label className={labelClass}>Cover Image</label>
                  <ImageUploader value={editing.cover_url} onUploaded={(url) => setEditing({ ...editing, cover_url: url })} aspect="aspect-[3/4]" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Venue</label>
                <input className={inputClass} value={editing.venue} onChange={(e) => setEditing({ ...editing, venue: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Date</label>
                  <input type="date" className={inputClass} value={editing.event_date} onChange={(e) => setEditing({ ...editing, event_date: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Time</label>
                  <input type="time" className={inputClass} value={editing.event_time} onChange={(e) => setEditing({ ...editing, event_time: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Total Seats</label>
                  <input type="number" className={inputClass} value={editing.total_seats} onChange={(e) => setEditing({ ...editing, total_seats: Number(e.target.value) })} />
                </div>
                <div>
                  <label className={labelClass}>Remaining Seats</label>
                  <input type="number" className={inputClass} value={editing.remaining_seats} onChange={(e) => setEditing({ ...editing, remaining_seats: Number(e.target.value) })} />
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={editing.is_featured} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} />
                  Active (visible on site)
                </label>
              </div>
              <Button onClick={save} className="w-full">Save Event</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
