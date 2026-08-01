import { motion } from 'framer-motion'
import type { Service } from '@/types'

export function ServiceCard({ service, onBook, index = 0 }: { service: Service; onBook: (s: Service) => void; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-gold/0 to-chili/0 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60 group-hover:from-gold/40 group-hover:to-chili/20" />
      <div className="relative flex flex-col overflow-hidden rounded-3xl border-2 border-ink glass shadow-ticket transition-shadow duration-300 group-hover:shadow-glow-lg">
        <div className="aspect-[16/10] overflow-hidden relative">
          <img src={service.image_url} alt={service.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-2xl text-ink mb-2">{service.title}</h3>
          <p className="text-ink/60 text-sm flex-1 mb-5">{service.description}</p>
          <button
            onClick={() => onBook(service)}
            className="group/btn relative self-start overflow-hidden rounded-full bg-chili px-5 py-2.5 text-sm font-bold text-paper shadow-[0_4px_0_0_#0D1120] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#0D1120] transition-all"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/25 skew-x-12 transition-transform duration-500 group-hover/btn:translate-x-full" />
            <span className="relative">Book Service</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
