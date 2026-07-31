import type { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

export function Badge({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-ink text-gold font-mono text-xs uppercase tracking-wider px-3 py-1.5',
        className,
      )}
    >
      {children}
    </span>
  )
}
