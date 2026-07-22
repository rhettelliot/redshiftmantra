'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

const films = [
  {
    album: 'Deep Field Image',
    track: 'Obsidian',
    visual: 'Void → Liquid → Crack',
    palette: ['#000000', '#1a0a00', '#FF4D00'],
  },
  {
    album: 'Deep Field Image',
    track: 'Prominence',
    visual: 'Cosmic fire → Rebirth',
    palette: ['#0D0000', '#3D0C00', '#FF4D00'],
  },
  {
    album: 'Phoneme',
    track: 'Ajna',
    visual: 'Third eye → Vision',
    palette: ['#000A1A', '#003366', '#007AFF'],
  },
  {
    album: 'Phoneme',
    track: 'Surface Tension',
    visual: 'Boundary → Membrane',
    palette: ['#00101A', '#003D66', '#007AFF'],
  },
]

export function VisualOS() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let dispose = () => {}
    const cards = sectionRef.current?.querySelectorAll('.film-card') ?? []
    revealOnEnter(cards, { y: 50 }).then((d) => { dispose = d })
    return () => dispose()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="section-label mb-8">
          Visual OS /
        </div>
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-display font-[900] leading-[1.05] mb-4">
          The Feature Film
        </h2>
        <p className="text-[15px] text-light-dim max-w-xl mb-12">
          Red Shift Mantra is a 92-minute non-verbal cinematic experience. 
          Two chapters forming a continuous arc from the birth of matter to the resonance of consciousness.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {films.map((film, i) => (
            <div key={i} className="film-card group">
              {/* Color palette swatch */}
              <div
                className="aspect-[16/10] mb-4 relative overflow-hidden flex"
                style={{
                  background: film.palette[1],
                  borderRadius: 0,
                }}
                aria-hidden="true"
              >
                <div className="flex-1" style={{ backgroundColor: film.palette[0] }} />
                <div className="flex-1" style={{ backgroundColor: film.palette[1] }} />
                <div className="flex-1" style={{ backgroundColor: film.palette[2] }} />
                {/* Scan line effect */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
                  backgroundSize: '100% 4px',
                }} />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-void/0 group-hover:bg-void/40 transition-all duration-500 flex items-end p-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-light/0 group-hover:text-light/90 transition-all duration-500">
                    {film.visual}
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.1em] uppercase mb-1" style={{ color: film.palette[2] }}>
                    {film.album}
                  </div>
                  <div className="text-[15px] text-light">{film.track}</div>
                  <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-light-muted mt-1">
                    {film.visual}
                  </div>
                </div>
                <div className="flex gap-1 mt-2" aria-hidden="true">
                  {film.palette.map((color, j) => (
                    <div key={j} className="w-3 h-3" style={{ backgroundColor: color, borderRadius: 0 }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 font-mono text-[9px] tracking-[0.1em] uppercase text-light-muted">
          Director style: Ron Fricke / Godfrey Reggio · Non-verbal narrative
        </div>
      </div>

      <div className="divider-glow max-w-5xl mx-auto mt-16" />
    </section>
  )
}