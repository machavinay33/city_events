import type { PropsWithChildren } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsAppButton'

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
