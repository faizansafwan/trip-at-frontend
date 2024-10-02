/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5BBCFF',
        'primary-dark': '#316EFF',
        'primary-light': '#F6F7FA',
      },
      
    },
  },
  plugins: [],
}

