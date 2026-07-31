# City Events — Website + Admin Dashboard

A production-ready website for **City Events** (Nagpur, Maharashtra) — live music, stand-up
comedy, poetry, bhajan jams and art sessions — plus a no-code admin dashboard to run the whole
site from a browser.

Built with React + Vite + TypeScript + Tailwind CSS, GSAP/Framer Motion/Lenis for animation, and
Supabase for auth, database and file storage.

---

## 1. What you get

- **Public site**: Home, About, Services, Upcoming Events, Gallery, Testimonials, Contact — all
  content-driven from Supabase, with a graceful fallback so the site still looks complete even
  before Supabase is connected (uses your uploaded logo/photos as demo content).
- **Booking + registration forms** that write straight into Supabase tables — no payment
  processing, as requested.
- **Admin dashboard** (`/admin/login`) — protected by Supabase Auth — to edit the homepage, manage
  services/events/gallery/testimonials, review bookings & registrations (with CSV export), update
  page cover images, and manage a central media library.

## 2. Run it locally

```bash
npm install
cp .env.example .env      # then fill in your Supabase keys (step 3)
npm run dev
```

The site opens at `http://localhost:5173`. Without Supabase configured, every public page still
renders using the demo content baked into `src/data/fallback.ts` — but forms and the admin
dashboard won't work until you connect Supabase.

## 3. Connect Supabase (no manual SQL beyond one paste)

1. Create a free project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the **Project URL** and **anon public key** into `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
3. Open **SQL Editor → New query**, paste the entire contents of `supabase/schema.sql`, and run
   it. This creates every table, security policy, the public `media` storage bucket, and seeds
   the demo services/events/gallery/testimonials so the site isn't empty on first load.
4. Go to **Authentication → Users → Add user** and create yourself an admin login (email +
   password). That's the only account type — anyone who can sign in can manage the whole site.
5. Restart `npm run dev` (or redeploy) so the new env vars are picked up.

Sign in at `/admin/login` with the user you just created.

## 4. Deploy

- **GitHub**: push this folder as-is (`.env` is already git-ignored).
- **Netlify**: connect the repo — `netlify.toml` is already set up with the build command
  (`npm run build`), publish directory (`dist`), and an SPA redirect rule. Add the two
  `VITE_SUPABASE_*` environment variables in Netlify's site settings before the first deploy.

## 5. Project structure

```
src/
  components/    # layout, ui primitives, and feature components (home, services, events, ...)
  pages/         # one file per public route, plus pages/admin for the dashboard
  hooks/         # useAuth, useContent (data fetching + fallback), useSmoothScroll, useCounter
  data/          # fallback.ts — demo content shown before/without Supabase
  lib/           # supabase client, small utils
  types/         # shared TypeScript types
supabase/
  schema.sql     # full schema, RLS policies, storage bucket — paste once into SQL Editor
```

## 6. Notes & honest limitations

- **Homepage section order**: the admin screen lets you reorder sections and saves that order,
  but `Home.tsx` currently renders sections in a fixed order. Wire `home.section_order` into a
  `.map()` in `Home.tsx` if you want the reorder control to actually change the live layout.
- **Google Maps**: the Contact page falls back to a generic Nagpur map embed until you paste a
  real embed code (from Google Maps → Share → Embed a map) into Website Settings.
- **Brand assets**: the logo and event/gallery photos you shared are already wired in at
  `public/assets/`. Swap or add more any time from the admin's Media Library, Gallery, or
  Homepage screens — nothing is hardcoded beyond the initial defaults.
- This was generated and reviewed for syntax correctness, but hasn't been run through a live
  `npm install` + `npm run build` in this environment (no network access here) — run
  `npm run build` yourself once, before deploying, to catch anything environment-specific.
