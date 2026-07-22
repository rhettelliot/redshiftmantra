'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'
import { scrollToTarget } from '@/lib/smoothScroll'

const sections = [
  { label: '001', title: 'Philosophy', href: '#philosophy' },
  { label: '002', title: 'Albums', href: '#albums' },
  { label: '003', title: 'Listen', href: '#listen' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll-spy: highlight the nav link for the section currently in view.
  useEffect(() => {
    const targets = sections
      .map((s) => document.querySelector(s.href))
      .filter((el): el is Element => el !== null)
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!mounted) return
    const animate = async () => {
      if (prefersReducedMotion()) {
        if (navRef.current) navRef.current.style.opacity = '1'
        return
      }
      const gsap = (await import('gsap')).default
      gsap.fromTo(navRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      )
    }
    animate()
  }, [mounted])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <header>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-void/90 backdrop-blur-lg border-b border-[var(--border)]' : 'bg-transparent'
        }`}
        style={{ opacity: 0 }}
        aria-label="Primary navigation"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between"
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollToTarget(0) }}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-light hover:text-accent transition-colors"
            data-cursor
            aria-label="Red Shift Mantra home"
          >
            <span className="text-accent">R</span>SM
          </a>

          {/* Desktop section links */}
          <div className="hidden md:flex items-center gap-8" aria-label="Sections">
            {sections.map((s) => {
              const isActive = active === s.href
              return (
                <a
                  key={s.label}
                  href={s.href}
                  onClick={(e) => { e.preventDefault(); scrollToTarget(s.href) }}
                  aria-current={isActive ? 'true' : undefined}
                  className={`font-mono text-[10px] tracking-[0.15em] uppercase transition-colors flex items-center gap-2 ${
                    isActive ? 'text-accent' : 'text-light-muted hover:text-accent'
                  }`}
                  data-cursor
                >
                  <span className={`text-[8px] ${isActive ? 'text-accent' : 'text-light-muted'}`}>{s.label}</span>
                  {s.title}
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-4">
            {/* Status indicator — desktop only */}
            <div className="hidden md:flex items-center gap-2">
              <div className="w-[6px] h-[6px] bg-accent" style={{ borderRadius: 0 }} aria-hidden="true" />
              <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-light-muted">
                {scrolled ? 'active' : 'standby'}
              </span>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col items-end gap-[5px] p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              data-cursor
            >
              <div
                className="h-[1px] bg-light transition-all duration-300 origin-right"
                style={{
                  width: '20px',
                  transform: menuOpen ? 'rotate(-45deg) translateX(1px)' : 'none',
                }}
              />
              <div
                className="h-[1px] bg-light transition-all duration-300"
                style={{
                  width: menuOpen ? '0px' : '14px',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <div
                className="h-[1px] bg-light transition-all duration-300 origin-right"
                style={{
                  width: '20px',
                  transform: menuOpen ? 'rotate(45deg) translateX(1px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-void flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal="false"
      >
        <div className="flex flex-col items-center gap-12">
          {sections.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              onClick={(e) => {
                e.preventDefault()
                setMenuOpen(false)
                // Wait for the menu's body-scroll-lock to release before scrolling.
                setTimeout(() => scrollToTarget(s.href), 50)
              }}
              className="group text-center"
              data-cursor
              style={{
                transform: menuOpen ? 'translateY(0)' : `translateY(${20 + i * 10}px)`,
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s, opacity 0.4s ease ${i * 0.08}s`,
              }}
            >
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent mb-2">
                {s.label}
              </div>
              <div className="text-[clamp(1.5rem,6vw,2.5rem)] font-display font-[900] text-light group-hover:text-accent transition-colors duration-300">
                {s.title}
              </div>
            </a>
          ))}
        </div>

        {/* Mobile status */}
        <div className="absolute bottom-8 flex items-center gap-2">
          <div className="w-[6px] h-[6px] bg-accent" style={{ borderRadius: 0 }} aria-hidden="true" />
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-light-muted">
            Red Shift Mantra
          </span>
        </div>
      </div>
    </header>
  )
}