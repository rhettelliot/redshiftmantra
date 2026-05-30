'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const pos = { x: 0, y: 0 }
    const ringPos = { x: 0, y: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!isVisible) setIsVisible(true)
    }

    const handleEnter = () => setIsVisible(true)
    const handleLeave = () => setIsVisible(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleEnter)
    document.addEventListener('mouseleave', handleLeave)

    // Track hover on interactive elements
    const handleOver = () => setIsHovering(true)
    const handleOut = () => setIsHovering(false)

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.removeEventListener('mouseenter', handleOver)
        el.removeEventListener('mouseleave', handleOut)
        el.addEventListener('mouseenter', handleOver)
        el.addEventListener('mouseleave', handleOut)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', handleOver)
      el.addEventListener('mouseleave', handleOut)
    })

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
      observer.disconnect()
    }
  }, [isVisible])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9500] will-change-transform"
        style={{
          width: isHovering ? '6px' : '4px',
          height: isHovering ? '6px' : '4px',
          marginLeft: isHovering ? '-3px' : '-2px',
          marginTop: isHovering ? '-3px' : '-2px',
          backgroundColor: 'var(--accent)',
          borderRadius: '0',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, margin 0.2s, opacity 0.3s',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9500] will-change-transform"
        style={{
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          marginLeft: isHovering ? '-30px' : '-20px',
          marginTop: isHovering ? '-30px' : '-20px',
          border: `1px solid ${isHovering ? 'var(--accent)' : 'rgba(255,255,255,0.3)'}`,
          borderRadius: '0',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.3s cubic-bezier(0.34,1.56,0.64,1), height 0.3s cubic-bezier(0.34,1.56,0.64,1), margin 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, opacity 0.3s',
        }}
      />
    </>
  )
}