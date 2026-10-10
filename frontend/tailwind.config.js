/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        obsidian: {
          950: '#050608',
          900: '#08090D',
          850: '#0D0F15',
          800: '#12151E',
          700: '#1A1E2B',
          600: '#262C3E',
        },
        cyber: {
          cyan: '#00E5FF',
          blue: '#2563EB',
          indigo: '#4F46E5',
          violet: '#7C3AED',
        },
        coral: {
          500: '#FF2E5B',
          400: '#FF4D73',
          300: '#FF708F',
        },
        amber: {
          solar: '#FFB800',
        },
        aurora: {
          500: '#00F59B',
          400: '#10E7B2',
        }
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
