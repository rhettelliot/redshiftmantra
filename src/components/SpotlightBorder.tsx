'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * SpotlightBorder
 *
 * A subtle radial glow travels along the border of track/listen rows following
 * the cursor, evoking a scanner-light on a dark console.
 */
export function SpotlightBorder() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (prefersReducedMotion() || window.matchMedia('(hover: none)').matches) return

    const rows: HTMLElement[] = Array.from(section.querySelectorAll('[data-spotlight]'))

    const onMove = (e: MouseEvent) => {
      rows.forEach((row) => {
        const rect = row.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        row.style.setProperty('--spot-x', `${x}px`)
        row.style.setProperty('--spot-y', `${y}px`)
      })
    }

    const root = section
    root.addEventListener('mousemove', onMove, { passive: true })
    return () => root.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={sectionRef} className="contents">
      <style jsx global>{`
        [data-spotlight] {
          position: relative;
        }
        [data-spotlight]::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle 180px at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255, 77, 0, 0.16), transparent 70%);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 0;
        }
        [data-spotlight]:hover::before {
          opacity: 1;
        }
        [data-spotlight] > * {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  )
}
