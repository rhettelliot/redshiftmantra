'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  // Intro animation
  useEffect(() => {
    const animate = async () => {
      const container = titleRef.current
      if (!container) return

      const badge = container.querySelector('.hero-badge')
      const label = container.querySelector('.hero-hw-label')
      const title = container.querySelector('.hero-title')
      const tagline = container.querySelector('.hero-tagline')
      const scroll = heroRef.current?.querySelector('.hero-scroll') ?? null

      if (prefersReducedMotion()) {
        ;[badge, label, title, tagline, scroll].forEach((el) => {
          if (el) (el as HTMLElement).style.opacity = '1'
        })
        return
      }

      const gsap = (await import('gsap')).default

      const tl = gsap.timeline({ delay: 0.2 })

      if (label) tl.fromTo(label,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
      if (badge) tl.fromTo(badge,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      if (title) tl.fromTo(title,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
        '-=0.3'
      )
      if (tagline) tl.fromTo(tagline,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      if (scroll) tl.fromTo(scroll,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.3'
      )
    }
    animate()
  }, [])

  return (
    <>
      {/* Silkscreen hardware label */}
      <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-7 flex items-center justify-between">
          <span className="hero-hw-label font-mono text-[9px] tracking-[0.25em] uppercase text-light-muted/80" style={{ opacity: 0 }}>
            RSM-001 // COSMIC OBSERVATORY
          </span>
          <span className="hero-hw-label font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted/50 hidden sm:inline" style={{ opacity: 0 }}>
            MANTEIS RECORDINGS // 2025
          </span>
        </div>
      </div>

      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--void)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div ref={titleRef} className="max-w-3xl">
            <div className="hero-badge section-label mb-6" style={{ opacity: 0 }}>
              <span className="badge badge-signal">Electronic / Synthwave</span>
            </div>

            <h1 className="hero-title text-[clamp(3rem,10vw,8rem)] leading-[0.9] mb-4" style={{ opacity: 0 }}>
              <span className="block hollow-text">Red Shift</span>
              <span className="block text-accent">Mantra</span>
            </h1>

            <p className="hero-tagline font-mono text-[11px] tracking-[0.25em] uppercase text-light-muted mt-8 max-w-md" style={{ opacity: 0 }}>
              The geometry of sound · The transmutation of matter
            </p>

            <div className="hero-tagline hidden md:flex items-center gap-4 mt-10" style={{ opacity: 0 }}>
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted">
                SIGNAL
              </span>
              <div className="w-16 h-[1px] bg-accent/40" />
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-accent">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-12 left-6 md:left-12 z-20 flex flex-col items-start gap-2" style={{ opacity: 0 }}>
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted">
            Scroll
          </span>
          <div className="scroll-indicator-line w-[1px] h-12 bg-accent/70" />
        </div>
      </section>
    </>
  )
}
