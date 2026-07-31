import { useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import {
  FALLBACK_SETTINGS,
  FALLBACK_HOMEPAGE,
  FALLBACK_PAGE_COVERS,
  FALLBACK_SERVICES,
  FALLBACK_EVENTS,
  FALLBACK_GALLERY,
  FALLBACK_TESTIMONIALS,
} from '@/data/fallback'
import type {
  SiteSettings,
  HomepageContent,
  PageKey,
  Service,
  EventItem,
  GalleryMedia,
  Testimonial,
} from '@/types'

function useLoadable<T>(fallback: T, loader: () => Promise<T>) {
  const [data, setData] = useState<T>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }
    loader()
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch(() => {
        if (!cancelled) setData(fallback)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading }
}

export function useSiteSettings() {
  return useLoadable(FALLBACK_SETTINGS, async () => {
    const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).single()
    if (error || !data) throw error
    return data as SiteSettings
  })
}

export function useHomepageContent() {
  return useLoadable(FALLBACK_HOMEPAGE, async () => {
    const { data, error } = await supabase.from('homepage_content').select('*').eq('id', 1).single()
    if (error || !data) throw error
    return data as HomepageContent
  })
}

export function usePageCover(page: PageKey) {
  return useLoadable(FALLBACK_PAGE_COVERS[page], async () => {
    const { data, error } = await supabase.from('page_covers').select('*').eq('page_key', page).single()
    if (error || !data || !data.image_url) throw error ?? new Error('no cover')
    return data
  })
}

export function useServices() {
  return useLoadable(FALLBACK_SERVICES, async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })
    if (error || !data || data.length === 0) throw error ?? new Error('empty')
    return data as Service[]
  })
}

export function useEvents() {
  return useLoadable(FALLBACK_EVENTS, async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('event_date', { ascending: true })
    if (error || !data || data.length === 0) throw error ?? new Error('empty')
    return data as EventItem[]
  })
}

export function useGallery() {
  return useLoadable(FALLBACK_GALLERY, async () => {
    const { data, error } = await supabase
      .from('gallery_media')
      .select('*')
      .order('order_index', { ascending: true })
    if (error || !data || data.length === 0) throw error ?? new Error('empty')
    return data as GalleryMedia[]
  })
}

export function useTestimonials() {
  return useLoadable(FALLBACK_TESTIMONIALS, async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })
    if (error || !data || data.length === 0) throw error ?? new Error('empty')
    return data as Testimonial[]
  })
}
