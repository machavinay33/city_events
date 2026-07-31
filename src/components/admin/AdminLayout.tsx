import type { PropsWithChildren } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Home, Sparkles, CalendarDays, ClipboardList,
  UserCheck, Images, MessageSquareQuote, Settings, FolderOpen, LogOut,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/homepage', label: 'Homepage', icon: Home },
  { to: '/admin/services', label: 'Services', icon: Sparkles },
  { to: '/admin/events', label: 'Upcoming Events', icon: CalendarDays },
  { to: '/admin/bookings', label: 'Bookings', icon: ClipboardList },
  { to: '/admin/registrations', label: 'Event Registrations', icon: UserCheck },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { to: '/admin/media', label: 'Media Library', icon: FolderOpen },
  { to: '/admin/settings', label: 'Website Settings', icon: Settings },
]

export function AdminLayout({ children }: PropsWithChildren) {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r-2 border-ink bg-ink text-paper">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-paper/15">
          <img src="/assets/logo/city-events-logo.jpeg" alt="" className="h-9 w-9 rounded-lg border-2 border-gold object-cover" />
          <div>
            <p className="font-display text-lg leading-none text-gold">City Events</p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-paper/50">Admin</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-gold text-ink' : 'text-paper/75 hover:bg-paper/10',
                )
              }
            >
              <item.icon size={17} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 border-t border-paper/15 px-5 py-4 text-sm font-medium text-paper/70 hover:text-gold transition-colors"
        >
          <LogOut size={17} /> Sign out
        </button>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-3 text-paper">
          <span className="font-display text-lg text-gold">City Events Admin</span>
          <button onClick={handleSignOut} className="text-sm text-paper/70">Sign out</button>
        </header>
        <div className="lg:hidden overflow-x-auto border-b-2 border-ink bg-ink/95 px-2 py-2 flex gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold',
                  isActive ? 'bg-gold text-ink' : 'text-paper/70',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  )
}
