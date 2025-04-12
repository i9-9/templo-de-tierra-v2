/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Main Colors
        'warm-sand': '#F5DC90',
        'olive-green': '#918E46',
        'earth-brown': '#6F4C21',
        
        // Secondary Colors
        'terracotta': '#CC835F',
        'burnt-sienna': '#BA692D',
        'deep-slate': '#1D1E1E',
      },
      fontFamily: {
        heading: ['Roslindale Display Condensed', 'serif'],
        sans: ['Neue Haas Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 