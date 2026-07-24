import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: '#000000' }}
    >
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: '#FF4D00' }}>
        404 — Beyond the deep field
      </p>
      <h1 className="font-display text-4xl md:text-6xl mt-6 mb-4" style={{ color: '#FFFFFF' }}>
        Page not found
      </h1>
      <p className="font-body text-sm mb-12" style={{ color: '#888888' }}>
        This coordinate maps to nothing.
      </p>
      <Link
        href="/"
        className="font-mono text-[10px] tracking-[0.25em] uppercase px-8 py-4 border transition-colors duration-200"
        style={{ borderColor: '#FF4D00', color: '#FF4D00' }}
      >
        Return to the mantra
      </Link>
    </main>
  )
}
