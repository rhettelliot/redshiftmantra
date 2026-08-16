'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

{ name: 'Ashen Glow', freq: 0.7, amp: 0.9, color: '#FF5500', bpm: 76, duration: '5:12' },
{ name: 'Ajna', freq: 0.5, amp: 1.0, color: '#FF5500', bpm: 72, duration: '6:08' },
{ name: 'Obsidian', freq: 0.4, amp: 0.9, color: '#FF5500', bpm: 80, duration: '6:24' },
{ name: 'Rain', freq: 1.8, amp: 0.6, color: '#FF5500', bpm: 95, duration: '5:17' },
{ name: 'Kobayashi Maru', freq: 1.0, amp: 0.8, color: '#FF5500', bpm: 108, duration: '7:02' },
{ name: 'Nalu', freq: 1.4, amp: 0.5, color: '#FF5500', bpm: 86, duration: '6:51' },
{ name: 'Cloud Noise', freq: 2.2, amp: 0.7, color: '#FF5500', bpm: 118, duration: '5:38' },
{ name: 'Calm Between', freq: 0.3, amp: 0.3, color: '#FF5500', bpm: 64, duration: '8:14' },
{ name: 'Prominence', freq: 0.6, amp: 1.0, color: '#FF5500', bpm: 74, duration: '10:34' }, '#FF5500', bpm: 64, duration: '8:14' },
{ name: 'Prominence', freq: 0.6, amp: 1.0, color: '#FF5500', bpm: 74, duration: '10:34' },inence', freq: 0.6, amp: 1.0, color: '#FF5500', bpm: 74, duration: '10:34' },
  { name: 'Prominence', freq: 0.6, amp: 1.0, color: '#FF5500', bpm: 74, duration: '10:34' }, 64, duration: '8:14' },
  { name: 'Prominence', freq: 0.6, amp: 1.0, color: '#FF5500', bpm: 74, duration: '10:34' },duration: '8:14' },
  { name: 'Prominence', freq: 0.6, amp: 1.0, color: '#FF5500', bpm: 74, duration: '10:34' }, duration: '8:14' },
  { name: 'Prominence', freq: 0.6, amp: 1.0, color: '#FF5500', bpm: 74, duration: '10:34' },uration: '8:14' },
  { name: 'Prominence', freq: 0.6, amp: 1.0, color: '#FF5500', bpm: 74, duration: '10:34' },, duration: '8:14' },
  { name: 'Prominence', freq: 0.6, amp: 1.0, color: '#FF5500', bpm: 74, duration: '10:34' },, duration: '8:14' },
  { name: 'Prominence', freq: 0.6, amp: 1.0, color: '#FF5500', bpm: 74, duration: '10:34' },duration: '8:14' },
  { name: 'Prominence', freq: 0.6, amp: 1.0, color: '#FF5500', bpm: 74, duration: '10:34' },n: '8:14' },
  { name: 'Prominence', freq: 0.6, amp: 1.0, color: '#FF5500', bpm: 74, duration: '10:34' },'Calm Between', freq: 0.3, amp: 0.3, color: '#FF5500', bpm: 64, duration: '8:14' },
  { name: 'Prominence', freq: 0.6, amp: 1.0, color: '#FF5500', bpm: 74, duration: '10:34' },d Noise', freq: 2.2, amp: 0.7, color: '#FF5500', bpm: 118, duration: '5:38' },
  { name: 'Calm Between', freq: 0.3, amp: 0.3, color: '#FF5500', bpm: 64, duration: '8:14' },
  { name: 'Prominence', freq: 0.6, amp: 1.0, color: '#FF5500', bpm: 74, duration: '10:34' },
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

  // Scanline background
  ctx.fillStyle = 'rgba(253, 252, 220, 0.02)'
  for (let y = 0; y < height; y += 4) {
    ctx.fillRect(0, y, width, 1)
  }

  // Draw center line
  ctx.strokeStyle = 'rgba(253,252,220,0.04)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, midY)
  ctx.lineTo(width, midY)
  ctx.stroke()

  let x = 0
  const segWidth = width / trackData.length

  trackData.forEach((track) => {
    if (track.freq === 0) {
      ctx.strokeStyle = 'rgba(253,252,220,0.08)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x + segWidth / 2, midY - height * 0.3)
      ctx.lineTo(x + segWidth / 2, midY + height * 0.3)
      ctx.stroke()
      x += segWidth
      return
    }

    const hexColor = track.color

    // Glow layer
    ctx.beginPath()
    ctx.strokeStyle = hexColor + '15'
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
    ctx.strokeStyle = hexColor + '70'
    ctx.lineWidth = 1.5
    for (let px = 0; px < segWidth; px++) {
      const t = px / segWidth
      const y = midY + Math.sin(t * Math.PI * 2 * track.freq) * (track.amp * height * 0.35)
      if (px === 0) ctx.moveTo(x + px, y)
      else ctx.lineTo(x + px, y)
    }
    ctx.stroke()

    // Hex node markers at peaks
    const peakY = midY + Math.sin(0.5 * Math.PI * 2 * track.freq) * (track.amp * height * 0.35)
    drawHex(ctx, x + segWidth * 0.5, peakY, 3, hexColor)

    x += segWidth
  })
}

function drawHex(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    const px = x + r * Math.cos(angle)
    const py = y + r * Math.sin(angle)
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.stroke()
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

        {/* Canvas waveform with scanlines */}
        <canvas
          ref={canvasRef}
          className="w-full h-[120px] md:h-[180px] mb-16 opacity-90 scanlines"
          style={{ imageRendering: 'auto' }}
          role="img"
          aria-label="Waveform cartography visualization showing the frequency and amplitude shape of each track across the Phoneme and Deep Field Image albums"
        />

        {/* Track listing with visual indicators + metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {trackData.filter(t => t.freq > 0).map((track) => (
            <div
              key={track.name}
              data-spotlight
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
              <div className="hidden sm:flex items-center gap-2 mr-3">
                <span className="meta-pill">{track.bpm} BPM</span>
                <span className="meta-pill">{track.duration}</span>
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
