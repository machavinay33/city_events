import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function ContactCTA() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-ce">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border-2 border-ink bg-ink px-5 sm:px-8 py-10 sm:py-20 text-center text-paper"
        >
          <div className="absolute inset-0 bg-dots bg-dots opacity-10" />
          <p className="eyebrow mb-4 text-gold">Let's make it happen</p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl leading-tight mb-6 max-w-2xl mx-auto">
            Got an event in mind? Let's put City Events on stage.
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-chili px-6 py-3 sm:px-8 sm:py-4 font-bold text-paper shadow-[0_4px_0_0_#F0B429] hover:translate-y-[3px] hover:shadow-[0_3px_0_0_#F0B429] transition-all text-sm sm:text-base"
          >
            Talk to us
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
