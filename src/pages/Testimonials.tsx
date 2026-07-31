import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/ui/Section'
import { useTestimonials } from '@/hooks/useContent'
import { TestimonialCard } from '@/components/testimonials/TestimonialCard'

export default function Testimonials() {
  const { data: testimonials } = useTestimonials()

  return (
    <>
      <PageHero page="testimonials" eyebrow="Word on the street" title="What people say after the lights go down" />
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </Section>
    </>
  )
}
