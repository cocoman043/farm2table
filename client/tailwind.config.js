import daisyui from 'daisyui';
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        farmgreen: "#ABE188"
      },
      fontFamily: {
        'inter': ['"Inter"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [
    daisyui,
  ],
}
