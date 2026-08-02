import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1B2440',
          50: '#EEF0F6',
          100: '#D6DAE9',
          200: '#AEB6D2',
          300: '#8590B8',
          400: '#5D6B9E',
          500: '#3C4B7F',
          600: '#293463',
          700: '#1B2440',
          800: '#141A30',
          900: '#0D1120',
        },
        gold: {
          DEFAULT: '#F0B429',
          50: '#FEF8E9',
          100: '#FCEFC7',
          200: '#F9DE8F',
          300: '#F6CD57',
          400: '#F0B429',
          500: '#D89A0F',
          600: '#AD7A0C',
          700: '#825B09',
          800: '#573C06',
          900: '#2D1E03',
        },
        paper: '#FBF3DE',
        chili: '#E14B3C',
        line: '#E4D6AC',
      },
      fontFamily: {
        display: ['"Bevan"', 'serif'],
        body: ['"Jost"', 'ui-sans-serif', 'system-ui'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        dots: 'radial-gradient(circle, rgba(27,36,64,0.14) 1px, transparent 1px)',
        'dots-dark': 'radial-gradient(circle, rgba(240,180,41,0.18) 1px, transparent 1px)',
      },
      backgroundSize: {
        dots: '18px 18px',
        'dots-dark': '18px 18px',
      },
      boxShadow: {
        ticket: '0 10px 0 -2px rgba(27,36,64,0.06), 0 20px 40px -12px rgba(27,36,64,0.35)',
        glass: '0 8px 32px 0 rgba(13,17,32,0.28)',
        glow: '0 0 0 1px rgba(240,180,41,0.4), 0 0 40px -8px rgba(240,180,41,0.55)',
        'glow-lg': '0 0 0 1px rgba(240,180,41,0.35), 0 20px 60px -12px rgba(240,180,41,0.4), 0 8px 24px -8px rgba(13,17,32,0.5)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--r, -3deg))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--r, -3deg))' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(4%, -6%) scale(1.08)' },
          '66%': { transform: 'translate(-3%, 4%) scale(0.95)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.04)' },
        },
        cardGlow: {
          '0%, 100%': { boxShadow: '0 0 0 1px rgba(240,180,41,0.3), 0 0 18px -4px rgba(240,180,41,0.35)' },
          '50%': { boxShadow: '0 0 0 1px rgba(240,180,41,0.7), 0 0 28px -2px rgba(240,180,41,0.6)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        blob: 'blob 16s ease-in-out infinite',
        'blob-delay': 'blob 20s ease-in-out infinite 2s',
        shimmer: 'shimmer 2.5s linear infinite',
        glowPulse: 'glowPulse 4s ease-in-out infinite',
        cardGlowPulse: 'cardGlow 3s ease-in-out infinite',
        gradientShift: 'gradientShift 8s ease infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
