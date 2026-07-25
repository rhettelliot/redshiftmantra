'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

export function ChromaGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const cells = Array.from({ length: 36 }, (_, i) => i)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    if (prefersReducedMotion()) return

    let raf = 0
    let t = 0
    const cellEls: HTMLElement[] = Array.from(grid.querySelectorAll('.chroma-cell'))
    const baseHues = cellEls.map((_, i) => ((i * 137.5) % 360))

    const tick = () => {
      t += 0.012
      cellEls.forEach((cell, i) => {
        const phase = Math.sin(t + i * 0.4) * 0.5 + 0.5
        const hue = (baseHues[i] + phase * 40) % 360
        // Constrain palette to red-orange and blue-cyan range (signal colors)
        const hueMapped = hue > 180 ? 200 + ((hue - 180) / 180) * 60 : 10 + (hue / 180) * 35
        cell.style.setProperty('--cell-hue', `${hueMapped}`)
        cell.style.setProperty('--cell-glow', `${0.08 + phase * 0.12}`)
      })
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="section-label mb-12">Signal Matrix /</div>

        <div ref={gridRef} className="chroma-grid grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2 md:gap-3">
          {cells.map((i) => (
            <div
              key={i}
              className="chroma-cell group relative aspect-square bg-void border border-[var(--border)] overflow-hidden"
              style={{ animationDelay: `${(i % 6) * 0.12}s` }}
            >
              <div className="chroma-border absolute inset-0 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted/40 group-hover:text-light/80 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .chroma-cell {
          position: relative;
          --cell-hue: 20;
          --cell-glow: 0;
        }
        .chroma-border {
          background: linear-gradient(135deg, hsl(var(--cell-hue), 100%, 52%), hsl(calc(var(--cell-hue) + 200), 100%, 48%));
          opacity: var(--cell-glow);
          transition: opacity 0.4s ease;
          z-index: 0;
          mask-image: linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          padding: 1px;
        }
        .chroma-cell:hover .chroma-border {
          opacity: 1;
        }
        .chroma-cell::before {
          content: '';
          position: absolute;
          inset: 1px;
          background: var(--void);
          z-index: 1;
        }
        .chroma-cell > *:not(.chroma-border) {
          position: relative;
          z-index: 2;
        }
        .chroma-grid:hover .chroma-cell:not(:hover) {
          opacity: 0.45;
          transition: opacity 0.4s ease;
        }
        .chroma-cell::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, hsla(var(--cell-hue), 100%, 50%, 0.08) 0%, transparent 70%);
          z-index: 0;
          opacity: var(--cell-glow);
          pointer-events: none;
        }
      `}</style>
    </section>
  )
}
