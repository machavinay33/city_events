import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

// A short first-load splash built from the brand mark — not shown again
// after the first paint of a session (sessionStorage), so repeat page
// navigations inside the SPA don't re-trigger it.
export function Loader() {
  const [show, setShow] = useState(() => !sessionStorage.getItem('ce-loaded'))

  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('ce-loaded', '1')
    }, 1000)
    return () => clearTimeout(t)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gold blur-2xl"
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src="/assets/logo/city-events-logo.jpeg"
              alt=""
              className="relative h-20 w-20 rounded-2xl border-2 border-gold"
              initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
