import { MessageCircle } from 'lucide-react'
import { useSiteSettings } from '@/hooks/useContent'
import { whatsappLink } from '@/lib/utils'

export function WhatsAppButton() {
  const { data: settings } = useSiteSettings()

  return (
    <a
      href={whatsappLink(settings.whatsapp_number, "Hi City Events! I'd like to know more about your events.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-ticket hover:scale-105 active:scale-95 transition-transform"
    >
      <MessageCircle size={26} />
    </a>
  )
}
