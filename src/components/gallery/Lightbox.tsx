import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryMedia } from '@/types'

interface LightboxProps {
  items: GalleryMedia[]
  index: number | null
  onClose: () => void
  onNavigate: (i: number) => void
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const item = index !== null ? items[index] : null

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute top-5 right-5 rounded-full border-2 border-paper p-2 text-paper hover:bg-paper hover:text-ink transition-colors"
          >
            <X size={22} />
          </button>

          {index !== null && index > 0 && (
            <button
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); onNavigate(index - 1) }}
              className="absolute left-4 rounded-full border-2 border-paper p-2 text-paper hover:bg-paper hover:text-ink transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          {index !== null && index < items.length - 1 && (
            <button
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); onNavigate(index + 1) }}
              className="absolute right-4 rounded-full border-2 border-paper p-2 text-paper hover:bg-paper hover:text-ink transition-colors"
            >
              <ChevronRight size={22} />
            </button>
          )}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full"
          >
            <img src={item.url} alt={item.caption} className="w-full rounded-2xl border-2 border-gold max-h-[80vh] object-contain bg-ink" />
            {item.caption && <p className="mt-3 text-center text-paper/70 text-sm">{item.caption}</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
