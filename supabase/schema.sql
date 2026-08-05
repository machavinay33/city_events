sql

-- ============================================================================
-- CITY EVENTS — SUPABASE SCHEMA
-- ============================================================================
-- How to run this:
--   1. Open your Supabase project -> SQL Editor -> New query
--   2. Paste this entire file and click "Run"
--   3. Go to Authentication -> Users -> Add user, and create your admin login
--      (that's the only manual step — everything else, including Storage,
--      is created by this script)
-- ============================================================================

-- ---------------------------------------------------------------------------
-- EXTENSIONS
-- ---------------------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- HELPER: updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- SITE SETTINGS (single row)
-- ---------------------------------------------------------------------------
create table if not exists site_settings (
  id int primary key default 1,
  company_name text not null default 'City Events',
  phone text not null default '+91 77568 53602',
  email text not null default 'Cityevents555@gmail.com',
  instagram_url text not null default 'https://www.instagram.com/cityevents.official',
  whatsapp_number text not null default '917756853602',
  google_maps_embed text not null default '',
  address text not null default 'Nagpur, Maharashtra, India',
  about_business text not null default 'City Events curates live music nights, comedy sets, poetry evenings, bhajan jams and art sessions across Nagpur.',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
insert into site_settings (id) values (1) on conflict (id) do nothing;

drop trigger if exists trg_site_settings_updated on site_settings;
create trigger trg_site_settings_updated before update on site_settings
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- HOMEPAGE CONTENT (single row)
-- ---------------------------------------------------------------------------
create table if not exists homepage_content (
  id int primary key default 1,
  hero_title text not null default E'Live Moments,\nMade in Nagpur',
  hero_subtitle text not null default 'Music nights, comedy sets, poetry evenings and more — City Events brings the city together, one stage at a time.',
  hero_media_url text not null default '/assets/events/live-music-night-poster.jpeg', -- Now used for Team Photo
  hero_media_type text not null default 'image' check (hero_media_type in ('image','video')),
  about_title text not null default 'We build nights people talk about for weeks',
  about_body text not null default 'City Events is a Nagpur-based live events collective. We host open-mic music nights, stand-up comedy, poetry circles, bhajan jam sessions and art lecture evenings at cafes and venues across the city — free to attend, open to everyone.',
  why_us_eyebrow text not null default 'Why City Events',
  why_us_title text not null default 'Made for the crowd that shows up',
  why_us_reasons jsonb not null default '[
    {"title":"Curated, not generic","body":"Every lineup is hand-picked from Nagpur’s own artists — no filler acts."},
    {"title":"Built for community","body":"Free-entry, open-for-all nights designed so anyone can walk in and join."},
    {"title":"Local, always","body":"Cafes, rooftops and street corners across Nagpur — we know the city."},
    {"title":"Easy to book","body":"One form, no back-and-forth. We handle the setup, sound and schedule."}
  ]',
  stats jsonb not null default '[{"label":"Events Hosted","value":40},{"label":"Artists Featured","value":75},{"label":"Happy Attendees","value":5000},{"label":"Venue Partners","value":12}]',
  featured_service_ids uuid[] not null default '{}',
  featured_event_ids uuid[] not null default '{}',
  section_order text[] not null default array['about','why-us','stats','services','events','gallery','testimonials','contact'],
  updated_at timestamptz not null default now(),
  constraint single_row_home check (id = 1)
);
insert into homepage_content (id) values (1) on conflict (id) do nothing;

-- Safe to re-run: adds the new columns even if this table already existed
-- from an earlier version of this schema (won't touch any of your edited content).
alter table homepage_content add column if not exists why_us_eyebrow text not null default 'Why City Events';
alter table homepage_content add column if not exists why_us_title text not null default 'Made for the crowd that shows up';
alter table homepage_content add column if not exists why_us_reasons jsonb not null default '[
    {"title":"Curated, not generic","body":"Every lineup is hand-picked from Nagpur’s own artists — no filler acts."},
    {"title":"Built for community","body":"Free-entry, open-for-all nights designed so anyone can walk in and join."},
    {"title":"Local, always","body":"Cafes, rooftops and street corners across Nagpur — we know the city."},
    {"title":"Easy to book","body":"One form, no back-and-forth. We handle the setup, sound and schedule."}
  ]';

-- Fixes existing rows where hero_title was saved with a literal backslash-n
-- (from an earlier buggy version of this script) instead of a real line break.
update homepage_content
  set hero_title = E'Live Moments,\nMade in Nagpur'
  where hero_title = 'Live Moments,\nMade in Nagpur';

drop trigger if exists trg_homepage_updated on homepage_content;
create trigger trg_homepage_updated before update on homepage_content
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- PAGE COVERS
-- ---------------------------------------------------------------------------
create table if not exists page_covers (
  page_key text primary key check (page_key in ('home','about','services','events','gallery','testimonials','contact')),
  image_url text not null default '',
  updated_at timestamptz not null default now()
);
insert into page_covers (page_key) values
  ('home'), ('about'), ('services'), ('events'), ('gallery'), ('testimonials'), ('contact')
on conflict (page_key) do nothing;

drop trigger if exists trg_page_covers_updated on page_covers;
create trigger trg_page_covers_updated before update on page_covers
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- SERVICES
-- ---------------------------------------------------------------------------
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  image_url text not null default '',
  order_index int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_services_updated on services;
create trigger trg_services_updated before update on services
  for each row execute function set_updated_at();

insert into services (title, slug, description, order_index) values
  ('Live Music', 'live-music', 'Acoustic sets, full bands and open-mic nights — we bring live musicians and a proper sound setup to your venue or celebration.', 1),
  ('Stand-up Comedy', 'stand-up-comedy', 'Local comics performing tight, crowd-tested sets. Great for cafe nights, corporate mixers and private celebrations.', 2),
  ('Poetry', 'poetry', 'Open-mic poetry evenings and curated readings, in Hindi, Marathi and English, for an audience that listens closely.', 3),
  ('Bhajan Jamming', 'bhajan-jamming', 'Community bhajan sessions with live instruments — devotional, warm and built for group participation.', 4),
  ('Art Lecture Sessions', 'art-lecture-sessions', 'Guided sessions with practicing artists covering technique, process and live demonstration.', 5)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- EVENTS
-- ---------------------------------------------------------------------------
create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  poster_url text not null default '',
  cover_url text not null default '',
  venue text not null default '',
  event_date date not null,
  event_time time not null default '18:30',
  total_seats int not null default 100,
  remaining_seats int not null default 100,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_events_updated on events;
create trigger trg_events_updated before update on events
  for each row execute function set_updated_at();

insert into events (title, slug, description, poster_url, venue, event_date, event_time, total_seats, remaining_seats, is_featured) values
  ('Father''s Day Live Music Night', 'fathers-day-live-music-night',
   'An evening of live acoustic and electric sets from Ritik, Bhavesh and Farhan. Free entry, open for all.',
   '/assets/events/live-music-night-poster.jpeg', 'Ginchi''s Cafe, Nagpur', '2026-06-21', '18:30', 80, 80, true)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- BOOKINGS  (from the "Book Service" popup)
-- ---------------------------------------------------------------------------
create table if not exists bookings (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  phone text not null,
  email text not null,
  event_date date,
  preferred_time time,
  event_location text,
  event_type text,
  audience_size text,
  budget text,
  service_id uuid references services(id) on delete set null,
  service_title text,
  additional_requirements text,
  status text not null default 'new' check (status in ('new','contacted','confirmed','completed','cancelled')),
  internal_notes text not null default '',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- EVENT REGISTRATIONS
-- ---------------------------------------------------------------------------
create table if not exists event_registrations (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid references events(id) on delete cascade,
  event_title text,
  full_name text not null,
  phone text not null,
  email text not null,
  attendees int not null default 1,
  notes text not null default '',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- GALLERY MEDIA
-- ---------------------------------------------------------------------------
create table if not exists gallery_media (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  media_type text not null default 'image' check (media_type in ('image','video')),
  caption text not null default '',
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

insert into gallery_media (url, caption, order_index) values
  ('/assets/gallery/gallery-01.jpeg', 'City Events, live at a Nagpur cafe', 1),
  ('/assets/gallery/gallery-02.jpeg', 'Open-mic night crowd', 2),
  ('/assets/gallery/gallery-03.jpeg', 'Street-side acoustic set', 3),
  ('/assets/gallery/gallery-04.jpeg', 'Full house at a City Events gig', 4)
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- TESTIMONIALS
-- ---------------------------------------------------------------------------
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  quote text not null,
  photo_url text not null default '',
  rating int not null default 5 check (rating between 1 and 5),
  order_index int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into testimonials (name, quote, rating, order_index) values
  ('Aarav Deshmukh', 'City Events turned a regular Sunday evening into the best open mic Nagpur has seen this year.', 5, 1),
  ('Sanya Kulkarni', 'Loved the bhajan jam — warm crowd, great musicians, zero awkwardness getting involved.', 5, 2)
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- MEDIA LIBRARY (central asset index — mirrors Storage uploads)
-- ---------------------------------------------------------------------------
create table if not exists media_library (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  file_name text not null,
  file_type text not null default 'image',
  size_bytes bigint not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY
-- Public (anon) visitors: read published content, insert bookings/registrations/reviews.
-- Authenticated users (admins signed in via Supabase Auth): full read/write.
-- ============================================================================

alter table site_settings enable row level security;
alter table homepage_content enable row level security;
alter table page_covers enable row level security;
alter table services enable row level security;
alter table events enable row level security;
alter table bookings enable row level security;
alter table event_registrations enable row level security;
alter table gallery_media enable row level security;
alter table testimonials enable row level security;
alter table media_library enable row level security;

-- Public read
drop policy if exists "public read settings" on site_settings;
create policy "public read settings" on site_settings for select using (true);

drop policy if exists "public read homepage" on homepage_content;
create policy "public read homepage" on homepage_content for select using (true);

drop policy if exists "public read covers" on page_covers;
create policy "public read covers" on page_covers for select using (true);

drop policy if exists "public read services" on services;
create policy "public read services" on services for select using (is_active = true);

drop policy if exists "public read events" on events;
create policy "public read events" on events for select using (is_active = true);

drop policy if exists "public read gallery" on gallery_media;
create policy "public read gallery" on gallery_media for select using (true);

drop policy if exists "public read testimonials" on testimonials;
create policy "public read testimonials" on testimonials for select using (is_active = true);

-- Public insert (forms) — no read/update/delete for anon
drop policy if exists "public insert bookings" on bookings;
create policy "public insert bookings" on bookings for insert with check (true);

drop policy if exists "public insert registrations" on event_registrations;
create policy "public insert registrations" on event_registrations for insert with check (true);

drop policy if exists "public insert testimonials" on testimonials;
create policy "public insert testimonials" on testimonials for insert with check (
  is_active = true
  and rating between 1 and 5
  and length(quote) >= 5
  and length(quote) <= 500
  and length(name) >= 1
  and length(name) <= 60
);

-- Admin (authenticated) full access
drop policy if exists "admin all settings" on site_settings;
create policy "admin all settings" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin all homepage" on homepage_content;
create policy "admin all homepage" on homepage_content for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin all covers" on page_covers;
create policy "admin all covers" on page_covers for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin all services" on services;
create policy "admin all services" on services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin all events" on events;
create policy "admin all events" on events for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin all bookings" on bookings;
create policy "admin all bookings" on bookings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin all registrations" on event_registrations;
create policy "admin all registrations" on event_registrations for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin all gallery" on gallery_media;
create policy "admin all gallery" on gallery_media for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin all testimonials" on testimonials;
create policy "admin all testimonials" on testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin all media" on media_library;
create policy "admin all media" on media_library for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================================
-- STORAGE — public "media" bucket, admin-only writes
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media bucket" on storage.objects;
create policy "public read media bucket" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "admin write media bucket" on storage.objects;
create policy "admin write media bucket" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

drop policy if exists "admin update media bucket" on storage.objects;
create policy "admin update media bucket" on storage.objects
  for update using (bucket_id = 'media' and auth.role() = 'authenticated');

drop policy if exists "admin delete media bucket" on storage.objects;
create policy "admin delete media bucket" on storage.objects
  for delete using (bucket_id = 'media' and auth.role() = 'authenticated');

-- ============================================================================
-- DONE. Next: Authentication -> Users -> Add user (this becomes your admin login)
-- ============================================================================
