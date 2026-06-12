import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: '#000000' }}
    >
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: '#FF6B35' }}>
        404 — Beyond the deep field
      </p>
      <h1 className="font-display text-4xl md:text-6xl mt-6 mb-4" style={{ color: '#F0F0F0' }}>
        Page not found
      </h1>
      <p className="font-body text-sm mb-12" style={{ color: '#888888' }}>
        This coordinate maps to nothing.
      </p>
      <Link
        href="/"
        className="font-mono text-[10px] tracking-[0.25em] uppercase px-8 py-4 border transition-colors duration-200"
        style={{ borderColor: '#FF6B35', color: '#FF6B35' }}
      >
        Return to the mantra
      </Link>
    </main>
  )
}
