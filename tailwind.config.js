/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        'void-soft': '#0A0A0F',
        'void-warm': '#0D0B08',
        light: '#FAFAFA',
        'light-dim': '#E5E5E5',
        accent: '#FF4D00',
        'accent-blue': '#007AFF',
        'accent-warm': '#FF6B35',
        surface: '#0A0A0A',
        'surface-elevated': '#141414',
        'surface-hover': '#1A1A1A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
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