import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/ui/Section'
import { useTestimonials } from '@/hooks/useContent'
import { TestimonialCard } from '@/components/testimonials/TestimonialCard'
import { ReviewModal } from '@/components/testimonials/ReviewModal'
import { useState, useCallback } from 'react'

export default function Testimonials() {
  const { data: testimonials } = useTestimonials()
  const [refreshKey, setRefreshKey] = useState(0)

  const handleReviewAdded = useCallback(() => {
    setRefreshKey((k) => k + 1)
  }, [])

  return (
    <>
      <PageHero page="testimonials" eyebrow="Word on the street" title="What people say after the lights go down" />
      <Section>
        <div className="flex flex-col items-end mb-8">
          <ReviewModal
            onReviewAdded={handleReviewAdded}
            buttonText="Add a Review"
            buttonSize="lg"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={`${t.id}-${refreshKey}`} testimonial={t} index={i} />
          ))}
        </div>
      </Section>
    </>
  )
}
