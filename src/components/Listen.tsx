'use client'

import { useEffect, useRef } from 'react'

const platforms = [
  { name: 'Spotify', url: 'https://open.spotify.com/artist/redshiftmantra', icon: '◈' },
  { name: 'Apple Music', url: 'https://music.apple.com/artist/redshiftmantra', icon: '⬡' },
  { name: 'Amazon', url: 'https://music.amazon.com/artist/redshiftmantra', icon: '◆' },
  { name: 'Tidal', url: 'https://tidal.com/artist/redshiftmantra', icon: '◉' },
  { name: 'YouTube Music', url: 'https://music.youtube.com/artist/redshiftmantra', icon: '▷' },
]

const releases = [
  { title: 'Phoneme', hyperfollow: 'https://distrokid.com/hyperfollow/redshiftmantra/phoneme-2' },
  { title: 'Deep Field Image', hyperfollow: 'https://distrokid.com/hyperfollow/redshiftmantra/deep-field-image-2' },
]

export function Listen() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const animate = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const heading = sectionRef.current?.querySelector('.listen-heading')
      if (heading) {
        gsap.from(heading, {
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 85%', once: true },
        })
      }
    }
    animate()
  }, [])

  return (
    <section ref={sectionRef} id="listen" className="py-32 md:py-48 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(255,77,0,0.03) 0%, rgba(0,0,0,0) 60%)' }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="section-label mb-8">
          Listen /
        </div>
        
        <h2 className="listen-heading text-[clamp(2.5rem,6vw,5rem)] font-display font-900 leading-[0.95] mb-4">
          <span className="hollow-text">Stream</span>
        </h2>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-light-muted mb-16">
          All platforms · Lossless where available
        </p>

        {/* Albums */}
        <div className="space-y-4 mb-16">
          {releases.map((release, i) => (
            <a
              key={release.title}
              href={release.hyperfollow}
              target="_blank"
              rel="noreferrer noopener"
              className="listen-item group flex items-center justify-between py-6 border-b border-[var(--border)] hover:border-accent/50 transition-all duration-300 cursor-none"
              data-cursor
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-light-muted" style={{ fontFeatureSettings: '"tnum"' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[18px] font-display font-900 group-hover:text-accent transition-colors">
                  {release.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-light-muted group-hover:text-accent transition-colors">
                  All platforms
                </span>
                <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Platform links */}
        <div className="flex flex-wrap gap-3">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-2 px-4 py-2 border border-[var(--border)] hover:border-accent/50 transition-all duration-300 cursor-none"
              style={{ borderRadius: 0 }}
              data-cursor
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