/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0ea5e9',
          secondary: '#6366f1',
          accent: '#f97316'
        }
      },
      boxShadow: {
        card: '0 10px 30px -15px rgba(15, 23, 42, 0.4)'
      }
    }
  },
  plugins: []
};
