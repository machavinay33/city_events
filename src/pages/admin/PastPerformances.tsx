import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Trash2, X, MapPin } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import type { PastPerformance, PerformanceMediaItem } from '@/types'

const inputClass = 'w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-chili focus:outline-none'

export default function AdminPastPerformances() {
  const [performances, setPerformances] = useState<PastPerformance[]>([])
  const [loading, setLoading] = useState(true)
  const [newVenueName, setNewVenueName] = useState('')

  async function load() {
    const { data } = await supabase.from('past_performances').select('*').order('order_index')
    setPerformances((data ?? []) as PastPerformance[])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function addVenue() {
    if (!newVenueName.trim()) return
    const { error } = await supabase.from('past_performances').insert({
      venue_name: newVenueName.trim(),
      media: [],
      order_index: performances.length + 1,
    })
    if (error) return toast.error(error.message)
    setNewVenueName('')
    toast.success('Venue added')
    load()
  }

  async function removeVenue(id: string) {
    if (!confirm('Delete this venue and all its photos/videos?')) return
    const { error } = await supabase.from('past_performances').delete().eq('id', id)
    if (error) return toast.error(error.message)
    toast.success('Deleted')
    load()
  }

  async function renameVenue(id: string, venue_name: string) {
    const { error } = await supabase.from('past_performances').update({ venue_name }).eq('id', id)
    if (error) toast.error(error.message)
  }

  async function addMedia(performance: PastPerformance, item: PerformanceMediaItem) {
    const media = [...performance.media, item]
    const { error } = await supabase.from('past_performances').update({ media }).eq('id', performance.id)
    if (error) return toast.error(error.message)
    load()
  }

  async function removeMedia(performance: PastPerformance, index: number) {
    const media = performance.media.filter((_, i) => i !== index)
    const { error } = await supabase.from('past_performances').update({ media }).eq('id', performance.id)
    if (error) return toast.error(error.message)
    load()
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="font-display text-3xl text-ink">Past Performances</h1>
          <p className="text-ink/60">Shown on the About page. Add a venue, then upload its photos and videos.</p>
        </div>
      </div>

      <div className="mb-8 mt-6 flex flex-col sm:flex-row gap-3 max-w-lg">
        <input
          className={inputClass}
          placeholder="New venue name, e.g. Villa Cafe 167"
          value={newVenueName}
          onChange={(e) => setNewVenueName(e.target.value)}
        />
        <Button onClick={addVenue}><Plus size={16} /> Add Venue</Button>
      </div>

      {loading ? (
        <p className="text-ink/50">Loading…</p>
      ) : performances.length === 0 ? (
        <p className="text-ink/50">No venues yet — add one above.</p>
      ) : (
        <div className="space-y-6">
          {performances.map((performance) => (
            <div key={performance.id} className="rounded-2xl border-2 border-ink bg-white p-5">
              <div className="mb-4 flex items-center gap-3">
                <MapPin size={18} className="shrink-0 text-chili" />
                <input
                  className={`${inputClass} font-semibold`}
                  defaultValue={performance.venue_name}
                  onBlur={(e) => renameVenue(performance.id, e.target.value)}
                />
                <button
                  onClick={() => removeVenue(performance.id)}
                  className="shrink-0 rounded-lg p-2 text-chili hover:bg-chili/10"
                  aria-label="Delete venue"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {performance.media.map((item, i) => (
                  <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-ink/15 bg-ink">
                    {item.type === 'video' ? (
                      <video src={item.url} muted loop autoPlay playsInline className="h-full w-full object-cover" />
                    ) : (
                      <img src={item.url} alt="" className="h-full w-full object-cover" />
                    )}
                    <button
                      onClick={() => removeMedia(performance, i)}
                      className="absolute top-1 right-1 rounded-full bg-ink/80 p-1 text-paper opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}

                <div className="aspect-square">
                  <ImageUploader
                    label="Add Photo/Video"
                    accept="image/*,video/*"
                    aspect="aspect-square"
                    onUploaded={(url) =>
                      addMedia(performance, { url, type: url.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i) ? 'video' : 'image' })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
