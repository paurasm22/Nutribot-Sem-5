/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBeige: '#BEB9A5',
        customgreen:"#4E6766" // Add your custom color here
      },
    },
  },
  plugins: [],
}