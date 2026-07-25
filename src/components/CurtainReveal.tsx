'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * CurtainReveal
 *
 * Wraps each major section with a full-height curtain overlay that pulls apart
 * (left/right) based on scroll progress into that section, giving a theatrical
 * reveal between acts.
 */
export function CurtainReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const left = leftRef.current
    const right = rightRef.current
    if (!wrap || !left || !right) return

    let ctx: { revert: () => void } | null = null
    let st: any = null

    const setup = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (prefersReducedMotion()) {
        gsap.set([left, right], { xPercent: -100 })
        return
      }

      gsap.set(left, { xPercent: 0 })
      gsap.set(right, { xPercent: 0 })

      ctx = gsap.context(() => {
        st = ScrollTrigger.create({
          trigger: wrap,
          start: 'top 85%',
          end: 'top 15%',
          scrub: 0.7,
          onUpdate: (self) => {
            const p = self.progress
            gsap.to(left, {
              xPercent: -p * 110,
              duration: 0.1,
              ease: 'none',
              overwrite: true,
            })
            gsap.to(right, {
              xPercent: p * 110,
              duration: 0.1,
              ease: 'none',
              overwrite: true,
            })
          },
        })
      }, wrap)
    }

    setup()

    return () => {
      st?.kill()
      ctx?.revert()
    }
  }, [])

  return (
    <div ref={wrapRef} className={`curtain-section relative ${className}`}>
      <div
        ref={leftRef}
        className="curtain-left absolute inset-y-0 left-0 w-1/2 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, var(--void) 0%, var(--void-raised) 85%, var(--void) 100%)',
          borderRight: '1px solid rgba(253,252,220,0.04)',
          willChange: 'transform',
        }}
      />
      <div
        ref={rightRef}
        className="curtain-right absolute inset-y-0 right-0 w-1/2 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, var(--void) 0%, var(--void-raised) 85%, var(--void) 100%)',
          borderLeft: '1px solid rgba(253,252,220,0.04)',
          willChange: 'transform',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
