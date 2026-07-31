import { useHomepageContent } from '@/hooks/useContent'
import { useCounter } from '@/hooks/useCounter'

function StatBlock({ label, value }: { label: string; value: number }) {
  const { ref, value: current } = useCounter(value)
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-3xl sm:text-5xl text-chili">{current.toLocaleString('en-IN')}+</p>
      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-ink/60">{label}</p>
    </div>
  )
}

export function Stats() {
  const { data: home } = useHomepageContent()
  return (
    <section className="py-14 border-y-2 border-ink bg-gold-50">
      <div className="container-ce grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {home.stats.map((stat) => (
          <StatBlock key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  )
}
