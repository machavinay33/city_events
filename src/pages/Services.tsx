import { useState } from 'react'
import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/ui/Section'
import { useServices } from '@/hooks/useContent'
import { ServiceCard } from '@/components/services/ServiceCard'
import { BookingModal } from '@/components/services/BookingForm'
import type { Service } from '@/types'

export default function Services() {
  const { data: services } = useServices()
  const [selected, setSelected] = useState<Service | null>(null)

  return (
    <>
      <PageHero page="services" eyebrow="What we do" title="Services built for a stage" description="Every format below is run end-to-end by us — artists, sound, and flow. No prices listed; tell us your event and we'll quote it." />
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} onBook={setSelected} />
          ))}
        </div>
      </Section>
      <BookingModal service={selected} onClose={() => setSelected(null)} />
    </>
  )
}
