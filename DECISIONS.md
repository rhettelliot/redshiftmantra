# Decisions

Technical and design decisions made in this project, with rationale.

---

## D001 — Static Generation Over SSR

**Decision**: All pages are statically generated at build time. No server-side rendering, no API routes.

**Rationale**: This is a single-page artist portfolio with zero dynamic data. Static generation gives the fastest possible TTFB, works on any CDN/hosting, and eliminates server costs. All content (albums, tracks, philosophy text) is hardcoded in component files, making a CMS unnecessary at this scale.

**Trade-off**: Adding new albums or changing track listings requires a code change and redeploy. Acceptable for an artist with two albums and infrequent releases.

---

## D002 — Dynamic GSAP Imports

**Decision**: GSAP is dynamically imported inside `useEffect` in every component that uses it, rather than statically imported at the module level.

**Rationale**: GSAP accesses `window` and `document` on import, which breaks during Next.js server-side rendering. Dynamic import inside `useEffect` guarantees client-only execution without needing `next/dynamic` wrappers.

**Trade-off**: `ScrollTrigger` is registered redundantly across multiple components. GSAP handles this gracefully (idempotent registration), but it's a minor inefficiency. A shared initialization module could centralize this.

---

## D003 — Lenis for Smooth Scrolling

**Decision**: Use Lenis (lerp-based smooth scroll) instead of native CSS `scroll-behavior: smooth`.

**Rationale**: Native smooth scrolling doesn't provide the cinematic, momentum-based feel that matches the site's aesthetic. Lenis with `lerp: 0.07` creates a deliberately slow, heavy scroll that makes the page feel like a curated visual experience rather than a standard website.

**Trade-off**: Adds ~8KB to the bundle. Lenis must be bridged to GSAP's ScrollTrigger via the ticker to keep scroll-triggered animations in sync. The bridge is set up in `SmoothScroll.tsx`.

---

## D004 — Custom Square Cursor

**Decision**: Replace the native cursor with a custom square dot + trailing square ring, hiding the native cursor via `cursor: none`.

**Rationale**: Reinforces the geometric, angular design language (no circles, no rounded corners). The trailing ring with spring easing adds a subtle sense of physicality.

**Trade-off**: Touch devices are excluded via `(hover: none)` media query check. The `MutationObserver` pattern for tracking hoverable elements is somewhat heavy — it re-queries the DOM on every mutation to attach hover listeners.

---

## D005 — Gatekeeper Entry Pattern

**Decision**: Show a full-screen gate overlay that requires clicking "Enter" before revealing the site.

**Rationale**: Creates a deliberate threshold between the outside web and the immersive experience. Matches the cinematic, intentional pacing of the project. The gate also provides a clean loading state — by the time the user clicks, GSAP and Lenis are loaded.

**Trade-off**: Adds friction. Users who arrive via deep links (e.g., `#albums`) will still see the gate. There's no persistence — refreshing the page shows the gate again.

---

## D006 — Dual Token System (CSS + Tailwind)

**Decision**: Define the same design tokens in both CSS custom properties (`:root`) and `tailwind.config.js`.

**Rationale**: Tailwind utilities are used for component-level styling (`text-accent`, `bg-void`), but some effects (noise overlay, hollow text, scrollbar, badges) are easier to express as vanilla CSS classes that reference custom properties. Mirroring the tokens keeps both systems in sync.

**Trade-off**: Token values are duplicated. A change to a color value must be made in two places. Could be solved with a CSS-variables-first approach where Tailwind references `var(--*)`, but the current approach is explicit and readable.

---

## D007 — No Images / Album Art

**Decision**: The site uses no raster images — no album covers, no photos, no background images (aside from the SVG noise texture).

**Rationale**: The design philosophy is **typography and color as the medium**. Album identity is conveyed through color coding (blue for Phoneme, orange for Deep Field Image), typography hierarchy, and gradient swatches in the VisualOS section. This eliminates image loading, simplifies hosting, and creates a distinctive aesthetic.

**Trade-off**: Visitors expecting traditional album art will find the presentation abstract. The DistroKid image domain is configured in `next.config.js` but not currently used — it's there for future use.

---

## D008 — Three.js Dependency (Unused)

**Decision**: Three.js and `@types/three` are included in dependencies but not imported anywhere.

**Rationale**: Likely planned for a future 3D visual element (perhaps a WebGL waveform, particle system, or the "Visual OS" film previews). Kept in `package.json` for future development.

**Trade-off**: Adds to `node_modules` size and appears in the dependency graph, though tree-shaking should exclude it from the production bundle since nothing imports it. Could be removed until actually needed.

---

## D009 — Hardcoded Content Over CMS

**Decision**: All content — album metadata, track names, philosophy text, platform links — is defined as TypeScript constants inside component files.

**Rationale**: Two albums, 16 tracks, three philosophy entries. The content surface is small enough that a CMS would add complexity without meaningful benefit. TypeScript gives type safety on the data shapes. Co-locating data with its rendering component keeps things simple.

**Trade-off**: Non-technical collaborators cannot update content without touching code. If the project grows to 5+ albums or adds a blog/news section, migrating to a headless CMS (or even a local JSON/MDX file) would be warranted.

---

## D010 — No Mobile Navigation Menu

**Decision**: Navigation links are hidden on mobile (`hidden md:flex`) with no hamburger menu or drawer.

**Rationale**: The site is a continuous scroll experience. On mobile, the natural interaction is to scroll through sections sequentially. Jump-to-section navigation is less critical on a single-page layout where the content is linear.

**Trade-off**: Mobile users cannot jump to specific sections. The `#philosophy`, `#albums`, `#listen` anchors still work if typed directly. A minimal mobile menu could be added without changing the design language.

---

## D011 — Playwright for Screenshots

**Decision**: Include a Playwright script (`screenshot.mjs`) for automated screenshot capture.

**Rationale**: Provides reproducible visual documentation of the site across sections. Useful for OG images, portfolio presentations, and visual regression checks. The script handles the Gatekeeper by clicking "Enter" before capturing.

**Trade-off**: Playwright is a heavy devDependency (~50MB). The script hardcodes port 3001, which may conflict with the default Next.js port 3000.

---

## D012 — SVG Noise Overlay

**Decision**: Apply a fixed, full-viewport SVG noise texture at 3% opacity via an inline data URI.

**Rationale**: Adds analog film grain texture to the pure-black void, breaking up the digital flatness. Using an inline SVG data URI avoids an extra network request. The fixed positioning and `pointer-events: none` ensure it doesn't interfere with interaction.

**Trade-off**: The noise overlay sits at `z-index: 9000`, which is below the cursor (9500) and gate (9999) but above all content. This is intentional — the grain should affect all content equally.
