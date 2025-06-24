/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: '#0F1417',
        secondary: '#5C738A',
        accent: '#DBE8F2',
        success: '#088738',
        border: '#D4DBE3',
        background: '#FAFAFA',
      },
    },
  },
  plugins: [],
}