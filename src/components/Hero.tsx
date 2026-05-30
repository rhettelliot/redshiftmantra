'use client'

import { useEffect, useRef } from 'react'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animate = async () => {
      const gsap = (await import('gsap')).default
      
      gsap.fromTo(titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out', delay: 0.2 }
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
      <div ref={titleRef} className="relative z-10 text-center px-6" style={{ opacity: 0 }}>
        <div className="section-label mb-6">
          <span className="badge badge-orange">Electronic / Synthwave</span>
        </div>

        <h1 className="text-[clamp(3rem,10vw,9rem)] leading-[0.9] mb-2">
          <span className="block hollow-text">Red Shift</span>
          <span className="block text-accent">Mantra</span>
        </h1>

        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-light-muted mt-8">
          The geometry of sound · The transmutation of matter
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted opacity-50">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}