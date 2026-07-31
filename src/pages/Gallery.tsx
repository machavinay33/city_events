import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/ui/Section'
import { useGallery } from '@/hooks/useContent'
import { MasonryGallery } from '@/components/gallery/MasonryGallery'

export default function Gallery() {
  const { data: gallery } = useGallery()

  return (
    <>
      <PageHero page="gallery" eyebrow="The archive" title="Moments from past nights" description="A running record of the crowds, the sets and the sing-alongs." />
      <Section>
        <MasonryGallery items={gallery} />
      </Section>
    </>
  )
}
