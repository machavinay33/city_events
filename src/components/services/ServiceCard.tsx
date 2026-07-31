import { motion } from 'framer-motion'
import type { Service } from '@/types'

export function ServiceCard({ service, onBook, index = 0 }: { service: Service; onBook: (s: Service) => void; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group flex flex-col overflow-hidden rounded-3xl border-2 border-ink bg-white"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img src={service.image_url} alt={service.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-ink mb-2">{service.title}</h3>
        <p className="text-ink/60 text-sm flex-1 mb-5">{service.description}</p>
        <button
          onClick={() => onBook(service)}
          className="self-start rounded-full bg-chili px-5 py-2.5 text-sm font-bold text-paper shadow-[0_4px_0_0_#0D1120] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#0D1120] transition-all"
        >
          Book Service
        </button>
      </div>
    </motion.div>
  )
}
