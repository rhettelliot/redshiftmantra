# Red Shift Mantra

> *The geometry of sound. The transmutation of matter.*

Artist website for **Red Shift Mantra** — an Electronic / Synthwave project released under [Manteis Recordings](https://manteisrecordings.com). A cinematic, scroll-driven single-page experience built with Next.js 14, GSAP, and Lenis smooth scrolling.

---

## Albums

| Album | Tracks | Theme Arc | Year |
|-------|--------|-----------|------|
| **Phoneme** | 9 (~42 min) | Vibration → Life → Consciousness | 2025 |
| **Deep Field Image** | 7 (~50 min) | Void → Organic → Machine → Ether → Energy | 2025 |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org) (App Router, static export) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 + CSS custom properties |
| Animation | [GSAP](https://gsap.com) (ScrollTrigger, dynamic import) |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering/) |
| 3D (dep installed) | [Three.js](https://threejs.org) (not yet utilized) |
| Fonts | Google Fonts via `next/font` — Playfair Display, Inter, JetBrains Mono |
| Screenshots | [Playwright](https://playwright.dev) (dev utility) |

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build

# Start production server
npm run start
```

The dev server runs on `http://localhost:3000` by default.

---

## Project Structure

```
redshiftmantra/
├── public/
│   ├── favicon.svg          # SVG crosshair-style favicon
│   └── index.html           # Static HTML shell (OG meta, fallback)
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout — fonts, metadata, noise overlay
│   │   └── page.tsx         # Home page — component composition
│   ├── components/
│   │   ├── Gatekeeper.tsx   # Entry gate with GSAP fade transition
│   │   ├── Hero.tsx         # Full-screen hero with perspective grid
│   │   ├── Navigation.tsx   # Sticky nav with scroll-aware state
│   │   ├── Philosophy.tsx   # Scroll-scrubbed word-reveal text
│   │   ├── Albums.tsx       # Album data, track lists, streaming links
│   │   ├── TrackVisualizer.tsx  # Canvas waveform + track grid
│   │   ├── VisualOS.tsx     # Film/visual concept cards with palettes
│   │   ├── Listen.tsx       # Streaming platform links section
│   │   ├── Footer.tsx       # Brand, album links, coordinates
│   │   ├── CustomCursor.tsx # Square cursor with trailing ring
│   │   ├── AmbientOrb.tsx   # Mouse-following radial gradient
│   │   └── SmoothScroll.tsx # Lenis wrapper + GSAP ticker bridge
│   └── styles/
│       └── globals.css      # Design system — tokens, typography, utilities
├── screenshot.mjs           # Playwright screenshot automation
├── tailwind.config.js       # Custom colors, fonts, animations
├── next.config.js           # Image domain allowlist
├── tsconfig.json            # TypeScript config with path aliases
└── package.json
```

---

## Design System

The visual language is built around a **"Cosmic Void"** aesthetic:

- **Palette**: Pure black void (`#000000`) with warm accent (`#FF4D00`) and cool accent (`#007AFF`)
- **Typography**: Playfair Display (display/headings), Inter (body), JetBrains Mono (labels/data)
- **Motion**: Three tiers — fast (0.3s), normal (0.6s), cinematic (2s) with custom cubic-bezier easings
- **Texture**: SVG noise overlay at 3% opacity over entire viewport
- **Cursor**: Custom square cursor with trailing ring, hidden native cursor
- **Elements**: Hollow stroke text, glowing dividers, monospace section labels, square badges

---

## Environment

- **Node**: 18+ recommended
- **Image Domains**: `imgix.distrokid.com` (configured in `next.config.js`)
- **External Links**: DistroKid HyperFollow, Spotify, SoundCloud
- **Coordinates**: 47.6062° N, 122.3321° W (Seattle)

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build (static pages) |
| `npm run start` | Serve production build |
| `npm run lint` | Run Next.js linter |
| `node screenshot.mjs` | Capture screenshots via Playwright (requires dev server on port 3001) |

---

## License

© Red Shift Mantra · All rights reserved · Manteis Recordings
