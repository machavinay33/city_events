import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useGallery } from '@/hooks/useContent'
import { Section } from '@/components/ui/Section'

export function GalleryPreview() {
  const { data: gallery } = useGallery()

  return (
    <Section eyebrow="From the archive" title="Moments from past nights">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {gallery.slice(0, 4).map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`overflow-hidden rounded-2xl border-2 border-gold/30 ${i === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'}`}
          >
            <img src={item.url} alt={item.caption} className="h-full w-full object-cover hover:scale-110 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/gallery" className="inline-flex items-center gap-2 font-bold text-gold hover:text-chili transition-colors">
          Open full gallery <span aria-hidden>→</span>
        </Link>
      </div>
    </Section>
  )
}
