'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

export function Gatekeeper() {
  const gateRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Skip gate if already entered this session
    if (sessionStorage.getItem('rsm-entered')) {
      setEntered(true)
      return
    }
    setMounted(true)

    // Staggered entrance animation
    const animate = async () => {
      const gate = gateRef.current
      if (!gate) return

      // Reduced motion: reveal all gate content instantly.
      if (prefersReducedMotion()) {
        gate
          .querySelectorAll<HTMLElement>('.gate-label, .gate-title, .gate-subtitle, .gate-button')
          .forEach((el) => { el.style.opacity = '1' })
        gate
          .querySelectorAll<HTMLElement>('.gate-coord')
          .forEach((el) => { el.style.opacity = '0.3' })
        return
      }

      const gsap = (await import('gsap')).default
      const tl = gsap.timeline()
      tl.fromTo(gate.querySelector('.gate-label'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(gate.querySelector('.gate-title'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(gate.querySelector('.gate-subtitle'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(gate.querySelector('.gate-button'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(gate.querySelectorAll('.gate-coord'),
        { opacity: 0 },
        { opacity: 0.3, duration: 0.8, stagger: 0.2 },
        '-=0.4'
      )
    }
    animate()
  }, [])

  const handleEnter = async () => {
    const gate = gateRef.current
    if (!gate) return

    sessionStorage.setItem('rsm-entered', '1')

    // Reduced motion: dismiss immediately, no cinematic exit.
    if (prefersReducedMotion()) {
      setEntered(true)
      return
    }

    const gsap = (await import('gsap')).default

    const tl = gsap.timeline({
      onComplete: () => {
        setEntered(true)
      },
    })

    // Cinematic staggered exit
    tl.to(gate.querySelector('.gate-button'), {
      scale: 0.95, opacity: 0, duration: 0.3, ease: 'power2.in',
    })
    .to(gate.querySelector('.gate-subtitle'), {
      y: -20, opacity: 0, duration: 0.3, ease: 'power3.in',
    }, '-=0.1')
    .to(gate.querySelector('.gate-title'), {
      y: -30, opacity: 0, duration: 0.5, ease: 'power3.in',
    }, '-=0.2')
    .to(gate.querySelector('.gate-label'), {
      y: -20, opacity: 0, duration: 0.3, ease: 'power3.in',
    }, '-=0.3')
    .to(gate.querySelectorAll('.gate-coord'), {
      opacity: 0, duration: 0.2,
    }, '-=0.3')
    .to(gate, {
      opacity: 0, duration: 0.6, ease: 'power2.inOut',
    }, '-=0.2')
  }

  if (entered) return null

  return (
    <div
      ref={gateRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void"
      style={{ cursor: 'none' }}
      role="dialog"
      aria-label="Welcome gate"
    >
      {/* Cosmic red-shift background glow */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: mounted
            ? 'radial-gradient(ellipse at 50% 50%, rgba(255,77,0,0.08) 0%, rgba(0,0,0,0) 60%)'
            : 'none',
        }}
      />

      {/* Floating particles — deterministic positions to avoid hydration mismatch */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${((i * 7 + 3) % 3) + 1}px`,
                height: `${((i * 7 + 3) % 3) + 1}px`,
                left: `${(i * 37 + 11) % 100}%`,
                top: `${(i * 53 + 7) % 100}%`,
                backgroundColor:
                  i % 2 === 0 ? 'rgba(255,77,0,0.4)' : 'rgba(255,255,255,0.15)',
                animation: `floatUp ${15 + ((i * 13) % 20)}s linear infinite`,
                animationDelay: `${(i * 17) % 10}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Central content */}
      <div className="relative z-10 text-center">
        <div className="gate-label section-label mb-8 text-light-muted" style={{ opacity: 0 }}>
          Manteis Recordings
        </div>

        <h1
          className="gate-title text-[clamp(2.5rem,8vw,7rem)] font-display font-[900] leading-[0.95] tracking-[-0.02em] text-light mb-4"
          style={{ opacity: 0 }}
        >
          <span className="hollow-text">Red Shift</span>
          <br />
          <span className="text-accent">Mantra</span>
        </h1>

        <p
          className="gate-subtitle font-mono text-[11px] tracking-[0.3em] uppercase text-light-muted mb-16"
          style={{ opacity: 0 }}
        >
          The geometry of sound
        </p>

        <button
          onClick={handleEnter}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleEnter()
            }
          }}
          className="gate-button group relative font-mono text-[11px] tracking-[0.2em] uppercase text-light-muted hover:text-accent transition-colors duration-500 cursor-none px-12 py-3"
          style={{ opacity: 0 }}
          data-cursor
          aria-label="Enter the Red Shift Mantra experience"
          autoFocus
        >
          <span className="relative z-10">Enter</span>
          <div className="absolute inset-0 border border-[var(--light-faint)] group-hover:border-accent transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full bg-accent transition-all duration-700" />
        </button>
      </div>

      {/* Bottom coordinates */}
      <div className="gate-coord absolute bottom-8 left-8 font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted" style={{ opacity: 0 }}>
        47.6062° N
      </div>
      <div className="gate-coord absolute bottom-8 right-8 font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted" style={{ opacity: 0 }}>
        122.3321° W
      </div>
    </div>
  )
}