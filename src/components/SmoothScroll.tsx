'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // Connect to GSAP ticker once GSAP loads
    const connectGSAP = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)
    }
    connectGSAP()

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}