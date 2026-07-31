import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Trash2, GripVertical, X } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import type { Service } from '@/types'

const inputClass = 'w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-chili focus:outline-none'
const labelClass = 'mb-1.5 block text-xs font-mono uppercase tracking-wider text-ink/60'

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [editing, setEditing] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  async function load() {
    const { data } = await supabase.from('services').select('*').order('order_index')
    setServices(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function startNew() {
    setEditing({
      id: '', title: '', slug: '', description: '', image_url: '',
      order_index: services.length + 1, is_active: true,
    })
  }

  async function save() {
    if (!editing) return
    const payload = { ...editing, slug: editing.slug || slugify(editing.title) }
    if (editing.id) {
      const { error } = await supabase.from('services').update(payload).eq('id', editing.id)
      if (error) return toast.error(error.message)
    } else {
      const { id, ...rest } = payload
      const { error } = await supabase.from('services').insert(rest)
      if (error) return toast.error(error.message)
    }
    toast.success('Saved')
    setEditing(null)
    load()
  }

  async function remove(id: string) {
    if (!confirm('Delete this service?')) return
    const { error } = await supabase.from('services').delete().eq('id', id)
    if (error) return toast.error(error.message)
    toast.success('Deleted')
    load()
  }

  async function move(index: number, dir: -1 | 1) {
    const target = index + dir
    if (target < 0 || target >= services.length) return
    const a = services[index], b = services[target]
    await Promise.all([
      supabase.from('services').update({ order_index: b.order_index }).eq('id', a.id),
      supabase.from('services').update({ order_index: a.order_index }).eq('id', b.id),
    ])
    load()
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ink">Services</h1>
          <p className="text-ink/60">What shows up on the Services page and homepage.</p>
        </div>
        <Button onClick={startNew}><Plus size={16} /> Add Service</Button>
      </div>

      {loading ? (
        <p className="text-ink/50">Loading…</p>
      ) : (
        <div className="space-y-3">
          {services.map((s, i) => (
            <div key={s.id} className="flex items-center gap-4 rounded-2xl border-2 border-ink bg-white p-4">
              <GripVertical className="text-ink/20 shrink-0" size={18} />
              {s.image_url && <img src={s.image_url} alt="" className="h-14 w-20 rounded-lg object-cover border border-ink/10 shrink-0" />}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink truncate">{s.title}</p>
                <p className="text-xs text-ink/50 truncate">{s.description}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => move(i, -1)} className="rounded-lg px-2 py-1 text-xs hover:bg-gold-50">↑</button>
                <button onClick={() => move(i, 1)} className="rounded-lg px-2 py-1 text-xs hover:bg-gold-50">↓</button>
                <button onClick={() => setEditing(s)} className="rounded-lg px-3 py-1.5 text-xs font-bold bg-ink text-gold">Edit</button>
                <button onClick={() => remove(s.id)} className="rounded-lg p-1.5 text-chili hover:bg-chili/10"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-ink bg-paper p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl">{editing.id ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Title</label>
                <input className={inputClass} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea rows={3} className={inputClass} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Image</label>
                <ImageUploader value={editing.image_url} onUploaded={(url) => setEditing({ ...editing, image_url: url })} />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} />
                Active (visible on site)
              </label>
              <Button onClick={save} className="w-full">Save Service</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
