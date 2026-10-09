/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0F172A',
          card: '#1E293B',
          border: '#334155',
          primary: '#3B82F6',
          accent: '#6366F1',
          crimson: '#EF4444',
          amber: '#F59E0B',
          emerald: '#10B981',
          slate: '#64748B'
        }
      }
    },
  },
  plugins: [],
}
