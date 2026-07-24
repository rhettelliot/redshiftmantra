'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'
import { prefersReducedMotion } from '@/lib/motion'

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
    let dispose = () => {}
    const items = sectionRef.current?.querySelectorAll('.album-card') ?? []
    revealOnEnter(items, { y: 60 }).then((d) => { dispose = d })
    return () => dispose()
  }, [])

  // Parallax tilt cards — 3D mouse-follow with spring physics.
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
          rx: py * -8, // rotateX follows vertical mouse
          ry: px * 8,  // rotateY follows horizontal mouse
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

        const k = reduced ? 1 : 0.08 // spring stiffness
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
    <section ref={sectionRef} id="albums" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="section-label mb-12">
          Albums /
        </div>

        <div className="space-y-16 md:space-y-24">
          {albums.map((album) => (
            <div
              key={album.id}
              className="album-card tilt-card grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 p-2 md:p-0"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              {/* Left: identity */}
              <div className="md:col-span-5">
                <div className="font-mono text-[10px] tracking-[0.15em] uppercase mb-3" style={{ color: album.color }}>
                  {album.year} · {album.trackCount} tracks · {album.runtime}
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
                    className="font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 border hover:bg-accent hover:text-void hover:border-accent transition-all duration-300"
                    style={{ borderRadius: 0, borderColor: album.color, color: album.color }}
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

              {/* Right: track list */}
              <div className="md:col-span-7">
                <div className="border-t border-[var(--border)]">
                  {album.tracks.map((track, i) => (
                    <div
                      key={track}
                      className="group flex items-center py-3 border-b border-[var(--border)] hover:bg-surface-hover/30 transition-colors duration-300"
                    >
                      <span className="font-mono text-[10px] text-light-muted w-8 shrink-0" style={{ fontFeatureSettings: '"tnum"' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 text-[14px] text-light-dim group-hover:text-light transition-colors">
                        {track}
                      </span>
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

      <div className="divider-glow max-w-5xl mx-auto mt-16" />
    </section>
  )
}
