import type { PropsWithChildren, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// The brand's signature element: an event-ticket stub, complete with
// punched side-notches and a dashed tear line, echoing the CE stamp/badge logo.
// Now with a glass surface and a soft glow that intensifies on hover.
export function TicketCard({
  children,
  stub,
  className,
  rotate = false,
}: PropsWithChildren<{ stub?: ReactNode; className?: string; rotate?: boolean }>) {
  return (
    <div className={cn('group relative', rotate && 'sm:-rotate-1 hover:rotate-0 transition-transform duration-300')}>
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold/0 via-gold/0 to-chili/0 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60 group-hover:from-gold/40 group-hover:to-chili/20" />
      <div
        className={cn(
          'relative flex flex-col sm:flex-row glass rounded-2xl overflow-hidden border-2 border-ink shadow-ticket transition-shadow duration-300 group-hover:shadow-glow-lg',
          className,
        )}
      >
        <div className="flex-1 p-6 sm:p-8">{children}</div>
        {stub && (
          <div className="ticket-edge relative flex sm:w-40 shrink-0 flex-row sm:flex-col items-center justify-center gap-2 border-t-2 sm:border-t-0 sm:border-l-2 border-dashed border-ink/40 glass-gold px-6 py-4 sm:py-6">
            {stub}
          </div>
        )}
      </div>
    </div>
  )
}
