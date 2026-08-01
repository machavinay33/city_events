export interface SiteSettings {
  company_name: string
  phone: string
  email: string
  instagram_url: string
  whatsapp_number: string
  google_maps_embed: string
  address: string
  about_business: string
}

export interface StatItem {
  label: string
  value: number
}

export interface WhyUsReason {
  title: string
  body: string
}

export interface HomepageContent {
  hero_title: string
  hero_subtitle: string
  hero_media_url: string
  hero_media_type: 'image' | 'video'
  about_title: string
  about_body: string
  why_us_eyebrow: string
  why_us_title: string
  why_us_reasons: WhyUsReason[]
  stats: StatItem[]
  featured_service_ids: string[]
  featured_event_ids: string[]
  section_order: string[]
}

export type PageKey =
  | 'home' | 'about' | 'services' | 'events' | 'gallery' | 'testimonials' | 'contact'

export interface PageCover {
  page_key: PageKey
  image_url: string
}

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  image_url: string
  order_index: number
  is_active: boolean
}

export interface EventItem {
  id: string
  title: string
  slug: string
  description: string
  poster_url: string
  cover_url: string
  venue: string
  event_date: string
  event_time: string
  total_seats: number
  remaining_seats: number
  is_featured: boolean
  is_active: boolean
}

export type BookingStatus = 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled'

export interface Booking {
  id: string
  full_name: string
  phone: string
  email: string
  event_date: string | null
  preferred_time: string | null
  event_location: string | null
  event_type: string | null
  audience_size: string | null
  budget: string | null
  service_id: string | null
  service_title: string | null
  additional_requirements: string | null
  status: BookingStatus
  internal_notes: string
  created_at: string
}

export interface EventRegistration {
  id: string
  event_id: string | null
  event_title: string | null
  full_name: string
  phone: string
  email: string
  attendees: number
  notes: string
  created_at: string
}

export interface GalleryMedia {
  id: string
  url: string
  media_type: 'image' | 'video'
  caption: string
  order_index: number
}

export interface Testimonial {
  id: string
  name: string
  quote: string
  photo_url: string
  rating: number
  order_index: number
  is_active: boolean
}

export interface MediaLibraryItem {
  id: string
  url: string
  file_name: string
  file_type: string
  size_bytes: number
  created_at: string
}

export interface PerformanceMediaItem {
  url: string
  type: 'image' | 'video'
}

export interface PastPerformance {
  id: string
  venue_name: string
  media: PerformanceMediaItem[]
  order_index: number
  is_active: boolean
}
