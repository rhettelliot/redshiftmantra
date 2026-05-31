/**
 * Returns true when the user has requested reduced motion at the OS level.
 * Components use this to skip cinematic intros and reveal content instantly,
 * so nothing that starts at opacity:0 is ever left stranded.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
