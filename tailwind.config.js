/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6347 '
      },
      fontSize: {
        xs: '1.2rem',
        sm: '1.4rem',
        base: '1.6rem',
        lg: '1.8rem',
        xl: '2rem',
        '2xl': '2.4rem',
        '3xl': '2.8rem',
        '4xl': '3.2rem',
        '5xl': '3.6rem',
      }
    },
  },
  plugins: [],
}