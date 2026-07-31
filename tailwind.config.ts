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
      },
      backgroundSize: {
        dots: '18px 18px',
      },
      boxShadow: {
        ticket: '0 10px 0 -2px rgba(27,36,64,0.06), 0 20px 40px -12px rgba(27,36,64,0.35)',
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
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
