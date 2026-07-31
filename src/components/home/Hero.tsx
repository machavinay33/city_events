import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mic2, PartyPopper, Star } from 'lucide-react'
import { useHomepageContent } from '@/hooks/useContent'
import { useEvents } from '@/hooks/useContent'
import { formatDate } from '@/lib/utils'

const MARQUEE_ITEMS = [
  "Ginchi's Cafe", 'Villains — The Drink & Dinner', 'Open Mic Nights', 'Street Sessions',
  'Bhajan Jams', 'Poetry Circles', 'Stand-up Sets', 'Nagpur, Maharashtra',
]

export function Hero() {
  const { data: home } = useHomepageContent()
  const { data: events } = useEvents()
  const nextEvent = events[0]

  return (
    <section className="relative overflow-hidden bg-paper pt-24 sm:pt-32 pb-12">
      <div className="absolute inset-0 bg-dots bg-dots opacity-40" />
      <div className="pointer-events-none absolute -top-10 left-6 text-gold-300 hidden sm:block">
        <PartyPopper size={64} className="animate-floatSlow" style={{ ['--r' as any]: '-12deg' }} />
      </div>
      <div className="pointer-events-none absolute top-24 right-8 text-chili/70 hidden lg:block">
        <Star size={40} className="animate-floatSlow" style={{ ['--r' as any]: '10deg', animationDelay: '1s' }} />
      </div>

      <div className="container-ce relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-1.5"
          >
            <Mic2 size={14} className="text-chili" />
            <span className="font-mono text-xs uppercase tracking-wider">Nagpur's Live Events Collective</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl leading-[0.98] text-ink whitespace-pre-line">
            {home.hero_title.split('\n').map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              >
                {i === 1 ? <span className="text-chili">{line}</span> : line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 max-w-lg text-base sm:text-lg text-ink/70"
          >
            {home.hero_subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              to="/events"
              className="inline-flex items-center rounded-full bg-chili px-5 py-3 sm:px-7 sm:py-3.5 font-bold text-paper shadow-[0_4px_0_0_#0D1120] hover:translate-y-[3px] hover:shadow-[0_3px_0_0_#0D1120] transition-all text-sm sm:text-base"
            >
              See Upcoming Events
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center rounded-full border-2 border-ink px-7 py-3.5 font-bold text-ink hover:bg-ink hover:text-gold transition-colors"
            >
              Book a Service
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          whileHover={{ rotate: 0 }}
          className="relative mx-auto w-full max-w-xs sm:max-w-sm mt-8 lg:mt-0"
        >
          <div className="ticket-edge relative overflow-hidden rounded-3xl border-2 border-ink bg-white shadow-ticket">
            {home.hero_media_url && (
              <img
                src={home.hero_media_url}
                alt="City Events live poster"
                className="aspect-[4/5] w-full object-cover"
              />
            )}
            {nextEvent && (
              <div className="border-t-2 border-dashed border-ink/40 bg-gold-50 px-5 py-4">
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink/60">Up next</p>
                <p className="font-display text-lg text-ink leading-tight">{nextEvent.title}</p>
                <p className="text-sm text-ink/70">{formatDate(nextEvent.event_date)} · {nextEvent.venue}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="relative mt-16 border-y-2 border-ink bg-ink py-3 overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-3 font-display text-lg text-gold">
              {item} <span className="text-chili">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
