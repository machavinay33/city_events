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

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'transition-all duration-500',
          scrolled ? 'mx-3 mt-3 sm:mx-6 sm:mt-4 rounded-2xl glass-dark shadow-glass' : 'bg-transparent',
        )}
      >
        <div className="container-ce flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3 shrink-0 group" onClick={() => setOpen(false)}>
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gold blur-md opacity-0 group-hover:opacity-60 transition-opacity" />
              <img
                src="/assets/logo/city-events-logo.jpeg"
                alt="City Events logo"
                className="relative h-11 w-11 rounded-lg border-2 border-gold object-cover transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
              />
            </div>
            <span className="font-display text-lg sm:text-xl text-paper leading-none">City Events</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative px-4 py-2 text-sm font-semibold uppercase tracking-wide rounded-full transition-colors',
                    isActive ? 'text-ink' : 'text-paper/70 hover:text-paper',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-gold shadow-glow"
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-chili px-5 py-2.5 text-sm font-bold text-paper shadow-[0_4px_0_0_#0D1120] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#0D1120] transition-all"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/25 skew-x-12 transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative">Book Us</span>
            </Link>
          </div>

          <button
            className="lg:hidden rounded-full border-2 border-gold p-2 text-gold"
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
              className="lg:hidden overflow-hidden border-t border-gold/15 glass-dark"
            >
              <div className="container-ce flex flex-col py-4">
                {LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'block py-3 text-lg font-semibold border-b border-gold/10',
                          isActive ? 'text-gold' : 'text-paper',
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
