import { useState } from 'react'
import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/ui/Section'
import { useEvents } from '@/hooks/useContent'
import { EventCard } from '@/components/events/EventCard'
import { RegisterModal } from '@/components/events/RegisterForm'
import type { EventItem } from '@/types'

export default function Events() {
  const { data: events } = useEvents()
  const [selected, setSelected] = useState<EventItem | null>(null)

  return (
    <>
      <PageHero page="events" eyebrow="Save your seat" title="Upcoming events" description="Free registration. Seats are genuinely limited — first come, first seated." />
      <Section>
        {events.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-gold/30 p-16 text-center">
            <p className="font-display text-2xl text-paper mb-2">Nothing on the calendar right now</p>
            <p className="text-paper/60">Follow us on Instagram to hear about the next one first.</p>
          </div>
        ) : (
          <div className="grid gap-6 max-w-3xl mx-auto">
            {events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} onRegister={setSelected} />
            ))}
          </div>
        )}
      </Section>
      <RegisterModal event={selected} onClose={() => setSelected(null)} />
    </>
  )
}
