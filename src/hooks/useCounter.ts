import { useEffect, useRef, useState } from 'react'

// Counts up from 0 to `end` once the element scrolls into view.
export function useCounter(end: number, durationMs = 1400) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true)
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setValue(end)
      return
    }
    let raf: number
    const startTime = performance.now()
    function tick(now: number) {
      const progress = Math.min(1, (now - startTime) / durationMs)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * end))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, end, durationMs])

  return { ref, value }
}
