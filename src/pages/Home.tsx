import { Hero } from '@/components/home/Hero'
import { AboutPreview } from '@/components/home/AboutPreview'
import { VideoHighlight } from '@/components/home/VideoHighlight'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { Stats } from '@/components/home/Stats'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { EventsPreview } from '@/components/home/EventsPreview'
import { GalleryPreview } from '@/components/home/GalleryPreview'
import { TestimonialsPreview } from '@/components/home/TestimonialsPreview'
import { ContactCTA } from '@/components/home/ContactCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <VideoHighlight />
      <WhyChooseUs />
      <Stats />
      <ServicesPreview />
      <EventsPreview />
      <GalleryPreview />
      <TestimonialsPreview />
      <ContactCTA />
    </>
  )
}
