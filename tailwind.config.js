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
          turquoise: '#42C6BE',
          'turquoise-dark': '#208F89',
          'turquoise-light': '#EBF9F8',
          bordo: '#35151F',
          'bordo-light': '#522632',
          'bordo-deep': '#240C14',
          warm: '#FAF7F2',
          'warm-dark': '#F2ECE4',
          dark: '#282426',
          muted: '#6B6265',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(53, 21, 31, 0.06), 0 2px 6px -1px rgba(53, 21, 31, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(53, 21, 31, 0.12), 0 4px 10px -2px rgba(53, 21, 31, 0.06)',
      }
    },
  },
  plugins: [],
}
