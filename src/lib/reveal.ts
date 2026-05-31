import { prefersReducedMotion } from './motion'

type RevealVars = { y?: number; x?: number; duration?: number }

/**
 * Reveal elements as they enter the viewport.
 *
 * Uses IntersectionObserver rather than GSAP ScrollTrigger: under a smooth-scroll
 * library (Lenis) ScrollTrigger positions can go stale after layout shifts (gate
 * dismissal, font swap), leaving `from` tweens stranded at opacity:0 — i.e. blank
 * sections. IntersectionObserver is independent of scroll-position sync, so the
 * reveal always fires. GSAP is still used for the easing.
 *
 * Returns a disposer; call it on effect cleanup.
 */
export async function revealOnEnter(
  elements: Element[] | NodeListOf<Element>,
  vars: RevealVars = {}
): Promise<() => void> {
  const els = Array.from(elements)
  if (!els.length) return () => {}

  const gsap = (await import('gsap')).default
  const { y = 40, x = 0, duration = 0.8 } = vars

  // Reduced motion: show everything immediately, no transform.
  if (prefersReducedMotion()) {
    gsap.set(els, { opacity: 1, x: 0, y: 0 })
    return () => {}
  }

  gsap.set(els, { opacity: 0, x, y })

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        gsap.to(entry.target, { opacity: 1, x: 0, y: 0, duration, ease: 'power3.out' })
        obs.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
  )
  els.forEach((el) => io.observe(el))
  return () => io.disconnect()
}
