/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}', './src/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
