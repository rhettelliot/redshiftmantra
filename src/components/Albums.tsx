'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'
import { prefersReducedMotion } from '@/lib/motion'

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

  useEffect(() => {
    let dispose = () => {}
    const items = sectionRef.current?.querySelectorAll('.album-card') ?? []
    revealOnEnter(items, { y: 60 }).then((d) => { dispose = d })
    return () => dispose()
  }, [])

  // Parallax tilt cards
  useEffect(() => {
    const cards = Array.from(sectionRef.current?.querySelectorAll('.tilt-card') ?? [])
    if (!cards.length) return

    let rafId = 0
    const springs = new Map<Element, { rx: number; ry: number; tx: number; ty: number }>()
    cards.forEach((card) => springs.set(card, { rx: 0, ry: 0, tx: 0, ty: 0 }))

    const reduced = prefersReducedMotion()

    const onMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2
        const px = (x - cx) / cx
        const py = (y - cy) / cy
        springs.set(card, {
          rx: py * -8,
          ry: px * 8,
          tx: px * 12,
          ty: py * 12,
        })
      })
    }

    const onLeave = () => {
      cards.forEach((card) => springs.set(card, { rx: 0, ry: 0, tx: 0, ty: 0 }))
    }

    const tick = () => {
      cards.forEach((card) => {
        const s = springs.get(card)!
        const el = card as HTMLElement
        const st = window.getComputedStyle(el)
        const currentRx = parseFloat(st.getPropertyValue('--rx') || '0')
        const currentRy = parseFloat(st.getPropertyValue('--ry') || '0')
        const currentTx = parseFloat(st.getPropertyValue('--tx') || '0')
        const currentTy = parseFloat(st.getPropertyValue('--ty') || '0')

        const k = reduced ? 1 : 0.08
        const nextRx = currentRx + (s.rx - currentRx) * k
        const nextRy = currentRy + (s.ry - currentRy) * k
        const nextTx = currentTx + (s.tx - currentTx) * k
        const nextTy = currentTy + (s.ty - currentTy) * k

        el.style.setProperty('--rx', `${nextRx}`)
        el.style.setProperty('--ry', `${nextRy}`)
        el.style.setProperty('--tx', `${nextTx}`)
        el.style.setProperty('--ty', `${nextTy}`)
        el.style.transform = `perspective(900px) rotateX(${nextRx}deg) rotateY(${nextRy}deg) translate3d(${nextTx}px, ${nextTy}px, 0px)`
      })
      rafId = requestAnimationFrame(tick)
    }

    sectionRef.current?.addEventListener('mousemove', onMove)
    cards.forEach((card) => card.addEventListener('mouseleave', onLeave))
    rafId = requestAnimationFrame(tick)

    return () => {
      sectionRef.current?.removeEventListener('mousemove', onMove)
      cards.forEach((card) => card.removeEventListener('mouseleave', onLeave))
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section ref={sectionRef} id="albums" className="relative py-20 md:py-32 overflow-hidden">
      {/* 2. Wireframe grid tunnel */}
      <div className="wireframe-tunnel" aria-hidden="true" />

      {/* 4. Orbital path curves connecting releases */}
      <svg className="orbital-path hidden md:block" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,122,255,0.35)" />
            <stop offset="50%" stopColor="rgba(253,252,220,0.12)" />
            <stop offset="100%" stopColor="rgba(255,77,0,0.35)" />
          </linearGradient>
        </defs>
        <path
          d="M100 250 C 400 250, 500 120, 600 120 S 800 250, 1100 250"
          fill="none"
          stroke="url(#orbitGrad)"
          strokeWidth="1"
          strokeDasharray="6 6"
          opacity="0.6"
        />
        <path
          d="M100 540 C 350 540, 500 660, 600 660 S 850 540, 1100 540"
          fill="none"
          stroke="url(#orbitGrad)"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.4"
        />
        <circle cx="100" cy="250" r="3" fill="#007AFF" opacity="0.8" />
        <circle cx="1100" cy="250" r="3" fill="#FF4D00" opacity="0.8" />
        <circle cx="100" cy="540" r="3" fill="#007AFF" opacity="0.6" />
        <circle cx="1100" cy="540" r="3" fill="#FF4D00" opacity="0.6" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="section-label mb-16">
          Catalog /
        </div>

        <div className="space-y-24 md:space-y-40">
          {albums.map((album, index) => (
            <div
              key={album.id}
              className="album-card tilt-card relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 p-2 md:p-0"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {/* 3. MASSIVE catalog number as background display art */}
              <div
                className="absolute -top-8 md:-top-16 left-0 md:left-0 catalog-number select-none pointer-events-none z-0"
                style={{
                  WebkitTextStroke: `1px ${album.color}30`,
                  color: `${album.color}08`,
                  opacity: 0.55,
                }}
              >
                {album.catalog}
              </div>

              {/* Left: album identity + concentric frame tunnel cover */}
              <div className="md:col-span-5 relative z-10">
                {/* 5. Concentric frame tunnel cover art */}
                <div className="frame-tunnel aspect-square max-w-[340px] mb-8 scanlines">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${album.color}25 0%, transparent 45%), linear-gradient(135deg, ${album.color}10 0%, transparent 60%)`,
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-[5%] border"
                    style={{ borderColor: `${album.color}40` }}
                  />
                  <div
                    className="absolute inset-[15%] border"
                    style={{ borderColor: `${album.color}28` }}
                  />
                  <div
                    className="absolute inset-[25%] border"
                    style={{ borderColor: `${album.color}18` }}
                  />
                  <div
                    className="absolute inset-[35%] border flex items-center justify-center"
                    style={{ borderColor: `${album.color}10` }}
                  >
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: `${album.color}90` }}>
                      {album.catalog}
                    </span>
                  </div>

                  {/* 9. Stamp texture */}
                  <div className={`absolute top-4 right-4 ${album.id === 'phoneme' ? 'stamp stamp-blue' : 'stamp'}`}>
                    {album.year}
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = album.color
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                    data-cursor
                    aria-label={`Listen to ${album.title} — all platforms`}
                  >
                    Listen
                  </a>
                  <a
                    href={album.spotify}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted hover:text-accent transition-colors"
                    data-cursor
                    aria-label={`${album.title} on Spotify`}
                  >
                    Spotify →
                  </a>
                </div>
              </div>

              {/* Right: track list with scanlines + metadata strips */}
              <div className="md:col-span-7 relative z-10">
                <div className="mb-4 meta-strip">
                  <span className="meta-pill">{album.trackCount} tracks</span>
                  <span className="meta-pill">{album.runtime}</span>
                  <span className="meta-pill" style={{ color: album.color, borderColor: `${album.color}40` }}>{album.theme.split(' → ')[0]} → {album.theme.split(' → ').pop()}</span>
                </div>

                <div className="border-t border-[var(--border)] scanlines"
                >
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

                      {/* 7. Mono metadata strips */}
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

                {/* Orbital node marker */}
                <div className="mt-6 flex items-center gap-3"
                >
                  <div className="w-2 h-2" style={{ background: album.color }} />
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted">
                    Node {String(index + 1).padStart(2, '0')} // {album.catalog}
                  </span>
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
