'use client'

export function ChromaGrid() {
  const cells = Array.from({ length: 24 }, (_, i) => i)

  return (
    <section className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="section-label mb-12">
          Signal Matrix /
        </div>

        <div className="chroma-grid grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4"
        >
          {cells.map((i) => (
            <div
              key={i}
              className="chroma-cell group relative aspect-square bg-void border border-[var(--border)] overflow-hidden"
              style={{ animationDelay: `${(i % 6) * 0.12}s` }}
            >
              <div className="chroma-border absolute inset-0 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center"
              >
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted/40 group-hover:text-light/80 transition-colors"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .chroma-cell {
          position: relative;
        }
        .chroma-border {
          background: linear-gradient(135deg, var(--accent-blue), var(--accent));
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 0;
          mask-image: linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          padding: 1px;
        }
        .chroma-cell:hover .chroma-border {
          opacity: 1;
        }
        .chroma-cell::before {
          content: '';
          position: absolute;
          inset: 1px;
          background: var(--void);
          z-index: 1;
        }
        .chroma-cell > *:not(.chroma-border) {
          position: relative;
          z-index: 2;
        }
        .chroma-grid:hover .chroma-cell:not(:hover) {
          opacity: 0.45;
          transition: opacity 0.4s ease;
        }
      `}</style>
    </section>
  )
}
