'use client'

import { useEffect, useRef } from 'react'

interface Album {
  id: string
  title: string
  subtitle: string
  trackCount: number
  runtime: string
  theme: string
  narrative: string
  year: string
  color: string
  tracks: string[]
  hyperfollow: string
  spotify: string
}

const albums: Album[] = [
  {
    id: 'phoneme',
    title: 'Phoneme',
    subtitle: 'The Geometry of Sound',
    trackCount: 9,
    runtime: '~42 min',
    theme: 'Vibration → Life → Consciousness',
    narrative: 'From a single drop of primordial water to the opening of the third eye. Nine movements mapping the geometry of awareness.',
    year: '2025',
    color: '#007AFF',
    tracks: ['Piece of Ocean Water', 'Surface Tension', 'Xi', 'Hokku', 'Super Fluous', 'Byaiana', 'In Our Hands', 'Ashen Glow', 'Ajna'],
    hyperfollow: 'https://distrokid.com/hyperfollow/redshiftmantra/phoneme-2',
    spotify: 'https://open.spotify.com/album/3jAWlv6FPYUhiDJ0X0KEhH',
  },
  {
    id: 'deep-field-image',
    title: 'Deep Field Image',
    subtitle: 'The Transmutation of Matter',
    trackCount: 7,
    runtime: '~50 min',
    theme: 'Void → Organic → Machine → Ether → Energy',
    narrative: 'The universe ends in fire and is reborn in silence. Seven movements tracing matter through its cosmic cycle.',
    year: '2025',
    color: '#FF4D00',
    tracks: ['Obsidian', 'Rain', 'Kobayashi Maru', 'Nalu', 'Cloud Noise', 'Calm Between', 'Prominence'],
    hyperfollow: 'https://distrokid.com/hyperfollow/redshiftmantra/deep-field-image-2',
    spotify: 'https://open.spotify.com/album/1nJCr1MCkLBA1ZqD7j7GDF',
  },
]

export function Albums() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const animate = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const items = sectionRef.current?.querySelectorAll('.album-card')
      if (!items) return

      items.forEach((item, i) => {
        gsap.from(item, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true,
          },
          delay: i * 0.15,
        })
      })
    }
    animate()
  }, [])

  return (
    <section ref={sectionRef} id="albums" className="py-32 md:py-48">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">
          Albums /
        </div>

        <div className="space-y-24 md:space-y-32">
          {albums.map((album) => (
            <div key={album.id} className="album-card">
              {/* Album header */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.15em] uppercase mb-3" style={{ color: album.color }}>
                    {album.year} · {album.trackCount} tracks · {album.runtime}
                  </div>
                  <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-900 leading-[0.95]">
                    {album.title}
                  </h2>
                  <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-light-muted mt-2">
                    {album.subtitle}
                  </p>
                </div>
              </div>

              {/* Narrative */}
              <p className="text-[15px] leading-[1.8] text-light-dim max-w-2xl mb-10">
                {album.narrative}
              </p>

              {/* Theme arc */}
              <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-light-muted mb-8">
                <span className="text-[8px] opacity-40">arc →</span>{' '}
                {album.theme}
              </div>

              {/* Track list */}
              <div className="border-t border-[var(--border)]">
                {album.tracks.map((track, i) => (
                  <div
                    key={track}
                    className="group flex items-center py-3 border-b border-[var(--border)] hover:bg-surface-hover/30 transition-colors duration-300 cursor-none"
                    data-cursor
                  >
                    <span className="font-mono text-[10px] text-light-muted w-8 shrink-0" style={{ fontFeatureSettings: '"tnum"' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-[14px] text-light-dim group-hover:text-light transition-colors">
                      {track}
                    </span>
                    <span className="font-mono text-[9px] text-light-muted opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-[0.1em]">
                      {album.id === 'phoneme' ? 'phon' : 'dfl'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-8">
                <a
                  href={album.hyperfollow}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 border text-light hover:bg-accent hover:text-void hover:border-accent transition-all duration-300 cursor-none"
                  style={{ borderRadius: 0, borderColor: album.color, color: album.color }}
                  data-cursor
                >
                  Listen
                </a>
                <a
                  href={album.spotify}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted hover:text-accent transition-colors cursor-none"
                  data-cursor
                >
                  Spotify →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider-glow max-w-5xl mx-auto mt-32" />
    </section>
  )
}