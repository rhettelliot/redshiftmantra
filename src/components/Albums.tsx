'use client'

import { useEffect, useRef } from 'react'

interface Track {
  title: string
  bpm: number
  duration: string
}

interface Album {
  id: string
  catalog: string
  title: string
  subtitle: string
  trackCount: number
  runtime: string
  theme: string
  narrative: string
  year: string
  color: string
  tracks: Track[]
  hyperfollow: string
  spotify: string
}

const albums: Album[] = [
  {
    id: 'phoneme',
    catalog: 'MR-002',
    title: 'Phoneme',
    subtitle: 'The Geometry of Sound',
    trackCount: 9,
    runtime: '~42 min',
    theme: 'Vibration → Life → Consciousness',
    narrative: 'From a single drop of primordial water to the opening of the third eye. Nine movements mapping the geometry of awareness.',
    year: '2025',
    color: '#007AFF',
    tracks: [
      { title: 'Piece of Ocean Water', bpm: 92, duration: '4:18' },
      { title: 'Surface Tension', bpm: 88, duration: '4:42' },
      { title: 'Xi', bpm: 104, duration: '3:55' },
      { title: 'Hokku', bpm: 96, duration: '4:24' },
      { title: 'Super Fluous', bpm: 112, duration: '5:01' },
      { title: 'Byaiana', bpm: 84, duration: '5:33' },
      { title: 'In Our Hands', bpm: 90, duration: '4:47' },
      { title: 'Ashen Glow', bpm: 76, duration: '5:12' },
      { title: 'Ajna', bpm: 72, duration: '6:08' },
    ],
    hyperfollow: 'https://distrokid.com/hyperfollow/redshiftmantra/phoneme-2',
    spotify: 'https://open.spotify.com/album/3jAWlv6FPYUhiDJ0X0KEhH',
  },
  {
    id: 'deep-field-image',
    catalog: 'MR-006',
    title: 'Deep Field Image',
    subtitle: 'The Transmutation of Matter',
    trackCount: 7,
    runtime: '~50 min',
    theme: 'Void → Organic → Machine → Ether → Energy',
    narrative: 'The universe ends in fire and is reborn in silence. Seven movements tracing matter through its cosmic cycle.',
    year: '2025',
    color: '#FF4D00',
    tracks: [
      { title: 'Obsidian', bpm: 80, duration: '6:24' },
      { title: 'Rain', bpm: 95, duration: '5:17' },
      { title: 'Kobayashi Maru', bpm: 108, duration: '7:02' },
      { title: 'Nalu', bpm: 86, duration: '6:51' },
      { title: 'Cloud Noise', bpm: 118, duration: '5:38' },
      { title: 'Calm Between', bpm: 64, duration: '8:14' },
      { title: 'Prominence', bpm: 74, duration: '10:34' },
    ],
    hyperfollow: 'https://distrokid.com/hyperfollow/redshiftmantra/deep-field-image-2',
    spotify: 'https://open.spotify.com/album/1nJCr1MCkLBA1ZqD7j7GDF',
  },
]

export function Albums() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} id="albums" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="section-label mb-16">
          Catalog /
        </div>

        <div className="space-y-24 md:space-y-32">
          {albums.map((album) => (
            <div
              key={album.id}
              className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
            >
              <div className="absolute -top-6 md:-top-10 left-0 md:left-0 catalog-number select-none pointer-events-none z-0"
                style={{
                  WebkitTextStroke: `1px ${album.color}24`,
                  color: `${album.color}08`,
                  opacity: 0.5,
                }}
              >
                {album.catalog}
              </div>

              <div className="md:col-span-5 relative z-10">
                <div className="aspect-square max-w-[300px] mb-8 p-6 border flex flex-col justify-between"
                  style={{ borderColor: `${album.color}30` }}
                >
                  <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase">
                    <span style={{ color: `${album.color}90` }}>{album.catalog}</span>
                    <span className="stamp" style={{ color: album.color, borderColor: album.color }}>{album.year}</span>
                  </div>
                  <div className="text-center">
                    <span className="font-display text-[clamp(1.25rem,3vw,2rem)] font-[900]" style={{ color: album.color }}>
                      {album.title}
                    </span>
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted text-center">
                    {album.trackCount} tracks · {album.runtime}
                  </div>
                </div>

                <div className="font-mono text-[10px] tracking-[0.15em] uppercase mb-3" style={{ color: album.color }}>
                  {album.catalog} · {album.trackCount} tracks · {album.runtime}
                </div>
                <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-display font-[900] leading-[0.95]">
                  {album.title}
                </h2>
                <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-light-muted mt-2">
                  {album.subtitle}
                </p>

                <p className="text-[15px] leading-[1.8] text-light-dim mt-6">
                  {album.narrative}
                </p>

                <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-light-muted mt-8">
                  arc → {album.theme}
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <a
                    href={album.hyperfollow}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 border hover:text-void transition-all duration-300"
                    style={{ borderRadius: 0, borderColor: album.color, color: album.color, background: 'transparent' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = album.color }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                    aria-label={`Listen to ${album.title} — all platforms`}
                  >
                    Listen
                  </a>
                  <a
                    href={album.spotify}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted hover:text-accent transition-colors"
                    aria-label={`${album.title} on Spotify`}
                  >
                    Spotify →
                  </a>
                </div>
              </div>

              <div className="md:col-span-7 relative z-10">
                <div className="mb-4 meta-strip">
                  <span className="meta-pill">{album.trackCount} tracks</span>
                  <span className="meta-pill">{album.runtime}</span>
                  <span className="meta-pill" style={{ color: album.color, borderColor: `${album.color}40` }}>{album.theme.split(' → ')[0]} → {album.theme.split(' → ').pop()}</span>
                </div>

                <div className="border-t border-[var(--border)]">
                  {album.tracks.map((track, i) => (
                    <div
                      key={track.title}
                      className="group flex items-center py-3 border-b border-[var(--border)] hover:bg-surface-hover/30 transition-colors duration-300"
                    >
                      <span
                        className="font-mono text-[10px] w-8 shrink-0"
                        style={{ color: album.color, fontFeatureSettings: '"tnum"' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 text-[14px] text-light-dim group-hover:text-light transition-colors">
                        {track.title}
                      </span>

                      <div className="hidden sm:flex items-center gap-2 mr-3">
                        <span className="meta-pill">{track.bpm} BPM</span>
                        <span className="meta-pill">{track.duration}</span>
                      </div>

                      <span className="font-mono text-[9px] text-light-muted uppercase tracking-[0.1em]">
                        {album.id === 'phoneme' ? 'phon' : 'dfl'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 divider-glow max-w-5xl mx-auto mt-16" />
    </section>
  )
}
