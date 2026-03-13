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
        primary: '#5B2E91', // Royal Purple
        secondary: '#D4AF37', // Champagne Gold
        accent: '#B76E79', // Rose Gold
        background: '#FAF7F2', // Soft Ivory
        'dark-surface': '#1E1B2E',
        'text-primary': '#1F1F1F',
        'text-secondary': '#6A6A6A',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}