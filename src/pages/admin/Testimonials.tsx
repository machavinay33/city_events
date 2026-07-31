import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Trash2, X, Star } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import type { Testimonial } from '@/types'

const inputClass = 'w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-chili focus:outline-none'
const labelClass = 'mb-1.5 block text-xs font-mono uppercase tracking-wider text-ink/60'

const empty: Testimonial = { id: '', name: '', quote: '', photo_url: '', rating: 5, order_index: 0, is_active: true }

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [loading, setLoading] = useState(true)

  async function load() {
    const { data } = await supabase.from('testimonials').select('*').order('order_index')
    setItems((data ?? []) as Testimonial[])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function save() {
    if (!editing) return
    if (editing.id) {
      const { error } = await supabase.from('testimonials').update(editing).eq('id', editing.id)
      if (error) return toast.error(error.message)
    } else {
      const { id, ...rest } = { ...editing, order_index: items.length + 1 }
      const { error } = await supabase.from('testimonials').insert(rest)
      if (error) return toast.error(error.message)
    }
    toast.success('Saved')
    setEditing(null)
    load()
  }

  async function remove(id: string) {
    if (!confirm('Delete this testimonial?')) return
    const { error } = await supabase.from('testimonials').delete().eq('id', id)
    if (error) return toast.error(error.message)
    load()
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ink">Testimonials</h1>
          <p className="text-ink/60">Shown on the homepage and the Testimonials page.</p>
        </div>
        <Button onClick={() => setEditing(empty)}><Plus size={16} /> Add Testimonial</Button>
      </div>

      {loading ? (
        <p className="text-ink/50">Loading…</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((t) => (
            <div key={t.id} className="rounded-2xl border-2 border-ink bg-white p-5">
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={i < t.rating ? 'fill-gold text-gold' : 'text-ink/20'} />
                ))}
              </div>
              <p className="text-sm text-ink/70 mb-3 line-clamp-3">{t.quote}</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm text-ink">{t.name}</p>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(t)} className="rounded-lg px-2.5 py-1 text-xs font-bold bg-ink text-gold">Edit</button>
                  <button onClick={() => remove(t.id)} className="rounded-lg p-1.5 text-chili hover:bg-chili/10"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-ink bg-paper p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl">{editing.id ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Name</label>
                <input className={inputClass} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Quote</label>
                <textarea rows={3} className={inputClass} value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Photo (optional)</label>
                <ImageUploader value={editing.photo_url} onUploaded={(url) => setEditing({ ...editing, photo_url: url })} aspect="aspect-square" />
              </div>
              <div>
                <label className={labelClass}>Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setEditing({ ...editing, rating: n })}>
                      <Star size={22} className={n <= editing.rating ? 'fill-gold text-gold' : 'text-ink/20'} />
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={save} className="w-full">Save Testimonial</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
