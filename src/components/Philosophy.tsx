'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const principles = [
  {
    label: '001',
    title: 'The Red Shift',
    text: 'Light from distant galaxies stretches toward the red end of the spectrum as the universe expands. Every photon that reaches us carries the signature of cosmic recession — a frequency pulled low, a wavelength drawn long. This is the fundamental metaphor: transformation through displacement.',
  },
  {
    label: '002', 
    title: 'The Mantra',
    text: 'A mantra is a vibration that reshapes consciousness through repetition. Not meaning conveyed through words, but meaning generated through resonance. The geometry of a repeated pattern creates structure where there was noise. Sound becomes architecture.',
  },
  {
    label: '003',
    title: 'The Deep Field',
    text: 'The Hubble Deep Field revealed 10,000 galaxies in a patch of sky the size of a grain of sand held at arm\'s length. Every point of light, a billion suns. Every silence between them, an unimaginable distance. The music maps this terrain — from the void between stars to the atomic vibrations within.',
  },
]

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const animate = async () => {
      // Reduced motion: words stay fully legible, no blur/scrub reveal.
      if (prefersReducedMotion()) return

      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const items = sectionRef.current?.querySelectorAll('.philosophy-item')
      if (!items) return

      items.forEach((item) => {
        const words = item.querySelectorAll('.word-reveal')
        gsap.set(words, { opacity: 0.05, scale: 0.97, filter: 'blur(8px)' })
        
        gsap.to(words, {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          stagger: 0.02,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 1.5,
          },
        })
      })
    }
    animate()
  }, [])

  return (
    <section ref={sectionRef} id="philosophy" className="py-32 md:py-48">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">
          Philosophy /
        </div>

        <div className="space-y-32 md:space-y-48">
          {principles.map((p) => (
            <div key={p.label} className="philosophy-item">
              <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-accent mb-4">
                {p.label}
              </div>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-display font-[900] leading-[1.05] mb-6 text-light">
                {p.title}
              </h2>
              <div className="text-[15px] leading-[1.8] text-light-dim max-w-2xl">
                {p.text.split(' ').map((word, i) => (
                  <span key={i} className="word-reveal inline-block mr-[0.3em]">{word}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider-glow max-w-5xl mx-auto mt-32" />
    </section>
  )
}