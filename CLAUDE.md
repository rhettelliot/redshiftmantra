# CLAUDE.md

Context file for AI-assisted development on the Red Shift Mantra project.

## Project Identity

- **What**: Single-page artist website for Red Shift Mantra (Electronic / Synthwave)
- **Label**: Manteis Recordings
- **Aesthetic**: "Cosmic Void" — pure black, typographic, geometric, cinematic
- **Status**: Production-ready, statically generated, two albums (Phoneme, Deep Field Image)

## Tech Stack

- Next.js 14 (App Router, static export)
- TypeScript 5
- Tailwind CSS 3.4 + CSS custom properties
- GSAP (ScrollTrigger) — always dynamically imported
- Lenis (smooth scroll, lerp: 0.07)
- Three.js (installed but unused — future feature)
- Google Fonts via next/font: Playfair Display, Inter, JetBrains Mono

## Critical Patterns

### GSAP Import Pattern
GSAP must ALWAYS be dynamically imported inside useEffect to avoid SSR breakage:
```typescript
useEffect(() => {
  const animate = async () => {
    const gsap = (await import('gsap')).default
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)
    // ... animations
  }
  animate()
}, [])
```

### Component Convention
- Every component uses `'use client'` directive
- DOM refs via `useRef`, animations in `useEffect`
- Interactive elements get `data-cursor` attribute and `cursor-none` class
- All link targets get `rel="noreferrer noopener"`

### Design Tokens
Tokens are defined in TWO places (must stay in sync):
1. `src/styles/globals.css` — `:root` custom properties
2. `tailwind.config.js` — `theme.extend.colors` / `fontFamily` / `animation`

### Color System
| Token | Hex | Usage |
|-------|-----|-------|
| void | #000000 | Background |
| light | #FAFAFA | Primary text |
| accent | #FF4D00 | Primary accent (Deep Field Image) |
| accent-blue | #007AFF | Secondary accent (Phoneme) |
| surface | #0A0A0A | Elevated backgrounds |

### Z-Index Scale
- 9999: Gatekeeper
- 9500: CustomCursor
- 9000: Noise overlay
- 50: Navigation
- 1: AmbientOrb

## File Layout

```
src/
├── app/
│   ├── layout.tsx       # Fonts, metadata, noise overlay
│   └── page.tsx         # Component composition only
├── components/          # 12 client components
└── styles/
    └── globals.css      # Design system, reset, utilities
```

## Content Location

All content is hardcoded in component files (no CMS, no API):
- Album data → `Albums.tsx`
- Philosophy text → `Philosophy.tsx`
- Track visualizer data → `TrackVisualizer.tsx`
- Film concepts → `VisualOS.tsx`
- Platform links → `Listen.tsx`

## Build & Verification

```bash
npm run build    # Must produce ○ (Static) for all routes
npm run dev      # Dev server on localhost:3000
```

Build output should be ~100KB First Load JS. All routes static.

## Design Rules

1. **No rounded corners** — all elements use `borderRadius: 0` or square shapes
2. **No raster images** — typography and color are the medium
3. **Monospace for data** — labels, section markers, metadata use JetBrains Mono
4. **Display for headings** — Playfair Display, weight 900, tight leading
5. **Hollow text effect** — transparent fill + 1px white stroke for secondary headings
6. **Square cursor** — native cursor hidden everywhere, custom square dot + ring
7. **Noise grain** — SVG texture overlay at 3% opacity, always present
8. **Cinematic scroll** — Lenis smooth scroll creates deliberate pacing

## Known Issues / Debt

- Three.js is an unused dependency (~adds to node_modules but tree-shaken from bundle)
- `public/index.html` is a legacy artifact — Next.js generates its own HTML shell; references a non-existent `/og-image.jpg`
- Platform URLs in `Listen.tsx` use placeholder artist-level patterns — HyperFollow links for releases are real
- Design tokens duplicated between CSS custom properties and Tailwind config (must stay in sync manually)

## Recent Polish (v1.1)

- **Gatekeeper**: sessionStorage persistence (skips on repeat visits), staggered entrance/exit animations, keyboard support, deterministic particle positions
- **Navigation**: mobile hamburger menu with fullscreen overlay, animated X transition, body scroll lock
- **Hero**: staggered element reveal, scroll indicator bounce animation
- **Listen**: enriched release data (subtitle, year, track count), scroll-triggered entrance animations
- **CustomCursor**: replaced MutationObserver with event delegation (mouseover/mouseout) — eliminated per-element listener attachment and DOM re-scanning
- **TrackVisualizer**: ResizeObserver for responsive canvas, extracted drawWaveform function, enhanced glow layer
- **CSS**: scroll indicator bounce keyframe, focus-visible styles for keyboard navigation, improved mobile section labels
- **Layout**: enriched metadata (favicon, theme-color, improved description)
- **Screenshot**: fixed port from 3001 → 3000
