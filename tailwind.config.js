/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#3C3C3C',
        'custom-dark-gray': '#282B30',
        'custom-light-gray': '#6C727F',
        'custom-light-white': '#D2D5DA',
        'custom-dark': '#1B1D1F',
      }
    },
    screens: {
      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',

    },
  },

  plugins: [],
}
