/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        hero: "url('/Image/banner.jpg')"
      },
      fontFamily:{
        roboto: "roboto"
      }
    },
  },
  plugins: [],
}