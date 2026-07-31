import type {
  SiteSettings,
  HomepageContent,
  Service,
  EventItem,
  GalleryMedia,
  Testimonial,
  PageCover,
  PageKey,
} from '@/types'

export const FALLBACK_SETTINGS: SiteSettings = {
  company_name: 'City Events',
  phone: '+91 77568 53602',
  email: 'Cityevents555@gmail.com',
  instagram_url: 'https://www.instagram.com/cityevents.official',
  whatsapp_number: '917756853602',
  google_maps_embed: '',
  address: 'Nagpur, Maharashtra, India',
  about_business:
    'City Events curates live music nights, comedy sets, poetry evenings, bhajan jams and art sessions across Nagpur.',
}

export const FALLBACK_HOMEPAGE: HomepageContent = {
  hero_title: 'Live Moments,\nMade in Nagpur',
  hero_subtitle:
    'Music nights, comedy sets, poetry evenings and more — City Events brings the city together, one stage at a time.',
  hero_media_url: '/assets/events/live-music-night-poster.jpeg',
  hero_media_type: 'image',
  about_title: 'We build nights people talk about for weeks',
  about_body:
    'City Events is a Nagpur-based live events collective. We host open-mic music nights, stand-up comedy, poetry circles, bhajan jam sessions and art lecture evenings at cafes and venues across the city — free to attend, open to everyone.',
  stats: [
    { label: 'Events Hosted', value: 40 },
    { label: 'Artists Featured', value: 75 },
    { label: 'Happy Attendees', value: 5000 },
    { label: 'Venue Partners', value: 12 },
  ],
  featured_service_ids: [],
  featured_event_ids: [],
  section_order: ['about', 'why-us', 'stats', 'services', 'events', 'gallery', 'testimonials', 'contact'],
}

export const FALLBACK_PAGE_COVERS: Record<PageKey, PageCover> = {
  home: { page_key: 'home', image_url: '/assets/gallery/gallery-04.jpeg' },
  about: { page_key: 'about', image_url: '/assets/gallery/gallery-02.jpeg' },
  services: { page_key: 'services', image_url: '/assets/gallery/gallery-03.jpeg' },
  events: { page_key: 'events', image_url: '/assets/events/live-music-night-poster.jpeg' },
  gallery: { page_key: 'gallery', image_url: '/assets/gallery/gallery-01.jpeg' },
  testimonials: { page_key: 'testimonials', image_url: '/assets/gallery/gallery-04.jpeg' },
  contact: { page_key: 'contact', image_url: '/assets/gallery/gallery-02.jpeg' },
}

export const FALLBACK_SERVICES: Service[] = [
  {
    id: 'live-music',
    title: 'Live Music',
    slug: 'live-music',
    description:
      'Acoustic sets, full bands and open-mic nights — we bring live musicians and a proper sound setup to your venue or celebration.',
    image_url: '/assets/events/live-music-night-poster.jpeg',
    order_index: 1,
    is_active: true,
  },
  {
    id: 'stand-up-comedy',
    title: 'Stand-up Comedy',
    slug: 'stand-up-comedy',
    description:
      'Local comics performing tight, crowd-tested sets. Great for cafe nights, corporate mixers and private celebrations.',
    image_url: '/assets/gallery/gallery-03.jpeg',
    order_index: 2,
    is_active: true,
  },
  {
    id: 'poetry',
    title: 'Poetry',
    slug: 'poetry',
    description:
      'Open-mic poetry evenings and curated readings, in Hindi, Marathi and English, for an audience that listens closely.',
    image_url: '/assets/gallery/gallery-02.jpeg',
    order_index: 3,
    is_active: true,
  },
  {
    id: 'bhajan-jamming',
    title: 'Bhajan Jamming',
    slug: 'bhajan-jamming',
    description:
      'Community bhajan sessions with live instruments — devotional, warm and built for group participation.',
    image_url: '/assets/gallery/gallery-01.jpeg',
    order_index: 4,
    is_active: true,
  },
  {
    id: 'art-lecture-sessions',
    title: 'Art Lecture Sessions',
    slug: 'art-lecture-sessions',
    description:
      'Guided sessions with practicing artists covering technique, process and live demonstration.',
    image_url: '/assets/gallery/gallery-04.jpeg',
    order_index: 5,
    is_active: true,
  },
]

export const FALLBACK_EVENTS: EventItem[] = [
  {
    id: 'fathers-day-live-music-night',
    title: "Father's Day Live Music Night",
    slug: 'fathers-day-live-music-night',
    description:
      "An evening of live acoustic and electric sets from Ritik, Bhavesh and Farhan. Free entry, open for all.",
    poster_url: '/assets/events/live-music-night-poster.jpeg',
    cover_url: '/assets/events/live-music-night-poster.jpeg',
    venue: "Ginchi's Cafe, Nagpur",
    event_date: '2026-06-21',
    event_time: '18:30',
    total_seats: 80,
    remaining_seats: 32,
    is_featured: true,
    is_active: true,
  },
]

export const FALLBACK_GALLERY: GalleryMedia[] = [
  { id: 'g1', url: '/assets/gallery/gallery-01.jpeg', media_type: 'image', caption: 'City Events, live at a Nagpur cafe', order_index: 1 },
  { id: 'g2', url: '/assets/gallery/gallery-02.jpeg', media_type: 'image', caption: 'Open-mic night crowd', order_index: 2 },
  { id: 'g3', url: '/assets/gallery/gallery-03.jpeg', media_type: 'image', caption: 'Street-side acoustic set', order_index: 3 },
  { id: 'g4', url: '/assets/gallery/gallery-04.jpeg', media_type: 'image', caption: 'Full house at a City Events gig', order_index: 4 },
  { id: 'g5', url: '/assets/events/live-music-night-poster.jpeg', media_type: 'image', caption: "Father's Day Live Music Night poster", order_index: 5 },
]

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Aarav Deshmukh',
    quote:
      'City Events turned a regular Sunday evening into the best open mic Nagpur has seen this year.',
    photo_url: '',
    rating: 5,
    order_index: 1,
    is_active: true,
  },
  {
    id: 't2',
    name: 'Sanya Kulkarni',
    quote: 'Loved the bhajan jam — warm crowd, great musicians, zero awkwardness getting involved.',
    photo_url: '',
    rating: 5,
    order_index: 2,
    is_active: true,
  },
  {
    id: 't3',
    name: 'Rohan Mehta',
    quote: "Booked them for a birthday and the acoustic set made the whole evening. Easy to work with too.",
    photo_url: '',
    rating: 5,
    order_index: 3,
    is_active: true,
  },
]
