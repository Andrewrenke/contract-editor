/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          500: '#38a169',
        },
        blue: {
          500: '#4299e1',
        },
        red: {
          500: '#f56565', 
        },

      },
    },
  },
  plugins: [],
};
