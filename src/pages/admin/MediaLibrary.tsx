import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Search, Trash2, Copy, Video as VideoIcon } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { supabase } from '@/lib/supabase'
import type { MediaLibraryItem } from '@/types'
import { formatDate } from '@/lib/utils'

function formatBytes(bytes: number) {
  if (!bytes) return '—'
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(0)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

export default function AdminMediaLibrary() {
  const [items, setItems] = useState<MediaLibraryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  async function load() {
    const { data } = await supabase.from('media_library').select('*').order('created_at', { ascending: false })
    setItems((data ?? []) as MediaLibraryItem[])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const filtered = items.filter((i) => i.file_name.toLowerCase().includes(search.toLowerCase()))

  async function remove(item: MediaLibraryItem) {
    if (!confirm(`Delete "${item.file_name}"? This only removes it from the library list, not from anywhere it's already used on the site.`)) return
    const { error } = await supabase.from('media_library').delete().eq('id', item.id)
    if (error) return toast.error(error.message)
    load()
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    toast.success('URL copied')
  }

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl text-ink mb-1">Media Library</h1>
      <p className="text-ink/60 mb-6">Every file uploaded anywhere in the admin, in one searchable place.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="w-full sm:w-56">
          <ImageUploader label="Upload New File" accept="image/*,video/*" aspect="aspect-video" onUploaded={load} />
        </div>
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            placeholder="Search by file name…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border-2 border-ink/20 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-chili focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-ink/50">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-ink/50">No media uploaded yet.</p>
      ) : (
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl border-2 border-ink bg-white">
              <div className="aspect-square bg-gold-50">
                {item.file_type === 'video' ? (
                  <div className="flex h-full items-center justify-center"><VideoIcon className="text-ink/30" size={28} /></div>
                ) : (
                  <img src={item.url} alt={item.file_name} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="p-2.5">
                <p className="truncate text-xs font-semibold text-ink">{item.file_name}</p>
                <p className="text-[10px] text-ink/40">{formatBytes(item.size_bytes)} · {formatDate(item.created_at)}</p>
              </div>
              <div className="absolute inset-0 top-0 flex items-start justify-end gap-1 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => copyUrl(item.url)} className="rounded-full bg-ink/80 p-1.5 text-paper"><Copy size={13} /></button>
                <button onClick={() => remove(item)} className="rounded-full bg-chili p-1.5 text-paper"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
