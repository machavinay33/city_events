import { Hero } from '@/components/home/Hero'
import { ClientsMarquee } from '@/components/home/ClientsMarquee'
import { AboutPreview } from '@/components/home/AboutPreview'
import { VideoHighlight } from '@/components/home/VideoHighlight'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { Stats } from '@/components/home/Stats'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { EventsPreview } from '@/components/home/EventsPreview'
import { GalleryPreview } from '@/components/home/GalleryPreview'
import { TestimonialsPreview } from '@/components/home/TestimonialsPreview'
import { ContactCTA } from '@/components/home/ContactCTA'
import { useHomepageContent } from '@/hooks/useContent'

export default function Home() {
  const { data: home } = useHomepageContent()

  const renderSection = (key: string) => {
    switch (key) {
      case 'about': return <AboutPreview key="about" />
      case 'why-us': return <WhyChooseUs key="why-us" />
      case 'stats': return <Stats key="stats" />
      case 'services': return <ServicesPreview key="services" />
      case 'events': return <EventsPreview key="events" />
      case 'gallery': return <GalleryPreview key="gallery" />
      case 'testimonials': return <TestimonialsPreview key="testimonials" />
      case 'contact': return <ContactCTA key="contact" />
      default: return null
    }
  }

  return (
    <>
      <Hero />
      <ClientsMarquee />
      {/* 
        VideoHighlight is usually placed after About or WhyChooseUs, 
        but it's not in the section_order array yet. 
        We'll keep it here for now or we could add it to the dynamic list.
      */}
      {home.section_order.map((key, i) => {
        const section = renderSection(key)
        // Insert VideoHighlight after the first few sections if not explicitly ordered
        if (i === 2) {
          return (
            <div key="group-1">
              {section}
              <VideoHighlight />
            </div>
          )
        }
        return section
      })}
    </>
  )
}
