/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./**/*.html",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111826',
        primaryDark: '#0a0f1c',
        primaryLight: '#1e2a4a',
        secondary: '#fa7516',
        secondaryDark: '#e05f00',
        secondaryLight: '#fb923c',
        dark: '#111827',
        light: '#f8fafc',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}