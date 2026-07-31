import { Mail, Phone, Instagram, MapPin, MessageCircle } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/ui/Section'
import { ContactForm } from '@/components/contact/ContactForm'
import { useSiteSettings } from '@/hooks/useContent'
import { whatsappLink } from '@/lib/utils'

export default function Contact() {
  const { data: settings } = useSiteSettings()

  const items = [
    { icon: Phone, label: 'Phone', value: settings.phone, href: `tel:${settings.phone}` },
    { icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
    { icon: Instagram, label: 'Instagram', value: '@cityevents.official', href: settings.instagram_url },
    { icon: MapPin, label: 'Based in', value: settings.address, href: undefined },
  ]

  return (
    <>
      <PageHero page="contact" eyebrow="Reach out" title="Let's plan your next night" description="Fastest way to reach us is WhatsApp — but pick whatever works for you." />
      <Section>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
          <div className="space-y-5">
            {items.map((item) => (
              <div key={item.label} className="flex items-start gap-4 rounded-2xl border-2 border-ink bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-ink">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-ink/50">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="font-semibold text-ink hover:text-chili transition-colors break-all">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-ink">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <a
              href={whatsappLink(settings.whatsapp_number, "Hi City Events! I'd like to talk about an event.")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-bold text-white hover:brightness-95 transition-all"
            >
              <MessageCircle size={20} /> Chat on WhatsApp
            </a>

            <div className="overflow-hidden rounded-2xl border-2 border-ink">
              {settings.google_maps_embed ? (
                <div dangerouslySetInnerHTML={{ __html: settings.google_maps_embed }} />
              ) : (
                <iframe
                  title="City Events location — Nagpur"
                  src="https://www.google.com/maps?q=Nagpur,Maharashtra,India&output=embed"
                  className="h-64 w-full"
                  loading="lazy"
                />
              )}
            </div>
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  )
}
