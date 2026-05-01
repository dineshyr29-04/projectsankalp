/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070F",
        surface: "#0B0F1A",
        primary: "#7C5CFF",
        accent: "#00E0FF",
        "text-primary": "#E6E9F2",
        "text-secondary": "#9AA4B2",
        border: "#1A2233",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(to right, #7C5CFF, #00E0FF)",
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
}
