/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens driven by CSS variables (dark / light themes)
        base: 'rgb(var(--c-base) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        surface2: 'rgb(var(--c-surface2) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        // Brand palette
        electric: {
          DEFAULT: '#0066FF',
          50: '#EAF2FF',
          100: '#D6E5FF',
          400: 'rgb(var(--c-electric-400) / <alpha-value>)',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003E99',
        },
        safety: {
          DEFAULT: '#F97316',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
        },
        glow: {
          DEFAULT: 'rgb(var(--c-glow) / <alpha-value>)',
          300: 'rgb(var(--c-glow-300) / <alpha-value>)',
          400: 'rgb(var(--c-glow-400) / <alpha-value>)',
          500: 'rgb(var(--c-glow-500) / <alpha-value>)',
        },
        bkash: {
          DEFAULT: '#E2136E',
          600: '#C00F5D',
          700: '#9E0C4D',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['Inter', 'Hind Siliguri', 'system-ui', 'sans-serif'],
        bangla: ['"Hind Siliguri"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(6, 182, 212, 0.25)',
        'glow-blue': '0 0 0 1px rgba(0, 102, 255, 0.3)',
        'glow-orange': '0 0 0 1px rgba(249, 115, 22, 0.3)',
        card: '0 1px 2px rgba(2, 6, 23, 0.25)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(6,182,212,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.07) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '42px 42px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
        dash: {
          to: { strokeDashoffset: '-240' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite',
        blink: 'blink 1.6s ease-in-out infinite',
        dash: 'dash 6s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
