/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        salmon: '#FA8072', // Original color
        salmonLight: '#FFB3A1', // Lighter version
      },
      screens: {
        'xs': '480px',
        'xxs':'320px', 
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [require("daisyui")],
}
