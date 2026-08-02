import { useClients } from '@/hooks/useContent'

export function ClientsMarquee() {
  const { data: clients } = useClients()
  if (clients.length === 0) return null

  // Duplicated once so the marquee loops seamlessly (see animate-marquee: translateX 0 -> -50%).
  const loop = [...clients, ...clients]

  return (
    <section className="relative overflow-hidden border-y-2 border-gold/15 bg-ink py-12 sm:py-14">
      <div className="container-ce relative mb-8">
        <p className="text-center eyebrow text-gold">Trusted by</p>
        <h2 className="text-center font-display text-2xl sm:text-3xl text-paper mt-2">Our Clients</h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-ink to-transparent" />

        <div className="flex w-max animate-marquee gap-5">
          {loop.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="group flex h-28 w-52 sm:h-32 sm:w-60 shrink-0 items-center justify-center rounded-2xl border-2 border-gold/20 bg-white/[0.04] transition-all duration-300 hover:border-gold/60 hover:bg-white/[0.08] hover:shadow-glow"
            >
              {client.logo_url ? (
                <img
                  src={client.logo_url}
                  alt={client.name}
                  className="max-h-20 sm:max-h-24 max-w-[85%] rounded-lg object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                />
              ) : (
                <span className="px-4 text-center font-display text-lg sm:text-xl text-gold/70 transition-colors duration-300 group-hover:text-gold">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
