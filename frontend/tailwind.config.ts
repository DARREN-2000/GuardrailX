import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        'radial-grid':
          'radial-gradient(circle at top, rgba(104, 211, 145, 0.16), transparent 35%), linear-gradient(180deg, rgba(6, 10, 19, 0.94), rgba(9, 13, 25, 1))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 12s linear infinite',
        pulseGlow: 'pulseGlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
