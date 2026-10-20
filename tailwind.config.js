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
          // Exact colors extracted from official logo
          teal: '#09665C',
          'teal-dark': '#054840',
          'teal-deep': '#03332D',
          'teal-light': '#EAF5F3',
          'teal-vibrant': '#0D8274',
          cream: '#E8CE9F',
          'cream-light': '#F7F0E3',
          'cream-dark': '#C9A86E',
          
          // Legacy mappings aligned to logo palette
          turquoise: '#09665C',
          'turquoise-dark': '#054840',
          'turquoise-light': '#EAF5F3',
          bordo: '#054840',
          'bordo-light': '#09665C',
          'bordo-deep': '#03332D',
          
          warm: '#FAF7F2',
          'warm-dark': '#EFE8DC',
          dark: '#142925',
          muted: '#4E6561',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(9, 102, 92, 0.08), 0 2px 6px -1px rgba(9, 102, 92, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(9, 102, 92, 0.16), 0 4px 10px -2px rgba(9, 102, 92, 0.08)',
      }
    },
  },
  plugins: [],
}
