'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const leftCurtainRef = useRef<HTMLDivElement>(null)
  const rightCurtainRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<SVGPathElement>(null)

  // Intro animation
  useEffect(() => {
    const animate = async () => {
      const container = titleRef.current
      if (!container) return

      const badge = container.querySelector('.hero-badge')
      const label = container.querySelector('.hero-hw-label')
      const title = container.querySelector('.hero-title')
      const tagline = container.querySelector('.hero-tagline')
      const visual = container.querySelector('.hero-visual')
      const scroll = heroRef.current?.querySelector('.hero-scroll') ?? null

      if (prefersReducedMotion()) {
        ;[badge, label, title, tagline, visual, scroll].forEach((el) => {
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
      if (visual) tl.fromTo(visual,
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
        '-=1.0'
      )
      if (scroll) tl.fromTo(scroll,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.3'
      )
    }
    animate()
  }, [])

  // 3D parallax tilt on entire hero plane
  useEffect(() => {
    const hero = heroRef.current
    const plane = tiltRef.current
    if (!hero || !plane) return

    if (prefersReducedMotion()) return

    let rafId = 0
    let targetRx = 0
    let targetRy = 0
    let currentRx = 0
    let currentRy = 0

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      targetRx = y * -5
      targetRy = x * 5
    }

    const onLeave = () => {
      targetRx = 0
      targetRy = 0
    }

    const tick = () => {
      currentRx += (targetRx - currentRx) * 0.06
      currentRy += (targetRy - currentRy) * 0.06
      plane.style.transform = `perspective(1400px) rotateX(${currentRx}deg) rotateY(${currentRy}deg) translateZ(0)`
      rafId = requestAnimationFrame(tick)
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    rafId = requestAnimationFrame(tick)

    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Curtain reveal on scroll
  useEffect(() => {
    const left = leftCurtainRef.current
    const right = rightCurtainRef.current
    if (!left || !right) return

    const gsapPromise = import('gsap').then((m) => m.default)
    const scrollTriggerPromise = import('gsap/ScrollTrigger').then((m) => m.ScrollTrigger)

    let triggers: Array<() => void> = []
    let ctx: { revert: () => void } | null = null

    const setup = async () => {
      const gsap = await gsapPromise
      const ScrollTrigger = await scrollTriggerPromise
      gsap.registerPlugin(ScrollTrigger)

      if (prefersReducedMotion()) {
        gsap.set([left, right], { xPercent: 0 })
        return
      }

      ctx = gsap.context(() => {
        const st = ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 0.6,
          pin: false,
          onUpdate: (self) => {
            const p = self.progress
            gsap.to(left, { xPercent: -p * 55, duration: 0.1, ease: 'none', overwrite: true })
            gsap.to(right, { xPercent: p * 55, duration: 0.1, ease: 'none', overwrite: true })
          },
        })
        triggers.push(() => st.kill())
      })
    }

    setup()

    return () => {
      triggers.forEach((kill) => kill())
      ctx?.revert()
    }
  }, [])

  // Scroll progress path
  useEffect(() => {
    const path = progressRef.current
    if (!path) return

    const gsapPromise = import('gsap').then((m) => m.default)
    const scrollTriggerPromise = import('gsap/ScrollTrigger').then((m) => m.ScrollTrigger)

    let triggerKill: (() => void) | null = null
    let ctx: { revert: () => void } | null = null

    const setup = async () => {
      const gsap = await gsapPromise
      const ScrollTrigger = await scrollTriggerPromise
      gsap.registerPlugin(ScrollTrigger)

      const length = path.getTotalLength()
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      if (prefersReducedMotion()) {
        gsap.set(path, { strokeDashoffset: 0 })
        return
      }

      ctx = gsap.context(() => {
        const st = ScrollTrigger.create({
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
          onUpdate: (self) => {
            gsap.to(path, {
              strokeDashoffset: length * (1 - self.progress),
              duration: 0.1,
              ease: 'none',
              overwrite: true,
            })
          },
        })
        triggerKill = () => st.kill()
      })
    }

    setup()

    return () => {
      triggerKill?.()
      ctx?.revert()
    }
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

      {/* Orbital ellipse scroll progress path */}
      <svg
        className="fixed top-0 right-0 h-full w-[120px] md:w-[180px] z-[55] pointer-events-none"
        viewBox="0 0 200 1000"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 122, 255, 0.85)" />
            <stop offset="50%" stopColor="rgba(253, 252, 220, 0.35)" />
            <stop offset="100%" stopColor="rgba(255, 77, 0, 0.85)" />
          </linearGradient>
        </defs>
        {/* Background ellipse trace */}
        <ellipse
          cx="100"
          cy="500"
          rx="60"
          ry="480"
          fill="none"
          stroke="rgba(253, 252, 220, 0.08)"
          strokeWidth="1"
          vectorEffect="nonScalingStroke"
        />
        {/* Progress ellipse — will draw itself on scroll */}
        <path
          ref={progressRef}
          d="M100,20 a60,480 0 1,1 0,960 a60,480 0 1,1 0,-960"
          fill="none"
          stroke="url(#progressGrad)"
          strokeWidth="1.5"
          vectorEffect="nonScalingStroke"
          strokeLinecap="round"
        />
      </svg>

      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden hero-tilt-plane"
        style={{ background: 'var(--void)', perspective: '1400px' }}
      >
        {/* 1. Topographic star map overlay */}
        <div className="topo-overlay" aria-hidden="true" />
        <div className="topo-contours" aria-hidden="true" />

        {/* Subtle star field behind contours */}
        <div className="star-field" aria-hidden="true" />

        {/* Left curtain panel */}
        <div
          ref={leftCurtainRef}
          className="curtain-left absolute inset-y-0 left-0 w-1/2 bg-void z-10 pointer-events-none"
          style={{ willChange: 'transform' }}
        >
          <div className="absolute inset-0 border-r border-edge-faint/30" />
        </div>

        {/* Right curtain panel */}
        <div
          ref={rightCurtainRef}
          className="curtain-right absolute inset-y-0 right-0 w-1/2 bg-void z-10 pointer-events-none"
          style={{ willChange: 'transform' }}
        >
          <div className="absolute inset-0 border-l border-edge-faint/30" />
        </div>

        {/* Skeletal perspective grid */}
        <div
          className="perspective-grid z-0"
          aria-hidden="true"
        />

        {/* Content — asymmetric split layout on 3D plane */}
        <div
          ref={tiltRef}
          className="relative z-20 w-full"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          <div
            ref={titleRef}
            className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center"
          >
            {/* Left: text block */}
            <div className="text-left md:pr-8">
              <div className="hero-badge section-label mb-6" style={{ opacity: 0 }}>
                <span className="badge badge-signal">Electronic / Synthwave</span>
              </div>

              <h1 className="hero-title text-[clamp(3rem,10vw,8rem)] leading-[0.9] mb-4" style={{ opacity: 0 }}>
                <span className="block hollow-text text-glow-red">Red Shift</span>
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

            {/* Right: Nagra-style tape reel visualizer — now inside hex mask */}
            <div className="hero-visual relative flex items-center justify-center md:justify-end" style={{ opacity: 0 }}>
              <div className="hex-mask relative w-full max-w-[420px] aspect-square p-[2px] hex-outline">
                <div
                  className="absolute inset-0 border border-edge-faint/40"
                  style={{ background: 'linear-gradient(135deg, rgba(253,252,220,0.02) 0%, rgba(253,252,220,0) 50%, rgba(253,252,220,0.02) 100%)' }}
                />

                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-accent/40" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-accent/40" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-accent/40" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-accent/40" />

                {/* Silkscreened unit label */}
                <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-light-muted/70">
                    RSM-001
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-accent/70">
                    PLAY ▶
                  </span>
                </div>

                {/* Reel cluster */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[64%] aspect-square">
                    <div className="absolute inset-0 border border-edge-faint/25" style={{ transform: 'rotate(45deg)' }} />

                    <div
                      className="absolute inset-2 border-2 border-dashed border-accent/40"
                      style={{ borderRadius: '50%', animation: 'spinReel 12s linear infinite' }}
                    />
                    <div
                      className="absolute inset-[18%] border border-edge-faint/30"
                      style={{ borderRadius: '50%' }}
                    />
                    <div
                      className="absolute inset-[34%] border border-accent/60 bg-void"
                      style={{ borderRadius: '50%' }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[6px] h-[6px] bg-accent" />
                      </div>
                    </div>

                    <div
                      className="absolute top-1/2 left-1/2 w-[44%] h-[2px] origin-left"
                      style={{
                        background: 'linear-gradient(90deg, var(--accent) 0%, transparent 100%)',
                        transform: 'rotate(-30deg)',
                        animation: 'sweepArm 6s ease-in-out infinite alternate',
                      }}
                    />
                  </div>
                </div>

                {/* Bottom meters */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-2">
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between font-mono text-[7px] tracking-[0.1em] uppercase text-light-muted/60">
                      <span>L</span>
                      <span>VU</span>
                    </div>
                    <div className="h-1 w-full bg-edge-faint/20 overflow-hidden">
                      <div className="h-full bg-accent/70 w-[60%]" style={{ animation: 'meterL 1.4s ease-in-out infinite alternate' }} />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between font-mono text-[7px] tracking-[0.1em] uppercase text-light-muted/60">
                      <span>R</span>
                      <span>VU</span>
                    </div>
                    <div className="h-1 w-full bg-edge-faint/20 overflow-hidden">
                      <div className="h-full bg-accent-blue/70 w-[45%]" style={{ animation: 'meterR 1.7s ease-in-out infinite alternate' }} />
                    </div>
                  </div>
                </div>
              </div>
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

      <style jsx>{`
        @keyframes spinReel {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sweepArm {
          0% { transform: rotate(-30deg); opacity: 0.7; }
          100% { transform: rotate(30deg); opacity: 1; }
        }
        @keyframes meterL {
          0% { width: 35%; }
          100% { width: 78%; }
        }
        @keyframes meterR {
          0% { width: 28%; }
          100% { width: 64%; }
        }
      `}</style>
    </>
  )
}
