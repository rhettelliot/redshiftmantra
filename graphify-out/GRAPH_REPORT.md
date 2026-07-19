# Graph Report - .  (2026-07-19)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 131 nodes · 134 edges · 18 communities (15 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a173f195`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- page.tsx
- devDependencies
- compilerOptions
- dependencies
- Listen.tsx
- package.json
- include
- layout.tsx
- TrackVisualizer.tsx
- next.config.js
- next-env.d.ts
- screenshot.mjs

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `scripts` - 5 edges
3. `prefersReducedMotion()` - 5 edges
4. `include` - 5 edges
5. `revealOnEnter()` - 4 edges
6. `lib` - 4 edges
7. `TrackVisualizer()` - 3 edges
8. `gsap` - 2 edges
9. `lenis` - 2 edges
10. `next` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Philosophy()` --calls--> `prefersReducedMotion()`  [EXTRACTED]
  src/components/Philosophy.tsx → src/lib/motion.ts
- `Listen()` --calls--> `revealOnEnter()`  [EXTRACTED]
  src/components/Listen.tsx → src/lib/reveal.ts
- `revealOnEnter()` --calls--> `prefersReducedMotion()`  [EXTRACTED]
  src/lib/reveal.ts → src/lib/motion.ts

## Import Cycles
- None detected.

## Communities (18 total, 3 thin omitted)

### Community 0 - "page.tsx"
Cohesion: 0.12
Nodes (12): Album, albums, AmbientOrb(), CustomCursor(), Footer(), Gatekeeper(), Hero(), Navigation() (+4 more)

### Community 1 - "devDependencies"
Cohesion: 0.11
Nodes (19): autoprefixer, devDependencies, autoprefixer, playwright, postcss, tailwindcss, @types/node, @types/react (+11 more)

### Community 2 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 3 - "dependencies"
Cohesion: 0.15
Nodes (13): gsap, lenis, next, dependencies, gsap, lenis, next, react (+5 more)

### Community 4 - "Listen.tsx"
Cohesion: 0.26
Nodes (8): Listen(), platforms, releases, Philosophy(), principles, prefersReducedMotion(), revealOnEnter(), RevealVars

### Community 5 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 6 - "include"
Cohesion: 0.25
Nodes (7): next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude, include

### Community 7 - "layout.tsx"
Cohesion: 0.29
Nodes (5): inter, jetbrains, metadata, playfair, viewport

### Community 8 - "TrackVisualizer.tsx"
Cohesion: 0.67
Nodes (3): drawWaveform(), trackData, TrackVisualizer()

## Knowledge Gaps
- **59 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+54 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `compilerOptions` to `include`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _59 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1225296442687747 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._