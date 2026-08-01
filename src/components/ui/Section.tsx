import type { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends PropsWithChildren {
  className?: string
  id?: string
  eyebrow?: string
  title?: string
  description?: string
  /** Set true only for sections with their own light-colored background
   *  (e.g. the gold accent bands) so heading text renders dark instead
   *  of the page-wide light-on-navy default. */
  light?: boolean
}

export function Section({ className, id, eyebrow, title, description, light, children }: SectionProps) {
  return (
    <section id={id} className={cn('relative py-16 sm:py-24', className)}>
      <div className="container-ce">
        {(eyebrow || title) && (
          <div className="mb-10 sm:mb-14 max-w-2xl">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && (
              <h2 className={cn('text-3xl sm:text-4xl lg:text-5xl leading-[1.05]', light ? 'text-ink' : 'text-paper')}>
                {title}
              </h2>
            )}
            {description && (
              <p className={cn('mt-4 text-base sm:text-lg font-body', light ? 'text-ink/70' : 'text-paper/70')}>
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
