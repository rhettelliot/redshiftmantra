'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * GooeyAlbumTransition
 *
 * Controlled by the album stack scroll progress. Becomes visible and sweeps
 * across the viewport as the second album slides over the first, warping the
 * seam like viscous liquid light between Phoneme (blue) and Deep Field Image (orange).
 */
export function GooeyAlbumTransition() {
  const portalRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const portal = portalRef.current
    const blob = blobRef.current
    if (!portal || !blob) return
    if (prefersReducedMotion()) {
      portal.style.display = 'none'
      return
    }

    let raf = 0
    let phase = 0

    const tick = () => {
      phase += 0.02
      const y = 30 + Math.sin(phase) * 8
      const r = 28 + Math.cos(phase * 1.7) * 4
      blob.setAttribute('cy', `${y}`)
      blob.setAttribute('r', `${r}`)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Listen for active transition phase from Albums via a custom window event
  useEffect(() => {
    const portal = portalRef.current
    if (!portal) return

    const onGoo = (e: Event) => {
      const p = (e as CustomEvent<number>).detail ?? 0
      portal.style.opacity = p > 0.15 && p < 0.85 ? '1' : '0'
      portal.style.transform = `translateY(${(p - 0.5) * 40}vh)`
    }

    window.addEventListener('gooey-transition', onGoo)
    return () => window.removeEventListener('gooey-transition', onGoo)
  }, [])

  return (
    <div
      ref={portalRef}
      className="gooey-portal fixed inset-0 pointer-events-none z-[30] opacity-0"
      aria-hidden="true"
      style={{
        mixBlendMode: 'screen',
        transition: 'opacity 0.5s ease',
      }}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          <linearGradient id="gooGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5500" />
            <stop offset="50%" stopColor="#FDFCDC" />
            <stop offset="100%" stopColor="#FF4D00" />
          </linearGradient>
        </defs>
        <g filter="url(#goo)">
          <circle
            ref={blobRef}
            cx="50"
            cy="30"
            r="28"
            fill="url(#gooGrad)"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              transform: 'scale(2.6, 0.28)',
              opacity: 0.55,
            }}
          />
          <circle cx="35" cy="30" r="18" fill="url(#gooGrad)" opacity="0.35" />
          <circle cx="65" cy="30" r="18" fill="url(#gooGrad)" opacity="0.35" />
        </g>
      </svg>
    </div>
  )
}
