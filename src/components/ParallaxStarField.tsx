'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * ParallaxStarField
 *
 * Multi-layer CSS-generated star field driven by both scroll and a tiny
 * mouse parallax offset. Layers move at different speeds (slower than foreground
 * content) to create deep cosmic depth behind the hero and sections.
 */
export function ParallaxStarField({
  layerCount = 3,
  density = [60, 40, 24],
  speeds = [0.08, 0.18, 0.35],
}: {
  layerCount?: number
  density?: number[]
  speeds?: number[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (prefersReducedMotion()) return

    let raf = 0
    let scrollY = 0
    let targetScroll = window.scrollY || window.pageYOffset
    const mouse = { x: 0, y: 0 }
    const layers: HTMLDivElement[] = Array.from(container.querySelectorAll('.star-layer'))

    const onScroll = () => {
      targetScroll = window.scrollY || window.pageYOffset
    }
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const tick = () => {
      scrollY += (targetScroll - scrollY) * 0.08
      layers.forEach((layer, i) => {
        const speed = speeds[i] ?? speeds[speeds.length - 1]
        const x = mouse.x * (4 + i * 6)
        const y = -scrollY * speed + mouse.y * (2 + i * 3)
        layer.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [speeds])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[5] overflow-hidden"
      aria-hidden="true"
    >
      {Array.from({ length: layerCount }).map((_, i) => (
        <div
          key={i}
          className="star-layer absolute inset-0 will-change-transform"
          style={{
            width: '120%',
            height: '160%',
            top: '-20%',
            left: '-10%',
            backgroundImage: `radial-gradient(circle, rgba(253,252,220,${0.5 + i * 0.2}) 1.2px, transparent 1.2px), radial-gradient(circle, rgba(255,77,0,${0.35 - i * 0.1}) 1.5px, transparent 1.5px)`,
            backgroundSize: `${120 + i * 80}px ${120 + i * 80}px, ${240 + i * 120}px ${240 + i * 120}px`,
            backgroundPosition: `${i * 40}px ${i * 60}px, ${i * 80}px ${i * 120}px`,
            opacity: 0.35 - i * 0.08,
          }}
        />
      ))}
    </div>
  )
}
