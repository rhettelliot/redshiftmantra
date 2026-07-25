'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

export function ScrollStrobe() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const lastY = useRef(0)
  const lastTime = useRef(Date.now())
  const rafRef = useRef(0)

  useEffect(() => {
    const el = overlayRef.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.style.display = 'none'
      return
    }

    let decay = 0

    const tick = () => {
      const now = Date.now()
      const y = window.scrollY || window.pageYOffset
      const dt = Math.max(1, now - lastTime.current)
      const speed = Math.abs(y - lastY.current) / dt

      // Threshold: only flare on fast scrolls
      if (speed > 1.2) {
        const intensity = Math.min(1, (speed - 1.2) / 6)
        // Shift toward red-shift orange when scrolling down, blue when up
        const direction = y > lastY.current ? 1 : -1
        const colorA = direction > 0 ? '255,77,0' : '0,122,255'
        const colorB = direction > 0 ? '0,122,255' : '255,77,0'
        decay = Math.max(decay, intensity)
        el.style.background = `radial-gradient(circle at 50% 50%, rgba(${colorA},${0.12 * decay}) 0%, transparent 55%), radial-gradient(circle at 50% 50%, rgba(${colorB},${0.06 * decay}) 0%, transparent 70%)`
      }

      // Decay
      decay *= 0.92
      if (decay < 0.005) {
        decay = 0
        el.style.background = 'transparent'
      }

      lastY.current = y
      lastTime.current = now
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none z-[9001] mix-blend-screen"
      aria-hidden="true"
      style={{ background: 'transparent' }}
    />
  )
}
