import { useTestimonials } from '@/hooks/useContent'
import { Section } from '@/components/ui/Section'
import { TestimonialCard } from '@/components/testimonials/TestimonialCard'

export function TestimonialsPreview() {
  const { data: testimonials } = useTestimonials()

  return (
    <Section eyebrow="Word on the street" title="What the crowd says" className="bg-gold-50">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.slice(0, 3).map((t, i) => (
          <TestimonialCard key={t.id} testimonial={t} index={i} />
        ))}
      </div>
    </Section>
  )
}
