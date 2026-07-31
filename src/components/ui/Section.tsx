import type { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends PropsWithChildren {
  className?: string
  id?: string
  eyebrow?: string
  title?: string
  description?: string
  dotted?: boolean
}

export function Section({ className, id, eyebrow, title, description, dotted, children }: SectionProps) {
  return (
    <section id={id} className={cn('relative py-16 sm:py-24', dotted && 'bg-dots bg-dots', className)}>
      <div className="container-ce">
        {(eyebrow || title) && (
          <div className="mb-10 sm:mb-14 max-w-2xl">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.05] text-ink">{title}</h2>}
            {description && <p className="mt-4 text-ink/70 text-base sm:text-lg font-body">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
