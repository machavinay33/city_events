import { motion } from 'framer-motion'
import { Play, Sparkles } from 'lucide-react'
import { useHomepageContent } from '@/hooks/useContent'

export function VideoHighlight() {
  const { data: home } = useHomepageContent()
  
  if (!home.highlight_video_url) return null

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-ink">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-dots-dark opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-chili/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-ce relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          {/* Video Container with "Ticket" style edges or just sleek rounded corners */}
          <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] sm:rounded-[3rem] border-2 border-gold/20 shadow-glow-lg bg-ink/50">
            <video
              src={home.highlight_video_url}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] sm:rounded-[3rem]" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
              >
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold">
                    <Sparkles size={14} />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Nagpur's Energy</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-5xl text-paper leading-[1.1] mb-2">
                    {home.highlight_video_title || 'Moments that turn into memories.'}
                  </h2>
                  <p className="text-paper/60 text-sm sm:text-lg font-body max-w-md">
                    From street sessions to grand stages, we bring the best of Nagpur's talent to life.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex flex-col items-end text-right mr-2">
                    <span className="text-paper font-bold text-sm uppercase tracking-tighter">Live Highlight</span>
                    <span className="text-paper/40 text-[10px] font-mono">2026 SEASON</span>
                  </div>
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink shadow-glow transition-transform hover:scale-110 active:scale-95 cursor-pointer">
                    <Play size={24} fill="currentColor" className="ml-1" />
                    <div className="absolute inset-0 rounded-full border-2 border-gold animate-ping opacity-20" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative frame elements */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-gold/30 rounded-tl-3xl pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-chili/30 rounded-br-3xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  )
}
