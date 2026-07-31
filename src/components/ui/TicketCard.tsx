import type { PropsWithChildren, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// The brand's signature element: an event-ticket stub, complete with
// punched side-notches and a dashed tear line, echoing the CE stamp/badge logo.
export function TicketCard({
  children,
  stub,
  className,
  rotate = false,
}: PropsWithChildren<{ stub?: ReactNode; className?: string; rotate?: boolean }>) {
  return (
    <div
      className={cn(
        'relative flex flex-col sm:flex-row bg-white/70 backdrop-blur-sm border-2 border-ink rounded-2xl overflow-hidden shadow-ticket',
        rotate && 'sm:-rotate-1 hover:rotate-0 transition-transform duration-300',
        className,
      )}
    >
      <div className="flex-1 p-6 sm:p-8">{children}</div>
      {stub && (
        <div className="ticket-edge relative flex sm:w-40 shrink-0 flex-row sm:flex-col items-center justify-center gap-2 border-t-2 sm:border-t-0 sm:border-l-2 border-dashed border-ink/40 bg-gold-50 px-6 py-4 sm:py-6">
          {stub}
        </div>
      )}
    </div>
  )
}
