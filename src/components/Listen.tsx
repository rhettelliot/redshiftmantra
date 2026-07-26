'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

const platforms = [
  { name: 'Spotify', url: 'https://open.spotify.com/search/Red%20Shift%20Mantra', icon: '◈' },
  { name: 'Apple Music', url: 'https://music.apple.com/us/search?term=Red+Shift+Mantra', icon: '⬡' },
  { name: 'Amazon Music', url: 'https://music.amazon.com/search/Red+Shift+Mantra', icon: '◆' },
  { name: 'Tidal', url: 'https://tidal.com/search?q=Red%20Shift%20Mantra', icon: '◉' },
  { name: 'YouTube Music', url: 'https://music.youtube.com/search?q=Red+Shift+Mantra', icon: '▷' },
]

const releases = [
  {
    title: 'Phoneme',
    catalog: 'MR-002',
    subtitle: 'The Geometry of Sound',
    year: '2025',
    trackCount: 9,
    color: '#FF5500',
    hyperfollow: 'https://distrokid.com/hyperfollow/redshiftmantra/phoneme-2',
    spotify: 'https://open.spotify.com/album/3jAWlv6FPYUhiDJ0X0KEhH',
  },
  {
    title: 'Deep Field Image',
    catalog: 'MR-006',
    subtitle: 'The Transmutation of Matter',
    year: '2025',
    trackCount: 7,
    color: '#FF4D00',
    hyperfollow: 'https://distrokid.com/hyperfollow/redshiftmantra/deep-field-image-2',
    spotify: 'https://open.spotify.com/album/1nJCr1MCkLBA1ZqD7j7GDF',
  },
]

export function Listen() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let dispose = () => {}
    const els = sectionRef.current?.querySelectorAll(
      '.listen-heading, .listen-item, .platform-badge'
    ) ?? []
    revealOnEnter(els, { y: 30 }).then((d) => { dispose = d })
    return () => dispose()
  }, [])

  return (
    <section ref={sectionRef} id="listen" className="py-20 md:py-28 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="section-label mb-8">
          Listen /
        </div>

        <h2 className="listen-heading text-[clamp(2.5rem,8vw,5rem)] font-display font-[900] leading-[0.95] mb-4">
          <span className="hollow-text">Stream</span>
        </h2>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-light-muted mb-16">
          All platforms · Lossless where available
        </p>

        <div className="space-y-4 mb-16">
          {releases.map((release, i) => (
            <a
              key={release.title}
              href={release.hyperfollow}
              target="_blank"
              rel="noreferrer noopener"
              className="listen-item group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-[var(--border)] hover:border-accent/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-light-muted" style={{ fontFeatureSettings: '"tnum"' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <span className="block text-lg md:text-xl font-display font-[900] group-hover:text-accent transition-colors">
                    {release.title}
                  </span>
                  <span className="block font-mono text-[9px] tracking-[0.1em] uppercase mt-1" style={{ color: release.color }}>
                    {release.catalog} · {release.year} · {release.trackCount} tracks · {release.subtitle}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3 sm:mt-0">
                <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-light-muted group-hover:text-accent transition-colors hidden sm:inline">
                  All platforms
                </span>
                <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </div>
            </a>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer noopener"
              className="platform-badge group flex items-center gap-2 px-4 py-2 border border-[var(--border)] hover:border-accent/50 hover:bg-surface-hover/30 transition-all duration-300 min-h-[44px]"
              style={{ borderRadius: 0 }}
            >
              <span className="text-[12px] group-hover:text-accent transition-colors">{p.icon}</span>
              <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted group-hover:text-light transition-colors">
                {p.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
