/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        accent: '#4f46e5'
      },
      boxShadow: {
        card: '0 20px 45px -20px rgba(15, 23, 42, 0.45)'
      }
    }
  },
  plugins: []
};
