import { useState } from 'react'
import { motion } from 'framer-motion'
import type { GalleryMedia } from '@/types'
import { Lightbox } from './Lightbox'

export function MasonryGallery({ items }: { items: GalleryMedia[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="columns-2 sm:columns-3 gap-4 [column-fill:_balance]">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => setOpenIndex(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
            className="mb-4 block w-full overflow-hidden rounded-2xl border-2 border-ink break-inside-avoid group relative"
          >
            <img src={item.url} alt={item.caption} loading="lazy" className="w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors" />
          </motion.button>
        ))}
      </div>
      <Lightbox items={items} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </>
  )
}
