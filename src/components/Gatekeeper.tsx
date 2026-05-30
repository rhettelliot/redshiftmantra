'use client'

import { useEffect, useRef, useState } from 'react'

export function Gatekeeper() {
  const gateRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleEnter = async () => {
    const gsap = (await import('gsap')).default
    const gate = gateRef.current
    if (!gate) return

    gsap.to(gate, {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        gate.style.display = 'none'
        setEntered(true)
      },
    })
  }

  return (
    <div
      ref={gateRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void"
      style={{ cursor: 'none' }}
    >
      {/* Cosmic red-shift background glow */}
      <div
        className="absolute inset-0"
        style={{
          background: mounted ? 'radial-gradient(ellipse at 50% 50%, rgba(255,77,0,0.08) 0%, rgba(0,0,0,0) 60%)' : 'none',
        }}
      />
      
      {/* Floating particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: Math.random() > 0.5 ? 'rgba(255,77,0,0.4)' : 'rgba(255,255,255,0.15)',
                animation: `floatUp ${15 + Math.random() * 20}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Central content */}
      <div className="relative z-10 text-center">
        <div className="section-label mb-8 text-light-muted">
          Manteis Recordings
        </div>
        
        <h1
          className="text-[clamp(2.5rem,8vw,7rem)] font-display font-900 leading-[0.95] tracking-[-0.02em] text-light mb-4"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          <span className="hollow-text">Red Shift</span>
          <br />
          <span className="text-accent">Mantra</span>
        </h1>

        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-light-muted mb-16">
          The geometry of sound
        </p>

        <button
          onClick={handleEnter}
          className="group relative font-mono text-[11px] tracking-[0.2em] uppercase text-light-muted hover:text-accent transition-colors duration-500 cursor-none"
          data-cursor
        >
          <span className="relative z-10">Enter</span>
          <div className="absolute inset-0 border border-light-faint group-hover:border-accent transition-colors duration-500" style={{ padding: '12px 48px', borderRadius: 0 }} />
          <div className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full bg-accent transition-all duration-500" />
        </button>
      </div>

      {/* Bottom coordinates */}
      <div className="absolute bottom-8 left-8 font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted opacity-30">
        47.6062° N
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted opacity-30">
        122.3321° W
      </div>
    </div>
  )
}