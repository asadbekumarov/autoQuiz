/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
      },
      boxShadow: {
        'glow': '0 0 30px rgba(16, 185, 129, 0.15)',
        'glow-lg': '0 0 60px rgba(16, 185, 129, 0.2)',
        'card': '0 4px 30px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.08)',
        'inner-glow': 'inset 0 2px 20px rgba(16, 185, 129, 0.1)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
