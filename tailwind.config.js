/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        'void-raised': '#0C0C0C',
        'void-elevated': '#141414',
        'void-float': '#1C1C1C',
        light: '#FFFFFF',
        'light-dim': '#E5E5E5',
        'light-muted': '#888888',
        'light-faint': '#767676',
        accent: '#007AFF',
        signal: '#007AFF',
        surface: '#0C0C0C',
        'surface-elevated': '#141414',
        'surface-hover': '#1C1C1C',
        edge: {
          ghost: 'rgba(255,255,255,0.04)',
          faint: 'rgba(255,255,255,0.08)',
          subtle: 'rgba(255,255,255,0.12)',
          clear: 'rgba(255,255,255,0.22)',
          bright: 'rgba(255,255,255,0.45)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float-up': 'floatUp 20s linear infinite',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        floatUp: {
          '0%': { transform: 'translateY(100vh) translateX(0)' },
          '100%': { transform: 'translateY(-100vh) translateX(20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
