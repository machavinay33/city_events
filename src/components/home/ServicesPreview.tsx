import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useServices } from '@/hooks/useContent'
import { Section } from '@/components/ui/Section'

export function ServicesPreview() {
  const { data: services } = useServices()

  return (
    <Section eyebrow="What we do" title="Services, built for a stage" description="Pick a format — we bring the artists, the sound and the run-of-show.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.slice(0, 5).map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative overflow-hidden rounded-2xl border-2 border-ink bg-white"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={service.image_url}
                alt={service.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl text-ink mb-1">{service.title}</h3>
              <p className="text-sm text-ink/60 line-clamp-2">{service.description}</p>
            </div>
          </motion.div>
        ))}
        <Link
          to="/services"
          className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gold/40 p-8 text-center hover:border-chili hover:bg-chili/10 transition-colors"
        >
          <span className="font-display text-xl text-paper">See all services</span>
          <span className="text-chili font-bold">→</span>
        </Link>
      </div>
    </Section>
  )
}
