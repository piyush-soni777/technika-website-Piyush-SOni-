/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'Cabinet Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        gold: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        forest: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        }
      },
      boxShadow: {
        'card-elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 30px 60px -12px rgba(34, 197, 94, 0.15), 0 0 0 1px rgba(34, 197, 94, 0.2)',
        'craft-shadow': '0 12px 30px -10px rgba(120, 80, 20, 0.12), 0 2px 6px -1px rgba(0,0,0,0.06)',
      }
    },
  },
  plugins: [],
}
