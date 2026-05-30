'use client'

import { useEffect, useRef } from 'react'

export function AmbientOrb() {
  const orbRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 })

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    document.addEventListener('mousemove', handleMouseMove)

    let rafId: number
    const animate = () => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.03
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.03
      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={orbRef}
      className="fixed top-0 left-0 pointer-events-none will-change-transform"
      style={{
        width: '800px',
        height: '800px',
        marginLeft: '-400px',
        marginTop: '-400px',
        background: 'radial-gradient(circle, rgba(255,77,0,0.06) 0%, rgba(0,0,0,0) 60%)',
        mixBlendMode: 'screen',
        zIndex: 1,
      }}
    />
  )
}