/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1ba4da', // your brand color
        background: '#f9fafb'
      },
      boxShadow: {
        soft: '0 4px 24px 0 rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: []
}
