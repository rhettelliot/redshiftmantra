'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animate = async () => {
      const container = titleRef.current
      if (!container) return

      const badge = container.querySelector('.hero-badge')
      const title = container.querySelector('.hero-title')
      const tagline = container.querySelector('.hero-tagline')
      const scroll = heroRef.current?.querySelector('.hero-scroll') ?? null

      // Reduced motion: reveal everything instantly, skip the cinematic intro.
      if (prefersReducedMotion()) {
        ;[badge, title, tagline, scroll].forEach((el) => {
          if (el) (el as HTMLElement).style.opacity = '1'
        })
        return
      }

      const gsap = (await import('gsap')).default

      const tl = gsap.timeline({ delay: 0.2 })

      if (badge) tl.fromTo(badge,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
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
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(255,77,0,0.04) 0%, rgba(0,0,0,0) 70%)' }}
    >
      {/* Skeletal perspective grid */}
      <div
        className="absolute bottom-0 left-[-50%] w-[200%] h-[60%]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(1000px) rotateX(70deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Content */}
      <div ref={titleRef} className="relative z-10 text-center px-6">
        <div className="hero-badge section-label mb-6" style={{ opacity: 0 }}>
          <span className="badge badge-orange">Electronic / Synthwave</span>
        </div>

        <h1 className="hero-title text-[clamp(3rem,10vw,9rem)] leading-[0.9] mb-2" style={{ opacity: 0 }}>
          <span className="block hollow-text">Red Shift</span>
          <span className="block text-accent">Mantra</span>
        </h1>

        <p className="hero-tagline font-mono text-[11px] tracking-[0.3em] uppercase text-light-muted mt-8" style={{ opacity: 0 }}>
          The geometry of sound · The transmutation of matter
        </p>
      </div>

      {/* Scroll indicator — pinned to the viewport bottom, not the text box */}
      <div className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted opacity-50">
          Scroll
        </span>
        <div className="scroll-indicator-line w-[1px] h-12 bg-gradient-to-b from-accent/50 to-transparent" />
      </div>
    </section>
  )
}