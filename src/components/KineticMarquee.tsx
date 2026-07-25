'use client'

const TERMS = [
  'WAVEFORM',
  'OSCILLATOR',
  'MODULAR',
  'ANALOG',
  'SUBTRACTIVE',
  'FM',
  'RED SHIFT',
  'MANTRA',
]

export function KineticMarquee() {
  const row = (
    <div className="marquee-row flex items-center gap-8 shrink-0">
      {TERMS.map((term, i) => (
        <div key={i} className="flex items-center gap-8"
        >
          <span className="marquee-term font-mono text-[clamp(2rem,6vw,5rem)] font-[900] uppercase tracking-[0.04em]"
          >
            {term}
          </span>
          <span className="marquee-dot w-3 h-3 bg-accent" />
        </div>
      ))}
    </div>
  )

  return (
    <section className="relative py-12 md:py-20 overflow-hidden border-y border-[var(--border)] bg-void"
    >
      <div className="marquee-track flex items-center"
      >
        {row}
        {row}
        {row}
      </div>

      <style jsx>{`
        .marquee-track {
          width: max-content;
          animation: marqueeScroll 24s linear infinite;
        }
        .marquee-term {
          color: transparent;
          -webkit-text-stroke: 1px rgba(253, 252, 220, 0.55);
          transition: color 0.3s ease, -webkit-text-stroke 0.3s ease, text-shadow 0.3s ease;
        }
        .marquee-term:hover {
          color: var(--accent);
          -webkit-text-stroke: 1px var(--accent);
          text-shadow: 0 0 24px rgba(255, 77, 0, 0.45);
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
