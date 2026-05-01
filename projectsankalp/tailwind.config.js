/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#F8FAFC",
        primary: "#000000",
        accent: "#3B82F6",
        green: "#22C55E",
        "text-primary": "#0F172A",
        "text-secondary": "#64748B",
        border: "#E2E8F0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(to right, #000000, #334155)",
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
}
