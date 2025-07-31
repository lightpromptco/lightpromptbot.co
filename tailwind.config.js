/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#19b4ae',
        accent: '#77e9e0',
        background: '#f8fbfa',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui'],
      },
      borderRadius: {
        xl: '1.5rem',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(25,180,174,0.06)',
      },
    },
  },
  plugins: [],
}