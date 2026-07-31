import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEvents } from '@/hooks/useContent'
import { Section } from '@/components/ui/Section'
import { EventCard } from '@/components/events/EventCard'
import { RegisterModal } from '@/components/events/RegisterForm'
import type { EventItem } from '@/types'

export function EventsPreview() {
  const { data: events } = useEvents()
  const [selected, setSelected] = useState<EventItem | null>(null)

  if (events.length === 0) return null

  return (
    <Section eyebrow="Don't miss out" title="Upcoming events" description="Free to register, open to all. Seats are limited so grab yours early.">
      <div className="grid gap-6 max-w-3xl mx-auto">
        {events.slice(0, 2).map((event, i) => (
          <EventCard key={event.id} event={event} index={i} onRegister={setSelected} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/events" className="inline-flex items-center gap-2 font-bold text-chili hover:text-ink transition-colors">
          View all events <span aria-hidden>→</span>
        </Link>
      </div>
      <RegisterModal event={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}
