import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import type { EventItem } from '@/types'
import { formatDate, formatTime } from '@/lib/utils'
import { TicketCard } from '@/components/ui/TicketCard'

export function EventCard({ event, onRegister, index = 0 }: { event: EventItem; onRegister: (event: EventItem) => void; index?: number }) {
  const seatsLeft = event.remaining_seats
  const isLow = event.total_seats > 0 && seatsLeft / event.total_seats <= 0.2

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <TicketCard
        rotate
        stub={
          <>
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink/50">Seats left</p>
              <p className={`font-display text-2xl ${isLow ? 'text-chili' : 'text-ink'}`}>{seatsLeft}</p>
            </div>
            <button
              onClick={() => onRegister(event)}
              disabled={seatsLeft <= 0}
              className="w-full sm:w-auto rounded-full bg-chili px-4 py-2 text-xs font-bold text-paper hover:bg-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {seatsLeft > 0 ? 'Register Now' : 'Sold Out'}
            </button>
          </>
        }
      >
        <div className="flex gap-4">
          {event.poster_url && (
            <img
              src={event.poster_url}
              alt={event.title}
              className="h-24 w-20 sm:h-28 sm:w-24 shrink-0 rounded-lg border-2 border-ink object-cover"
            />
          )}
          <div className="min-w-0">
            {event.is_featured && (
              <span className="inline-block mb-1.5 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
                Featured
              </span>
            )}
            <h3 className="font-display text-xl sm:text-2xl text-ink leading-tight mb-1">{event.title}</h3>
            <p className="text-sm text-ink/60 line-clamp-2 mb-2">{event.description}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/70 font-mono">
              <span className="inline-flex items-center gap-1"><Calendar size={12} /> {formatDate(event.event_date)}</span>
              <span className="inline-flex items-center gap-1"><Clock size={12} /> {formatTime(event.event_time)}</span>
              <span className="inline-flex items-center gap-1"><MapPin size={12} /> {event.venue}</span>
              <span className="inline-flex items-center gap-1"><Users size={12} /> {event.total_seats} cap</span>
            </div>
          </div>
        </div>
      </TicketCard>
    </motion.div>
  )
}
