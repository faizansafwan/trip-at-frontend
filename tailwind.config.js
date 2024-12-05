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
        'primary-light': '#EBF0FF',
      },
      boxShadow: {
        'b-md': '0 4px 6px rgba(0, 0, 0, 0.1)', // Custom shadow for bottom
      },
    },
  },
  plugins: [],
}

