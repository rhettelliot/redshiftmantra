/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0D0F12',
        surface: '#15181E',
        'surface-hi': '#1A1E24',
        ink: {
          DEFAULT: '#F4F3EE',
          2: '#9EA4B0',
          3: '#5C6370',
          ghost: 'rgba(244, 243, 238, 0.20)',
        },
        signal: '#FF5500',
        'signal-dim': 'rgba(255, 85, 0, 0.15)',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-hi': 'rgba(255, 255, 255, 0.14)',
        cream: '#F4F3EE',
        // Legacy aliases
        void: '#0D0F12',
        'void-raised': '#15181E',
        'void-elevated': '#1A1E24',
        'void-float': '#1C1C1C',
        light: '#F4F3EE',
        'light-dim': '#9EA4B0',
        'light-muted': '#5C6370',
        accent: '#FF5500',
        'accent-blue': '#FF5500',
      },
      fontFamily: {
        display: ['var(--font-body)', 'sans-serif'],
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
