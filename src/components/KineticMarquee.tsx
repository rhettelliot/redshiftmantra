'use client'

import { useEffect, useRef, useState } from 'react'
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
  const trackRef = useRef<HTMLDivElement>(null)
  const [skew, setSkew] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    if (prefersReducedMotion()) return

    let raf = 0
    let lastScroll = window.scrollY || window.pageYOffset
    let velocity = 0

    const tick = () => {
      const y = window.scrollY || window.pageYOffset
      const v = y - lastScroll
      velocity += (v - velocity) * 0.12
      const targetSkew = Math.max(-18, Math.min(18, velocity * 0.35))
      const targetDir = velocity > 0.5 ? 1 : velocity < -0.5 ? -1 : direction
      setSkew(targetSkew)
      setDirection(targetDir)
      lastScroll = y
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [direction])

  const row = (
    <div className="marquee-row flex items-center gap-6 md:gap-8 shrink-0"
    >
      {TRACKS.map((track, i) => (
        <div key={i} className="flex items-center gap-6 md:gap-8"
        >
          <span className="marquee-term font-display text-[clamp(1.75rem,5vw,4rem)] font-[900] uppercase tracking-[0.02em] whitespace-nowrap"
          >
            {track}
          </span>
          <span className="marquee-dot w-2 h-2 md:w-3 md:h-3 shrink-0" style={{ background: direction > 0 ? 'var(--accent)' : 'var(--accent-blue)' }} />
        </div>
      ))}
    </div>
  )

  return (
    <section className="relative py-12 md:py-20 overflow-hidden border-y border-[var(--border)] bg-void"
    >
      <div
        ref={trackRef}
        className="marquee-track flex items-center"
        style={{ transform: `skewX(${skew}deg)` }}
      >
        {row}
        {row}
        {row}
      </div>

      <style jsx>{`
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
        @keyframes marqueeScroll {
          0% { transform: translateX(0) skewX(${skew}deg); }
          100% { transform: translateX(-33.333%) skewX(${skew}deg); }
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
