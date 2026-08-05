import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ArrowUp, ArrowDown, Save } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import type { HomepageContent, Service, EventItem } from '@/types'
import { FALLBACK_HOMEPAGE } from '@/data/fallback'

const inputClass = 'w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-3 text-sm focus:border-chili focus:outline-none'
const labelClass = 'mb-1.5 block text-xs font-mono uppercase tracking-wider text-ink/60'

const SECTION_LABELS: Record<string, string> = {
  about: 'About', 'why-us': 'Why Choose Us', stats: 'Animated Statistics',
  services: 'Featured Services', events: 'Upcoming Events', gallery: 'Gallery Preview',
  testimonials: 'Testimonials', contact: 'Contact CTA',
}

export default function AdminHomepage() {
  const [content, setContent] = useState<HomepageContent>(FALLBACK_HOMEPAGE)
  const [services, setServices] = useState<Service[]>([])
  const [events, setEvents] = useState<EventItem[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ data: home }, { data: svc }, { data: evt }] = await Promise.all([
        supabase.from('homepage_content').select('*').eq('id', 1).single(),
        supabase.from('services').select('*').order('order_index'),
        supabase.from('events').select('*').order('event_date'),
      ])
      if (home) setContent(home as HomepageContent)
      setServices(svc ?? [])
      setEvents(evt ?? [])
      setLoading(false)
    }
    load()
  }, [])

  async function save() {
    setSaving(true)
    const { error } = await supabase.from('homepage_content').update(content).eq('id', 1)
    setSaving(false)
    if (error) toast.error(error.message)
    else toast.success('Homepage updated')
  }

  function moveSection(index: number, dir: -1 | 1) {
    const order = [...content.section_order]
    const target = index + dir
    if (target < 0 || target >= order.length) return
    ;[order[index], order[target]] = [order[target], order[index]]
    setContent({ ...content, section_order: order })
  }

  function toggleFeatured(list: 'featured_service_ids' | 'featured_event_ids', id: string) {
    const current = content[list]
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    setContent({ ...content, [list]: next })
  }

  if (loading) return <AdminLayout><p className="text-ink/50">Loading…</p></AdminLayout>

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ink">Homepage</h1>
          <p className="text-ink/60">Everything visible on the home page, in one place.</p>
        </div>
        <Button onClick={save} disabled={saving}><Save size={16} /> {saving ? 'Saving…' : 'Save Changes'}</Button>
      </div>

      <div className="space-y-8 max-w-3xl">
        <section className="rounded-2xl border-2 border-ink bg-white p-6">
          <h2 className="font-display text-xl text-ink mb-4">Hero</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className={labelClass}>Hero Title (use a new line for the highlighted second line)</label>
              <textarea rows={2} className={inputClass} value={content.hero_title} onChange={(e) => setContent({ ...content, hero_title: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Hero Subtitle</label>
              <textarea rows={2} className={inputClass} value={content.hero_subtitle} onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })} />
            </div>
          </div>
          <label className={labelClass}>Team Photo (Main Hero Card)</label>
          <ImageUploader
            value={content.hero_media_url}
            accept="image/*"
            onUploaded={(url) => setContent({ ...content, hero_media_url: url, hero_media_type: 'image' })}
          />
        </section>

        <section className="rounded-2xl border-2 border-ink bg-white p-6">
          <h2 className="font-display text-xl text-ink mb-4">About Section</h2>
          <label className={labelClass}>Title</label>
          <input className={`${inputClass} mb-4`} value={content.about_title} onChange={(e) => setContent({ ...content, about_title: e.target.value })} />
          <label className={labelClass}>Body</label>
          <textarea rows={4} className={inputClass} value={content.about_body} onChange={(e) => setContent({ ...content, about_body: e.target.value })} />
        </section>

        <section className="rounded-2xl border-2 border-ink bg-white p-6">
          <h2 className="font-display text-xl text-ink mb-4">Why Choose Us Section</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelClass}>Eyebrow (small label above the title)</label>
              <input className={inputClass} value={content.why_us_eyebrow} onChange={(e) => setContent({ ...content, why_us_eyebrow: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Section Title</label>
              <input className={inputClass} value={content.why_us_title} onChange={(e) => setContent({ ...content, why_us_title: e.target.value })} />
            </div>
          </div>
          <div className="space-y-4">
            {content.why_us_reasons.map((reason, i) => (
              <div key={i} className="rounded-xl border border-ink/15 p-4">
                <p className="mb-2 text-xs font-mono uppercase tracking-wider text-ink/50">Card {i + 1}</p>
                <label className={labelClass}>Title</label>
                <input
                  className={`${inputClass} mb-3`}
                  value={reason.title}
                  onChange={(e) => {
                    const reasons = [...content.why_us_reasons]
                    reasons[i] = { ...reasons[i], title: e.target.value }
                    setContent({ ...content, why_us_reasons: reasons })
                  }}
                />
                <label className={labelClass}>Body</label>
                <textarea
                  rows={2}
                  className={inputClass}
                  value={reason.body}
                  onChange={(e) => {
                    const reasons = [...content.why_us_reasons]
                    reasons[i] = { ...reasons[i], body: e.target.value }
                    setContent({ ...content, why_us_reasons: reasons })
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border-2 border-ink bg-white p-6">
          <h2 className="font-display text-xl text-ink mb-4">Animated Statistics</h2>
          <div className="space-y-3">
            {content.stats.map((stat, i) => (
              <div key={i} className="grid grid-cols-[1fr_120px] gap-3">
                <input
                  className={inputClass} placeholder="Label" value={stat.label}
                  onChange={(e) => {
                    const stats = [...content.stats]; stats[i] = { ...stats[i], label: e.target.value }
                    setContent({ ...content, stats })
                  }}
                />
                <input
                  type="number" className={inputClass} placeholder="Value" value={stat.value}
                  onChange={(e) => {
                    const stats = [...content.stats]; stats[i] = { ...stats[i], value: Number(e.target.value) }
                    setContent({ ...content, stats })
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border-2 border-ink bg-white p-6">
          <h2 className="font-display text-xl text-ink mb-4">Featured Services</h2>
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <button
                key={s.id} type="button" onClick={() => toggleFeatured('featured_service_ids', s.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold border-2 transition-colors ${content.featured_service_ids.includes(s.id) ? 'bg-gold border-ink text-ink' : 'border-ink/20 text-ink/60'}`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border-2 border-ink bg-white p-6">
          <h2 className="font-display text-xl text-ink mb-4">Featured Events</h2>
          <div className="flex flex-wrap gap-2">
            {events.map((e) => (
              <button
                key={e.id} type="button" onClick={() => toggleFeatured('featured_event_ids', e.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold border-2 transition-colors ${content.featured_event_ids.includes(e.id) ? 'bg-gold border-ink text-ink' : 'border-ink/20 text-ink/60'}`}
              >
                {e.title}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border-2 border-ink bg-white p-6">
          <h2 className="font-display text-xl text-ink mb-4">Reorder Homepage Sections</h2>
          <ul className="space-y-2">
            {content.section_order.map((key, i) => (
              <li key={key} className="flex items-center justify-between rounded-xl border border-ink/15 px-4 py-2.5">
                <span className="text-sm font-semibold text-ink">{SECTION_LABELS[key] ?? key}</span>
                <div className="flex gap-1">
                  <button onClick={() => moveSection(i, -1)} className="rounded-lg p-1.5 hover:bg-gold-50"><ArrowUp size={15} /></button>
                  <button onClick={() => moveSection(i, 1)} className="rounded-lg p-1.5 hover:bg-gold-50"><ArrowDown size={15} /></button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink/40">The live homepage renders these sections in the order you set here.</p>
        </section>
      </div>
    </AdminLayout>
  )
}
