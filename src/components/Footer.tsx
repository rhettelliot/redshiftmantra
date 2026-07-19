'use client'

export function Footer() {
  return (
    <footer className="py-16 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
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
          <div className="flex gap-12">
            <div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted mb-3">
                Albums
              </div>
              <div className="space-y-1">
                <a href="https://distrokid.com/hyperfollow/redshiftmantra/phoneme-2" target="_blank" rel="noreferrer noopener"
                  className="block text-[13px] text-light-dim hover:text-accent transition-colors cursor-none" data-cursor>
                  Phoneme
                </a>
                <a href="https://distrokid.com/hyperfollow/redshiftmantra/deep-field-image-2" target="_blank" rel="noreferrer noopener"
                  className="block text-[13px] text-light-dim hover:text-accent transition-colors cursor-none" data-cursor>
                  Deep Field Image
                </a>
              </div>
            </div>
            <div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted mb-3">
                Label
              </div>
              <div className="space-y-1">
                <a href="https://manteisrecordings.com" target="_blank" rel="noreferrer noopener"
                  className="block text-[13px] text-light-dim hover:text-accent transition-colors cursor-none" data-cursor>
                  Manteis Recordings
                </a>
                <a href="https://soundcloud.com/rhettelliot" target="_blank" rel="noreferrer noopener"
                  className="block text-[13px] text-light-dim hover:text-accent transition-colors cursor-none" data-cursor>
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

        {/* Divider */}
        <div className="divider-glow mt-12 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-light-muted">
            © {new Date().getFullYear()} Red Shift Mantra · All rights reserved
          </div>
          <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-light-muted">
            Built with the void · Designed by Xen
          </div>
        </div>
      </div>
    </footer>
  )
}