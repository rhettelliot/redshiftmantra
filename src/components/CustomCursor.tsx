'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsTouch(true)
      return
    }

    const pos = { x: 0, y: 0 }
    const ringPos = { x: 0, y: 0 }
    let visible = false
    let hovering = false

    const updateCursorStyle = () => {
      if (!cursorRef.current || !ringRef.current) return
      const dot = cursorRef.current
      const ring = ringRef.current
      const size = hovering ? 6 : 4
      const ringSize = hovering ? 60 : 40

      dot.style.width = dot.style.height = `${size}px`
      dot.style.marginLeft = dot.style.marginTop = `${-size / 2}px`
      dot.style.opacity = visible ? '1' : '0'

      ring.style.width = ring.style.height = `${ringSize}px`
      ring.style.marginLeft = ring.style.marginTop = `${-ringSize / 2}px`
      ring.style.borderColor = hovering ? 'var(--accent)' : 'rgba(255,255,255,0.3)'
      ring.style.opacity = visible ? '1' : '0'
    }

    const handleMouseMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!visible) {
        visible = true
        updateCursorStyle()
      }
    }

    const handleEnter = () => { visible = true; updateCursorStyle() }
    const handleLeave = () => { visible = false; updateCursorStyle() }
    const handleOver = () => { hovering = true; updateCursorStyle() }
    const handleOut = () => { hovering = false; updateCursorStyle() }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleEnter)
    document.addEventListener('mouseleave', handleLeave)

    // Efficient: attach hover listeners once, use event delegation
    const handleDelegatedHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, [data-cursor]')
      if (target) {
        hovering = e.type === 'mouseover'
        updateCursorStyle()
      }
    }

    document.addEventListener('mouseover', handleDelegatedHover)
    document.addEventListener('mouseout', handleDelegatedHover)

    let rafId: number
    const animate = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.15
      ringPos.y += (pos.y - ringPos.y) * 0.15
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleEnter)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseover', handleDelegatedHover)
      document.removeEventListener('mouseout', handleDelegatedHover)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform"
        style={{
          width: '4px',
          height: '4px',
          marginLeft: '-2px',
          marginTop: '-2px',
          backgroundColor: 'var(--accent)',
          borderRadius: '0',
          opacity: 0,
          transition: 'width 0.2s, height 0.2s, margin 0.2s, opacity 0.3s',
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform"
        style={{
          width: '40px',
          height: '40px',
          marginLeft: '-20px',
          marginTop: '-20px',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '0',
          opacity: 0,
          transition: 'width 0.3s cubic-bezier(0.34,1.56,0.64,1), height 0.3s cubic-bezier(0.34,1.56,0.64,1), margin 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, opacity 0.3s',
        }}
        aria-hidden="true"
      />
    </>
  )
}