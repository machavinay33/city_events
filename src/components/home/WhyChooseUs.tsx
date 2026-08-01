import { motion } from 'framer-motion'
import { Sparkles, Users, MapPin, HeartHandshake } from 'lucide-react'
import { GradientMesh } from '@/components/ui/GradientMesh'

const REASONS = [
  { icon: Sparkles, title: 'Curated, not generic', body: 'Every lineup is hand-picked from Nagpur\u2019s own artists — no filler acts.' },
  { icon: Users, title: 'Built for community', body: 'Free-entry, open-for-all nights designed so anyone can walk in and join.' },
  { icon: MapPin, title: 'Local, always', body: 'Cafes, rooftops and street corners across Nagpur — we know the city.' },
  { icon: HeartHandshake, title: 'Easy to book', body: 'One form, no back-and-forth. We handle the setup, sound and schedule.' },
]

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-ink text-paper">
      <GradientMesh variant="dark" />
      <div className="container-ce relative">
        <div className="mb-12 max-w-xl">
          <p className="eyebrow mb-3 text-gold">Why City Events</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">Made for the crowd that shows up</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl glass-dark p-6 transition-all duration-300 hover:shadow-glow hover:border-gold/50"
            >
              <reason.icon size={28} className="text-gold mb-4" />
              <h3 className="font-display text-lg mb-2">{reason.title}</h3>
              <p className="text-sm text-paper/70">{reason.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
