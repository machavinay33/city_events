import { useTestimonials } from '@/hooks/useContent'
import { Section } from '@/components/ui/Section'
import { TestimonialCard } from '@/components/testimonials/TestimonialCard'
import { ReviewModal } from '@/components/testimonials/ReviewModal'
import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function TestimonialsPreview() {
  const { data: testimonials } = useTestimonials()
  const [refreshKey, setRefreshKey] = useState(0)

  // Force a refetch by remounting the hook
  const handleReviewAdded = useCallback(() => {
    setRefreshKey((k) => k + 1)
  }, [])

  return (
    <Section
      eyebrow="Word on the street"
      title="What the crowd says"
      className="bg-gold-50"
      light
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.slice(0, 3).map((t, i) => (
          <TestimonialCard key={`${t.id}-${refreshKey}`} testimonial={t} index={i} />
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10">
        <ReviewModal onReviewAdded={handleReviewAdded} />
        <Link
          to="/testimonials"
          className="inline-flex items-center gap-2 text-ink/60 hover:text-chili transition-colors text-sm font-body font-medium"
        >
          See all reviews <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  )
}
