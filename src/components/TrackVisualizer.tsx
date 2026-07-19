'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

// Track data with waveform-inspired visual parameters
const trackData = [
  { name: 'Piece of Ocean Water', freq: 0.8, amp: 0.3, color: '#007AFF' },
  { name: 'Surface Tension', freq: 1.2, amp: 0.5, color: '#007AFF' },
  { name: 'Xi', freq: 0.6, amp: 0.7, color: '#007AFF' },
  { name: 'Hokku', freq: 1.5, amp: 0.4, color: '#007AFF' },
  { name: 'Super Fluous', freq: 2.0, amp: 0.6, color: '#007AFF' },
  { name: 'Byaiana', freq: 0.9, amp: 0.8, color: '#007AFF' },
  { name: 'In Our Hands', freq: 1.1, amp: 0.5, color: '#4DA6FF' },
  { name: 'Ashen Glow', freq: 0.7, amp: 0.9, color: '#FF6B35' },
  { name: 'Ajna', freq: 0.5, amp: 1.0, color: '#FF4D00' },
  { name: '───', freq: 0, amp: 0, color: '#333' }, // divider
  { name: 'Obsidian', freq: 0.4, amp: 0.9, color: '#FF4D00' },
  { name: 'Rain', freq: 1.8, amp: 0.6, color: '#FF4D00' },
  { name: 'Kobayashi Maru', freq: 1.0, amp: 0.8, color: '#FF4D00' },
  { name: 'Nalu', freq: 1.4, amp: 0.5, color: '#FF6B35' },
  { name: 'Cloud Noise', freq: 2.2, amp: 0.7, color: '#FF4D00' },
  { name: 'Calm Between', freq: 0.3, amp: 0.3, color: '#FF6B35' },
  { name: 'Prominence', freq: 0.6, amp: 1.0, color: '#FF4D00' },
]

function drawWaveform(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)

  const width = rect.width
  const height = rect.height
  const midY = height / 2

  ctx.clearRect(0, 0, width, height)

  // Draw center line
  ctx.strokeStyle = 'rgba(255,255,255,0.03)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, midY)
  ctx.lineTo(width, midY)
  ctx.stroke()

  let x = 0
  const segWidth = width / trackData.length

  trackData.forEach((track) => {
    if (track.freq === 0) {
      // Divider — draw thin vertical line
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x + segWidth / 2, midY - height * 0.3)
      ctx.lineTo(x + segWidth / 2, midY + height * 0.3)
      ctx.stroke()
      x += segWidth
      return
    }

    // Glow layer (wide, faint)
    ctx.beginPath()
    ctx.strokeStyle = track.color + '15'
    ctx.lineWidth = 4
    for (let px = 0; px < segWidth; px++) {
      const t = px / segWidth
      const y = midY + Math.sin(t * Math.PI * 2 * track.freq) * (track.amp * height * 0.35)
      if (px === 0) ctx.moveTo(x + px, y)
      else ctx.lineTo(x + px, y)
    }
    ctx.stroke()

    // Main waveform line
    ctx.beginPath()
    ctx.strokeStyle = track.color + '60'
    ctx.lineWidth = 1.5
    for (let px = 0; px < segWidth; px++) {
      const t = px / segWidth
      const y = midY + Math.sin(t * Math.PI * 2 * track.freq) * (track.amp * height * 0.35)
      if (px === 0) ctx.moveTo(x + px, y)
      else ctx.lineTo(x + px, y)
    }
    ctx.stroke()

    x += segWidth
  })
}

export function TrackVisualizer() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const disposers: Array<() => void> = []
    const root = sectionRef.current
    if (!root) return

    const title = root.querySelectorAll('.viz-title')
    const rows = root.querySelectorAll('.track-row')
    revealOnEnter(title, { y: 40 }).then((d) => disposers.push(d))
    revealOnEnter(rows, { x: -30, duration: 0.5 }).then((d) => disposers.push(d))

    return () => disposers.forEach((d) => d())
  }, [])

  // Draw canvas waveforms with resize handling
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    drawWaveform(canvas)

    const observer = new ResizeObserver(() => {
      drawWaveform(canvas)
    })
    observer.observe(canvas)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="section-label mb-8">
          Signal /
        </div>
        <h2 className="viz-title text-[clamp(2rem,5vw,4rem)] font-display font-[900] leading-[1.05] mb-16">
          Waveform<br />Cartography
        </h2>

        {/* Canvas waveform */}
        <canvas
          ref={canvasRef}
          className="w-full h-[120px] md:h-[180px] mb-16 opacity-80"
          style={{ imageRendering: 'auto' }}
          role="img"
          aria-label="Waveform cartography visualization showing the frequency and amplitude shape of each track across the Phoneme and Deep Field Image albums"
        />

        {/* Track listing with visual indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {trackData.filter(t => t.freq > 0).map((track) => (
            <div
              key={track.name}
              className="track-row group flex items-center py-2 border-b border-[var(--border)] hover:bg-surface-hover/20 transition-colors duration-300"
            >
              {/* Frequency indicator */}
              <div
                className="w-2 h-2 mr-3 shrink-0 transition-transform duration-300 group-hover:scale-150"
                style={{ backgroundColor: track.color, borderRadius: 0 }}
              />
              <div className="flex-1">
                <span className="text-[13px] text-light-dim group-hover:text-light transition-colors">{track.name}</span>
              </div>
              <span className="font-mono text-[8px] tracking-[0.05em] uppercase text-light-muted">
                {track.freq.toFixed(1)}Hz · {(track.amp * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="divider-glow max-w-5xl mx-auto mt-16" />
    </section>
  )
}