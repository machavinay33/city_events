import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useHomepageContent } from '@/hooks/useContent'

export function AboutPreview() {
  const { data: home } = useHomepageContent()

  return (
    <section className="py-16 sm:py-24">
      <div className="container-ce grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-3">Who we are</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.05] text-paper mb-5">{home.about_title}</h2>
          <p className="text-paper/70 text-lg mb-7">{home.about_body}</p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-bold text-gold hover:text-chili transition-colors"
          >
            More about City Events <span aria-hidden>→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          <img src="/assets/gallery/gallery-04.jpeg" alt="" className="col-span-2 h-48 sm:h-56 w-full rounded-2xl border-2 border-gold/30 object-cover" />
          <img src="/assets/gallery/gallery-03.jpeg" alt="" className="h-32 sm:h-40 w-full rounded-2xl border-2 border-gold/30 object-cover" />
          <img src="/assets/gallery/gallery-01.jpeg" alt="" className="h-32 sm:h-40 w-full rounded-2xl border-2 border-gold/30 object-cover" />
        </motion.div>
      </div>
    </section>
  )
}
