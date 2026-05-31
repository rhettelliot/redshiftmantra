import type Lenis from 'lenis'

// Module-level handle to the single Lenis instance created by <SmoothScroll>.
// Lets non-child components (e.g. Navigation) drive smooth scrolling without
// prop-drilling or a context provider.
let lenis: Lenis | null = null

export const setLenis = (instance: Lenis | null) => {
  lenis = instance
}

/**
 * Smoothly scroll to a section. `target` is a CSS selector ('#albums') or a
 * numeric Y offset. Falls back to native smooth scroll if Lenis isn't ready.
 */
export const scrollToTarget = (target: string | number) => {
  if (lenis) {
    lenis.scrollTo(target, { offset: -64, duration: 1.2 })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}
