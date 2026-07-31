import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import type { Testimonial } from '@/types'

export function TestimonialCard({ testimonial, index = 0 }: { testimonial: Testimonial; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="relative rounded-2xl border-2 border-ink bg-white p-5 sm:p-6"
    >
      <Quote size={28} className="text-gold mb-3" />
      <p className="text-ink/80 mb-5">{testimonial.quote}</p>
      <div className="flex items-center gap-3">
        {testimonial.photo_url ? (
          <img src={testimonial.photo_url} alt={testimonial.name} className="h-10 w-10 rounded-full border-2 border-ink object-cover" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-gold-100 font-display text-ink">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-ink text-sm">{testimonial.name}</p>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} className={i < testimonial.rating ? 'fill-gold text-gold' : 'text-ink/20'} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
