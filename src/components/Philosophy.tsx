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
    let io: IntersectionObserver | null = null

    const setup = async () => {
      const root = sectionRef.current
      if (!root) return
      const items = Array.from(root.querySelectorAll('.philosophy-item'))
      if (!items.length) return

      const gsap = (await import('gsap')).default

      if (prefersReducedMotion()) {
        items.forEach((item) =>
          gsap.set(item.querySelectorAll('.word-reveal'), { opacity: 1, scale: 1, filter: 'none' })
        )
        return
      }

      items.forEach((item) =>
        gsap.set(item.querySelectorAll('.word-reveal'), { opacity: 0.65, scale: 0.98, filter: 'blur(2px)' })
      )

      io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            gsap.to(entry.target.querySelectorAll('.word-reveal'), {
              opacity: 1, scale: 1, filter: 'blur(0px)',
              stagger: 0.015, duration: 0.5, ease: 'power2.out',
            })
            obs.unobserve(entry.target)
          })
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
      )
      items.forEach((item) => io!.observe(item))
    }
    setup()

    return () => io?.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="philosophy" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="section-label mb-12">
          Philosophy /
        </div>

        <div className="space-y-16 md:space-y-24">
          {principles.map((p) => (
            <div key={p.label} className="philosophy-item grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-5">
                <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-accent mb-4">
                  {p.label}
                </div>
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display font-[900] leading-[1.05] text-light">
                  {p.title}
                </h2>
              </div>
              <div className="md:col-span-7 text-[15px] leading-[1.8] text-light-dim md:pt-3">
                {p.text.split(' ').map((word, i) => (
                  <span key={i} className="word-reveal inline-block mr-[0.3em]">{word}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider-glow max-w-6xl mx-auto mt-16" />
    </section>
  )
}
