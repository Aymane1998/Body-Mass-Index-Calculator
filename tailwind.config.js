/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#ff8901',
        secondary: '#fb923c',
        customBlue: '#686de0',
        customWhite: '#f1f2f6',
        customGray: '#f5f6fa',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
};
