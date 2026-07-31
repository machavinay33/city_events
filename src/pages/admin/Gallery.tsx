import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { supabase } from '@/lib/supabase'
import type { GalleryMedia } from '@/types'

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryMedia[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const { data } = await supabase.from('gallery_media').select('*').order('order_index')
    setItems((data ?? []) as GalleryMedia[])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function addMedia(url: string) {
    const mediaType = url.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image'
    const { error } = await supabase.from('gallery_media').insert({ url, media_type: mediaType, order_index: items.length + 1 })
    if (error) return toast.error(error.message)
    toast.success('Added to gallery')
    load()
  }

  async function remove(id: string) {
    if (!confirm('Remove this from the gallery?')) return
    const { error } = await supabase.from('gallery_media').delete().eq('id', id)
    if (error) return toast.error(error.message)
    load()
  }

  async function move(index: number, dir: -1 | 1) {
    const target = index + dir
    if (target < 0 || target >= items.length) return
    const a = items[index], b = items[target]
    await Promise.all([
      supabase.from('gallery_media').update({ order_index: b.order_index }).eq('id', a.id),
      supabase.from('gallery_media').update({ order_index: a.order_index }).eq('id', b.id),
    ])
    load()
  }

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl text-ink mb-1">Gallery</h1>
      <p className="text-ink/60 mb-6">Photos and videos shown on the public Gallery page.</p>

      <div className="mb-8 max-w-xs">
        <ImageUploader label="Upload Image or Video" accept="image/*,video/*" onUploaded={addMedia} />
      </div>

      {loading ? (
        <p className="text-ink/50">Loading…</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div key={item.id} className="relative group overflow-hidden rounded-2xl border-2 border-ink">
              {item.media_type === 'video' ? (
                <video src={item.url} className="aspect-square w-full object-cover" muted />
              ) : (
                <img src={item.url} alt={item.caption} className="aspect-square w-full object-cover" />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink/0 group-hover:bg-ink/60 opacity-0 group-hover:opacity-100 transition-all">
                <div className="flex gap-1">
                  <button onClick={() => move(i, -1)} className="rounded-full bg-paper px-2.5 py-1 text-xs font-bold">↑</button>
                  <button onClick={() => move(i, 1)} className="rounded-full bg-paper px-2.5 py-1 text-xs font-bold">↓</button>
                </div>
                <button onClick={() => remove(item.id)} className="rounded-full bg-chili p-2 text-paper"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
