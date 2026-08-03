import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GradientMesh } from '@/components/ui/GradientMesh'

export function ContactCTA() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-ce">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border-2 border-gold/25 bg-ink px-8 py-14 sm:py-20 text-center text-paper"
        >
          <GradientMesh variant="dark" />
          <div className="absolute inset-0 bg-dots bg-dots opacity-10" />
          <div className="relative">
            <p className="eyebrow mb-4 text-gold">Let's make it happen</p>
            <h2 className="text-3xl sm:text-5xl leading-tight mb-6 max-w-2xl mx-auto">
              Got an event in mind? Let's put City Events on stage.
            </h2>
            <div className="relative inline-block py-6 -my-6">
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-gold/60 via-gold/30 to-chili/25 blur-xl" />
              <Link
                to="/contact"
                className="group relative inline-flex items-center overflow-hidden rounded-full bg-chili px-8 py-4 font-bold text-paper shadow-[0_6px_0_0_#F0B429] hover:translate-y-[3px] hover:shadow-[0_3px_0_0_#F0B429] transition-all"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/25 skew-x-12 transition-transform duration-500 group-hover:translate-x-full" />
                <span className="relative">Talk to us</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
