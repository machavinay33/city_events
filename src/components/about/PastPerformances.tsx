import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { usePastPerformances } from '@/hooks/useContent'
import { Section } from '@/components/ui/Section'

export function PastPerformances() {
  const { data: performances } = usePastPerformances()

  const withMedia = performances.filter((p) => p.media.length > 0)
  if (withMedia.length === 0) return null

  return (
    <Section
      eyebrow="Where we've played"
      title="Our Past Performances"
      description="A look back at some of the venues that have hosted City Events."
    >
      <div className="space-y-14">
        {withMedia.map((performance, pi) => (
          <motion.div
            key={performance.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: pi * 0.08 }}
          >
            <div className="mb-5 flex items-center gap-2">
              <MapPin size={18} className="text-gold" />
              <h3 className="font-display text-2xl text-paper">{performance.venue_name}</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {performance.media.map((item, mi) => (
                <div
                  key={mi}
                  className="aspect-square overflow-hidden rounded-2xl border-2 border-gold/30 bg-ink"
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.url}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img src={item.url} alt={performance.venue_name} className="h-full w-full object-cover" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
