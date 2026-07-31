import { Link } from 'react-router-dom'
import { Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { useSiteSettings } from '@/hooks/useContent'

export function Footer() {
  const { data: settings } = useSiteSettings()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t-2 border-ink bg-ink text-paper">
      <div className="container-ce py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img
              src="/assets/logo/city-events-logo.jpeg"
              alt="City Events logo"
              className="h-12 w-12 rounded-lg border-2 border-gold object-cover"
            />
            <span className="font-display text-xl text-gold">City Events</span>
          </Link>
          <p className="text-sm text-paper/70 max-w-xs">{settings.about_business}</p>
        </div>

        <div>
          <h4 className="eyebrow mb-4 text-gold">Explore</h4>
          <ul className="space-y-2 text-sm">
            {[
              ['/about', 'About'],
              ['/services', 'Services'],
              ['/events', 'Upcoming Events'],
              ['/gallery', 'Gallery'],
              ['/testimonials', 'Testimonials'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-paper/80 hover:text-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4 text-gold">Get in touch</h4>
          <ul className="space-y-3 text-sm text-paper/80">
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
              <a href={`tel:${settings.phone}`} className="hover:text-gold transition-colors">
                {settings.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
              <a href={`mailto:${settings.email}`} className="hover:text-gold transition-colors break-all">
                {settings.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>{settings.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4 text-gold">Follow along</h4>
          <a
            href={settings.instagram_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-4 py-2 text-sm font-semibold text-gold hover:bg-gold hover:text-ink transition-colors"
          >
            <Instagram size={16} /> @cityevents.official
          </a>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="container-ce py-5 flex flex-col sm:flex-row gap-2 items-center justify-between text-xs text-paper/60">
          <p>© {year} {settings.company_name}, Nagpur. All rights reserved.</p>
          <Link to="/admin/login" className="hover:text-gold transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
