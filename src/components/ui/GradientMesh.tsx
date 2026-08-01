import { cn } from '@/lib/utils'

// Soft, slow-drifting blurred color blobs — the "gradient mesh" backdrop used
// behind hero/dark sections for depth without weighing the page down.
// Respects reduced-motion by simply not animating (blobs stay static).
export function GradientMesh({ variant = 'light', className }: { variant?: 'light' | 'dark'; className?: string }) {
  const gold = variant === 'dark' ? 'bg-gold/25' : 'bg-gold/30'
  const chili = variant === 'dark' ? 'bg-chili/20' : 'bg-chili/15'
  const ink = variant === 'dark' ? 'bg-ink/40' : 'bg-ink/10'

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className={cn('absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl animate-blob', gold)} />
      <div className={cn('absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl animate-blob-delay', chili)} />
      <div className={cn('absolute -bottom-32 left-1/4 h-80 w-80 rounded-full blur-3xl animate-blob', ink)} />
    </div>
  )
}
