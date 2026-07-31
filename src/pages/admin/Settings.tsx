import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Save } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import type { SiteSettings, PageCover, PageKey } from '@/types'
import { FALLBACK_SETTINGS } from '@/data/fallback'

const inputClass = 'w-full rounded-xl border-2 border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-chili focus:outline-none'
const labelClass = 'mb-1.5 block text-xs font-mono uppercase tracking-wider text-ink/60'

const PAGE_KEYS: { key: PageKey; label: string }[] = [
  { key: 'home', label: 'Home' }, { key: 'about', label: 'About' }, { key: 'services', label: 'Services' },
  { key: 'events', label: 'Upcoming Events' }, { key: 'gallery', label: 'Gallery' },
  { key: 'testimonials', label: 'Testimonials' }, { key: 'contact', label: 'Contact' },
]

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>(FALLBACK_SETTINGS)
  const [covers, setCovers] = useState<Record<string, PageCover>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      const [{ data: s }, { data: c }] = await Promise.all([
        supabase.from('site_settings').select('*').eq('id', 1).single(),
        supabase.from('page_covers').select('*'),
      ])
      if (s) setSettings(s as SiteSettings)
      const coverMap: Record<string, PageCover> = {}
      ;(c ?? []).forEach((row: PageCover) => { coverMap[row.page_key] = row })
      setCovers(coverMap)
      setLoading(false)
    }
    load()
  }, [])

  async function saveSettings() {
    setSaving(true)
    const { error } = await supabase.from('site_settings').update(settings).eq('id', 1)
    setSaving(false)
    if (error) toast.error(error.message)
    else toast.success('Settings updated')
  }

  async function saveCover(pageKey: PageKey, imageUrl: string) {
    const { error } = await supabase.from('page_covers').update({ image_url: imageUrl }).eq('page_key', pageKey)
    if (error) return toast.error(error.message)
    setCovers({ ...covers, [pageKey]: { page_key: pageKey, image_url: imageUrl } })
    toast.success(`${pageKey} cover updated`)
  }

  if (loading) return <AdminLayout><p className="text-ink/50">Loading…</p></AdminLayout>

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl text-ink mb-1">Website Settings</h1>
      <p className="text-ink/60 mb-8">Business details and every page's cover image.</p>

      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
        <section className="rounded-2xl border-2 border-ink bg-white p-6 h-fit">
          <h2 className="font-display text-xl text-ink mb-4">Business Information</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Company Name</label>
              <input className={inputClass} value={settings.company_name} onChange={(e) => setSettings({ ...settings, company_name: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input className={inputClass} value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input className={inputClass} value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Instagram URL</label>
              <input className={inputClass} value={settings.instagram_url} onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>WhatsApp Number (digits only, with country code)</label>
              <input className={inputClass} value={settings.whatsapp_number} onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input className={inputClass} value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Google Maps Embed (optional — paste an iframe embed code)</label>
              <textarea rows={2} className={inputClass} value={settings.google_maps_embed} onChange={(e) => setSettings({ ...settings, google_maps_embed: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>About the Business</label>
              <textarea rows={3} className={inputClass} value={settings.about_business} onChange={(e) => setSettings({ ...settings, about_business: e.target.value })} />
            </div>
            <Button onClick={saveSettings} disabled={saving} className="w-full"><Save size={16} /> {saving ? 'Saving…' : 'Save Settings'}</Button>
          </div>
        </section>

        <section className="rounded-2xl border-2 border-ink bg-white p-6 h-fit">
          <h2 className="font-display text-xl text-ink mb-4">Page Cover Images</h2>
          <div className="grid grid-cols-2 gap-4">
            {PAGE_KEYS.map(({ key, label }) => (
              <div key={key}>
                <p className="mb-1.5 text-xs font-semibold text-ink">{label}</p>
                <ImageUploader
                  value={covers[key]?.image_url}
                  aspect="aspect-video"
                  onUploaded={(url) => saveCover(key, url)}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}
