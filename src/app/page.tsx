import { Gatekeeper } from '@/components/Gatekeeper'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Philosophy } from '@/components/Philosophy'
import { Albums } from '@/components/Albums'
import { TrackVisualizer } from '@/components/TrackVisualizer'
import { VisualOS } from '@/components/VisualOS'
import { Listen } from '@/components/Listen'
import { Footer } from '@/components/Footer'
import { SmoothScroll } from '@/components/SmoothScroll'
import { CustomCursor } from '@/components/CustomCursor'
import { AmbientOrb } from '@/components/AmbientOrb'

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <AmbientOrb />
      <Gatekeeper />
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Philosophy />
        <Albums />
        <TrackVisualizer />
        <VisualOS />
        <Listen />
      </main>
      <Footer />
    </SmoothScroll>
  )
}