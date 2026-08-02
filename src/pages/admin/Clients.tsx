import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Trash2, X } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import type { Client } from '@/types'

const inputClass = 'w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-chili focus:outline-none'
const labelClass = 'mb-1.5 block text-xs font-mono uppercase tracking-wider text-ink/60'

const empty: Client = { id: '', name: '', logo_url: '', order_index: 0, is_active: true }

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [editing, setEditing] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)

  async function load() {
    const { data } = await supabase.from('clients').select('*').order('order_index')
    setClients((data ?? []) as Client[])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function save() {
    if (!editing) return
    if (!editing.name.trim()) return toast.error('Client name is required')

    if (editing.id) {
      const { error } = await supabase.from('clients').update(editing).eq('id', editing.id)
      if (error) return toast.error(error.message)
    } else {
      const { id, ...rest } = { ...editing, order_index: clients.length + 1 }
      const { error } = await supabase.from('clients').insert(rest)
      if (error) return toast.error(error.message)
    }
    toast.success('Saved')
    setEditing(null)
    load()
  }

  async function remove(id: string) {
    if (!confirm('Remove this client from the homepage?')) return
    const { error } = await supabase.from('clients').delete().eq('id', id)
    if (error) return toast.error(error.message)
    toast.success('Removed')
    load()
  }

  async function move(index: number, dir: -1 | 1) {
    const target = index + dir
    if (target < 0 || target >= clients.length) return
    const a = clients[index], b = clients[target]
    await Promise.all([
      supabase.from('clients').update({ order_index: b.order_index }).eq('id', a.id),
      supabase.from('clients').update({ order_index: a.order_index }).eq('id', b.id),
    ])
    load()
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ink">Our Clients</h1>
          <p className="text-ink/60">The scrolling logo banner shown on the homepage.</p>
        </div>
        <Button onClick={() => setEditing(empty)}><Plus size={16} /> Add Client</Button>
      </div>

      {loading ? (
        <p className="text-ink/50">Loading…</p>
      ) : clients.length === 0 ? (
        <p className="text-ink/50">No clients yet — add one above.</p>
      ) : (
        <div className="space-y-3">
          {clients.map((c, i) => (
            <div key={c.id} className="flex items-center gap-4 rounded-2xl border-2 border-ink bg-white p-4">
              <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg border border-ink/10 bg-gold-50 overflow-hidden">
                {c.logo_url ? (
                  <img src={c.logo_url} alt="" className="h-full w-full object-contain" />
                ) : (
                  <span className="px-1 text-center text-[10px] font-semibold text-ink/40">No logo</span>
                )}
              </div>
              <p className="flex-1 min-w-0 truncate font-semibold text-ink">{c.name}</p>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => move(i, -1)} className="rounded-lg px-2 py-1 text-xs hover:bg-gold-50">↑</button>
                <button onClick={() => move(i, 1)} className="rounded-lg px-2 py-1 text-xs hover:bg-gold-50">↓</button>
                <button onClick={() => setEditing(c)} className="rounded-lg px-3 py-1.5 text-xs font-bold bg-ink text-gold">Edit</button>
                <button onClick={() => remove(c.id)} className="rounded-lg p-1.5 text-chili hover:bg-chili/10"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-ink bg-paper p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl">{editing.id ? 'Edit Client' : 'Add Client'}</h3>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Client Name</label>
                <input className={inputClass} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Logo (optional — shown as styled text if left blank)</label>
                <ImageUploader value={editing.logo_url} onUploaded={(url) => setEditing({ ...editing, logo_url: url })} aspect="aspect-video" />
                {editing.logo_url && (
                  <button
                    type="button"
                    onClick={() => setEditing({ ...editing, logo_url: '' })}
                    className="mt-2 text-xs font-semibold text-chili hover:underline"
                  >
                    Remove logo
                  </button>
                )}
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} />
                Active (visible on site)
              </label>
              <Button onClick={save} className="w-full">Save Client</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
