import { motion } from 'framer-motion'
import type { PageKey } from '@/types'
import { usePageCover } from '@/hooks/useContent'

interface PageHeroProps {
  page: PageKey
  eyebrow: string
  title: string
  description?: string
}

export function PageHero({ page, eyebrow, title, description }: PageHeroProps) {
  const { data: cover } = usePageCover(page)

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 opacity-25">
        <img src={cover.image_url} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
      <div className="container-ce relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-4 text-gold"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl leading-[1.02] max-w-3xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-xl text-paper/75 text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
