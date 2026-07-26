'use client'

export function Footer() {
  return (
    <footer className="py-16 border-t border-[var(--border)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase mb-2">
              <span className="text-accent">R</span>ed Shift <span className="text-accent">M</span>antra
            </div>
            <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-light-muted">
              Electronic / Synthwave · Manteis Recordings
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:flex gap-x-8 gap-y-6 md:gap-12">
            <div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted mb-3">
                Albums
              </div>
              <div className="space-y-1">
                <a href="https://distrokid.com/hyperfollow/redshiftmantra/phoneme-2" target="_blank" rel="noreferrer noopener"
                  className="block text-[13px] text-light-dim hover:text-accent transition-colors">
                  Phoneme
                </a>
                <a href="https://distrokid.com/hyperfollow/redshiftmantra/deep-field-image-2" target="_blank" rel="noreferrer noopener"
                  className="block text-[13px] text-light-dim hover:text-accent transition-colors">
                  Deep Field Image
                </a>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted mb-3">
                Label
              </span>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-1">
                <a href="https://manteisrecordings.com" target="_blank" rel="noreferrer noopener"
                  className="block text-base text-light-dim hover:text-accent transition-colors">
                  Manteis Recordings
                </a>
                <a href="https://soundcloud.com/rhettelliot" target="_blank" rel="noreferrer noopener"
                  className="block text-base text-light-dim hover:text-accent transition-colors">
                  SoundCloud
                </a>
              </div>
            </div>
          </div>

          {/* Coordinates */}
          <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-light-muted">
            <div>47.6062° N</div>
            <div>122.3321° W</div>
            <div className="mt-2">Manteis Recordings</div>
          </div>
        </div>

        <div className="divider-glow mt-12 mb-8" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-light-muted">
            © {new Date().getFullYear()} Red Shift Mantra · All rights reserved
          </div>
          <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-light-muted">
            Cosmic art system · MR-002 / MR-006
          </div>
        </div>
      </div>
    </footer>
  )
}
