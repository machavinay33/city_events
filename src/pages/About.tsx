import { motion } from 'framer-motion'
import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/ui/Section'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { Stats } from '@/components/home/Stats'
import { PastPerformances } from '@/components/about/PastPerformances'
import { useHomepageContent } from '@/hooks/useContent'

export default function About() {
  const { data: home } = useHomepageContent()

  return (
    <>
      <PageHero page="about" eyebrow="About Us" title="A collective built by Nagpur, for Nagpur" description="City Events started as a handful of friends chasing open mics — now it's a running calendar of music, comedy, poetry and art across the city." />

      <Section eyebrow="Our story" title={home.about_title}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-lg text-paper/70 leading-relaxed"
        >
          {home.about_body} We believe the best nights aren't the most expensive ones — they're the ones where a
          room full of strangers ends up singing the same chorus. Every City Events night is designed around that:
          real local artists, a low barrier to walk in, and a crowd that actually participates.
        </motion.p>
      </Section>

      <PastPerformances />
      <Stats />
      <WhyChooseUs />
    </>
  )
}
