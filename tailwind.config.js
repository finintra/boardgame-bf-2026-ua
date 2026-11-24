// Colors that differ between the light and dark themes are CSS variables
// (defined in src/index.html under :root and .dark) so one set of classes
// serves both themes.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
const shades = (color, list) => Object.fromEntries(list.map((n) => [n, v(`t-${color}-${n}`)]));

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
        // Surface scale: near-black in dark, near-white in light.
        graphite: {
          950: v('g-950'),
          900: v('g-900'),
          850: v('g-850'),
          800: v('g-800'),
          700: v('g-700'),
        },
        // Primary foreground: white in dark, slate in light.
        ink: v('ink'),
        // Text on saturated amber/emerald fills; same in both themes.
        onaccent: '#090b10',
      },
      // Pastel text shades are readable only on dark surfaces, so text
      // utilities (and only text) switch to darker tones in the light theme.
      textColor: {
        gray: shades('gray', [200, 300, 400, 500]),
        amber: shades('amber', [200, 300, 400]),
        emerald: shades('emerald', [200, 300, 400]),
        sky: shades('sky', [300]),
        purple: shades('purple', [300]),
        red: shades('red', [300]),
        orange: shades('orange', [300]),
        teal: shades('teal', [300]),
        rose: shades('rose', [300]),
      },
    },
  },
};
