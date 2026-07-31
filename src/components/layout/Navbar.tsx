import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled ? 'bg-paper/90 backdrop-blur-md border-b-2 border-ink' : 'bg-transparent',
      )}
    >
      <div className="container-ce flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <img
            src="/assets/logo/city-events-logo.jpeg"
            alt="City Events logo"
            className="h-11 w-11 rounded-lg border-2 border-ink object-cover"
          />
          <span className="font-display text-xl text-ink leading-none hidden sm:block">City Events</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'px-4 py-2 text-sm font-semibold uppercase tracking-wide rounded-full transition-colors',
                  isActive ? 'bg-ink text-gold' : 'text-ink hover:bg-ink/10',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-chili px-5 py-2.5 text-sm font-bold text-paper shadow-[0_4px_0_0_#0D1120] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#0D1120] transition-all"
          >
            Book Us
          </Link>
        </div>

        <button
          className="lg:hidden rounded-full border-2 border-ink p-2 text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t-2 border-ink bg-paper"
          >
            <div className="container-ce flex flex-col py-4">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'py-3 text-lg font-semibold border-b border-line',
                      isActive ? 'text-chili' : 'text-ink',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
