/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./main.js"],
  safelist: [
    'tw-sort-asc', 
    'tw-sort-desc'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('./plugins/sortableTable')
  ],
};
