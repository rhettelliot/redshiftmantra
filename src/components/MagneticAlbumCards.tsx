'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * MagneticAlbumCards
 *
 * Album cover frames are magnetically pulled toward the cursor when near,
 * creating a tactile " Album in hand" feel. Falls back to a subtle CSS hover
 * lift on non-hover devices.
 */
export function MagneticAlbumCards() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (prefersReducedMotion() || window.matchMedia('(hover: none)').matches) return

    const targets: HTMLElement[] = Array.from(section.querySelectorAll('[data-magnetic]'))
    const springs = new Map<Element, { x: number; y: number; rx: number; ry: number }>()
    targets.forEach((el) => springs.set(el, { x: 0, y: 0, rx: 0, ry: 0 }))

    let raf = 0
    let isHoveringSection = false

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      isHoveringSection = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      setHovered(isHoveringSection)

      targets.forEach((el) => {
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
        const maxDist = 250
        const pull = Math.max(0, 1 - dist / maxDist) ** 1.6

        const dx = e.clientX - cx
        const dy = e.clientY - cy
        springs.set(el, {
          x: dx * pull * 0.35,
          y: dy * pull * 0.35,
          rx: dy * pull * 0.04,
          ry: -dx * pull * 0.04,
        })
      })
    }

    const onLeave = () => {
      isHoveringSection = false
      setHovered(false)
      targets.forEach((el) => springs.set(el, { x: 0, y: 0, rx: 0, ry: 0 }))
    }

    const tick = () => {
      targets.forEach((el) => {
        const s = springs.get(el)!
        const st = window.getComputedStyle(el)
        const cx = parseFloat(st.getPropertyValue('--mx') || '0')
        const cy = parseFloat(st.getPropertyValue('--my') || '0')
        const crx = parseFloat(st.getPropertyValue('--mrx') || '0')
        const cry = parseFloat(st.getPropertyValue('--mry') || '0')

        const nx = cx + (s.x - cx) * 0.1
        const ny = cy + (s.y - cy) * 0.1
        const nrx = crx + (s.rx - crx) * 0.1
        const nry = cry + (s.ry - cry) * 0.1

        el.style.setProperty('--mx', `${nx}`)
        el.style.setProperty('--my', `${ny}`)
        el.style.setProperty('--mrx', `${nrx}`)
        el.style.setProperty('--mry', `${nry}`)
        el.style.transform = `perspective(900px) translate3d(${nx}px, ${ny}px, 0) rotateX(${nrx}deg) rotateY(${nry}deg)`
      })
      raf = requestAnimationFrame(tick)
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
