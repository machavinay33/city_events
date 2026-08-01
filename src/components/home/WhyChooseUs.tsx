import { motion } from 'framer-motion'
import { Sparkles, Users, MapPin, HeartHandshake, Star } from 'lucide-react'
import { GradientMesh } from '@/components/ui/GradientMesh'
import { useHomepageContent } from '@/hooks/useContent'

// Icons are assigned by position — the title/body text for each is fully
// editable from Admin -> Homepage -> Why Choose Us.
const ICONS = [Sparkles, Users, MapPin, HeartHandshake, Star]

export function WhyChooseUs() {
  const { data: home } = useHomepageContent()

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-ink text-paper">
      <GradientMesh variant="dark" />
      <div className="container-ce relative">
        <div className="mb-12 max-w-xl">
          <p className="eyebrow mb-3 text-gold">{home.why_us_eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">{home.why_us_title}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {home.why_us_reasons.map((reason, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl glass-dark p-6 transition-all duration-300 hover:shadow-glow hover:border-gold/50"
              >
                <Icon size={28} className="text-gold mb-4" />
                <h3 className="font-display text-lg mb-2">{reason.title}</h3>
                <p className="text-sm text-paper/70">{reason.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
