/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif']
      },
      fontWeight: {
        bold: '700',
        semibold: '600',
        medium: '500',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
  ],
}