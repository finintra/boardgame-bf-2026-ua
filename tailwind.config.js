/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        graphite: {
          950: '#090b10',
          900: '#0f131a',
          850: '#141923',
          800: '#1b2230',
          700: '#273144',
        },
      },
    },
  },
};
