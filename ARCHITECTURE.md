# Architecture

## Overview

Red Shift Mantra is a **single-page, statically-generated** artist website built on Next.js 14's App Router. The page is entirely client-rendered after the initial static shell, with all interactive behavior (scroll animations, custom cursor, smooth scrolling) handled by client components.

---

## Rendering Strategy

```
Static Generation (build time)
    └── layout.tsx (Server Component)
        ├── Font loading (next/font/google)
        ├── Metadata export (title, OG tags)
        └── Noise overlay div
            └── page.tsx (Server Component — composition only)
                └── All children are 'use client' components
```

- **No API routes, no server-side data fetching** — all content is hardcoded in component files
- The build produces fully static HTML (`○ (Static)` in build output)
- First Load JS: ~100 KB (shared chunks + page bundle)

---

## Component Architecture

### Hierarchy

```
SmoothScroll (Lenis wrapper)
├── CustomCursor          # Fixed, pointer-events-none
├── AmbientOrb            # Fixed, mouse-following glow
├── Gatekeeper            # Fixed overlay, z-9999, dismissed on click
├── Navigation            # Fixed top bar, scroll-aware
└── <main>
    ├── Hero              # Full viewport, perspective grid
    ├── Philosophy        # Scroll-scrubbed word reveal
    ├── Albums            # Album data + track lists
    ├── TrackVisualizer   # Canvas waveform + track grid
    ├── VisualOS          # Film concept cards
    └── Listen            # Platform links
└── Footer
```

### Component Patterns

All components follow the same pattern:

1. **`'use client'` directive** — required for hooks and DOM access
2. **`useRef`** for DOM element references
3. **Dynamic GSAP import** — `const gsap = (await import('gsap')).default`
4. **ScrollTrigger registration** in each component that uses it
5. **Cleanup in `useEffect` return** (where applicable)

### Global Layers (z-index scale)

| Layer | z-index | Component |
|-------|---------|-----------|
| Gate | 9999 | Gatekeeper |
| Cursor | 9500 | CustomCursor |
| Noise | 9000 | `.noise-overlay` (layout) |
| Nav | 50 | Navigation |
| Orb | 1 | AmbientOrb |

---

## Animation System

### GSAP (Dynamic Import)

GSAP is **never statically imported** — every component dynamically imports it inside `useEffect`:

```typescript
const gsap = (await import('gsap')).default
const { ScrollTrigger } = await import('gsap/ScrollTrigger')
gsap.registerPlugin(ScrollTrigger)
```

This avoids SSR issues since GSAP requires `window`. The trade-off is that `ScrollTrigger` is registered multiple times across components, but GSAP handles this idempotently.

### Animation Types

| Type | Used In | Mechanism |
|------|---------|-----------|
| Entrance (once) | Hero, Navigation, Albums, TrackVisualizer, VisualOS, Listen | `gsap.from()` with `ScrollTrigger { once: true }` |
| Scroll-scrubbed | Philosophy | `gsap.to()` with `ScrollTrigger { scrub: 1.5 }` |
| Gate transition | Gatekeeper | `gsap.to()` (opacity → display:none) |
| Continuous loop | Gatekeeper particles | CSS `@keyframes floatUp` |
| Mouse-following | CustomCursor, AmbientOrb | `requestAnimationFrame` loop with lerp |

### Smooth Scrolling

Lenis is initialized in `SmoothScroll.tsx` and bridged to GSAP:

```
Lenis scroll event → ScrollTrigger.update()
GSAP ticker → lenis.raf(time)
```

The `lerp: 0.07` value creates a slow, cinematic scroll feel.

---

## Styling Architecture

### Dual Token System

Design tokens are defined in **two places** (intentionally mirrored):

1. **CSS Custom Properties** (`globals.css :root`) — used by vanilla CSS utilities (`.noise-overlay`, `.hollow-text`, `.section-label`, `.badge`, scrollbar styles)
2. **Tailwind Config** (`tailwind.config.js`) — used by component utility classes

Both define the same color values, font families, and animation keyframes. This allows components to use Tailwind utilities while CSS utilities reference custom properties.

### Typography Scale

- **Display**: `clamp()` fluid sizing, e.g. `text-[clamp(3rem,10vw,9rem)]`
- **Labels**: Fixed small sizes (`9px`–`11px`) with heavy letter-spacing
- **Body**: `15px` with `1.8` line-height

### Responsive Approach

- Mobile breakpoint at `768px` (`md:` prefix in Tailwind)
- Heading sizes forced smaller via `!important` in `globals.css` mobile media query
- Navigation links hidden below `md` (no hamburger menu)
- Touch device detection skips custom cursor and ambient orb

---

## Data Model

All content is **hardcoded inline** — no CMS, no API, no JSON files:

| Data | Location | Type |
|------|----------|------|
| Album metadata (titles, tracks, links) | `Albums.tsx` | `Album[]` interface |
| Philosophy principles | `Philosophy.tsx` | Array of `{ label, title, text }` |
| Track visualizer data | `TrackVisualizer.tsx` | Array of `{ name, freq, amp, color }` |
| Visual/film concepts | `VisualOS.tsx` | Array of `{ album, track, visual, palette }` |
| Streaming platforms | `Listen.tsx` | Array of `{ name, url, icon }` |
| Navigation sections | `Navigation.tsx` | Array of `{ label, title, href }` |

---

## Canvas Rendering

`TrackVisualizer.tsx` contains a `<canvas>` element that draws waveform segments:

- One segment per track, width = `canvas.width / 16`
- Each waveform: `sin(t * 2π * freq) * amp * height * 0.35`
- Rendered once on mount (not animated)
- DPR-aware scaling for crisp rendering
- Divider tracks (freq=0) draw vertical separator lines

---

## Build Output

```
Route (app)                Size     First Load JS
┌ ○ /                      12.6 kB  99.9 kB
└ ○ /_not-found            875 B    88.2 kB
+ First Load JS shared     87.4 kB
```

All routes are statically generated. The shared bundle includes React, Lenis, and Three.js (tree-shaken but still present in the dependency graph).
