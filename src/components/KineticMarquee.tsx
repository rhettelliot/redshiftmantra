'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const TRACKS = [
  'Piece of Ocean Water',
  'Surface Tension',
  'Xi',
  'Hokku',
  'Super Fluous',
  'Byaiana',
  'In Our Hands',
  'Ashen Glow',
  'Ajna',
  'Obsidian',
  'Rain',
  'Kobayashi Maru',
  'Nalu',
  'Cloud Noise',
  'Calm Between',
  'Prominence',
]

export function KineticMarquee() {
  // The skew wrapper and dot colour are driven imperatively through the DOM
  // (transform + a CSS variable) so the scroll-velocity loop never triggers a
  // React re-render — an earlier version called setState every animation frame,
  // regenerating the entire styled-jsx block (including @keyframes) ~60x/sec.
  const skewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const skewEl = skewRef.current
    if (!skewEl) return

    let raf = 0
    let lastScroll = window.scrollY || window.pageYOffset
    let velocity = 0
    let direction = 1

    const tick = () => {
      const y = window.scrollY || window.pageYOffset
      const v = y - lastScroll
      velocity += (v - velocity) * 0.12
      const skew = Math.max(-18, Math.min(18, velocity * 0.35))
      if (velocity > 0.5) direction = 1
      else if (velocity < -0.5) direction = -1

      skewEl.style.transform = `skewX(${skew.toFixed(2)}deg)`
      skewEl.style.setProperty(
        '--marquee-dot',
        direction > 0 ? 'var(--accent)' : 'var(--accent-blue)'
      )

      lastScroll = y
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const row = (
    <div className="flex items-center gap-6 md:gap-8 shrink-0">
      {TRACKS.map((track, i) => (
        <div key={i} className="flex items-center gap-6 md:gap-8">
          <span className="marquee-term font-display text-[clamp(1.75rem,5vw,4rem)] font-[900] uppercase tracking-[0.02em] whitespace-nowrap">
            {track}
          </span>
          <span className="marquee-dot w-2 h-2 md:w-3 md:h-3 shrink-0" />
        </div>
      ))}
    </div>
  )

  return (
    <section className="relative py-12 md:py-20 overflow-hidden border-y border-[var(--border)] bg-void">
      {/* Outer wrapper carries the scroll-velocity skew (updated via ref). */}
      <div ref={skewRef} className="marquee-skew" style={{ ['--marquee-dot' as string]: 'var(--accent)' }}>
        {/* Inner track carries the perpetual translate animation. */}
        <div className="marquee-track flex items-center">
          {row}
          {row}
          {row}
        </div>
      </div>

      <style jsx>{`
        .marquee-skew {
          will-change: transform;
        }
        .marquee-track {
          width: max-content;
          animation: marqueeScroll 36s linear infinite;
          will-change: transform;
        }
        .marquee-term {
          color: transparent;
          -webkit-text-stroke: 1px rgba(253, 252, 220, 0.55);
          transition: color 0.3s ease, -webkit-text-stroke 0.3s ease, text-shadow 0.3s ease;
        }
        .marquee-term:hover {
          color: var(--accent);
          -webkit-text-stroke: 1px var(--accent);
          text-shadow: 0 0 24px rgba(255, 77, 0, 0.45);
        }
        .marquee-dot {
          background: var(--marquee-dot, var(--accent));
          transition: background 0.4s ease;
        }
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
