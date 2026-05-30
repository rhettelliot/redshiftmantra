'use client'

import { useEffect, useRef, useState } from 'react'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const animate = async () => {
      const gsap = (await import('gsap')).default
      gsap.fromTo(navRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      )
    }
    animate()
  }, [mounted])

  const sections = [
    { label: '001', title: 'Philosophy', href: '#philosophy' },
    { label: '002', title: 'Albums', href: '#albums' },
    { label: '003', title: 'Listen', href: '#listen' },
  ]

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-void/90 backdrop-blur-lg border-b border-[var(--border)]' : 'bg-transparent'
      }`}
      style={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-mono text-[11px] tracking-[0.2em] uppercase text-light hover:text-accent transition-colors cursor-none" data-cursor>
          <span className="text-accent">R</span>SM
        </a>

        {/* Section links */}
        <div className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted hover:text-accent transition-colors cursor-none flex items-center gap-2"
              data-cursor
            >
              <span className="text-[8px] opacity-40">{s.label}</span>
              {s.title}
            </a>
          ))}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] bg-accent" style={{ borderRadius: 0 }} />
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-light-muted">
            {scrolled ? 'active' : 'standby'}
          </span>
        </div>
      </div>
    </nav>
  )
}