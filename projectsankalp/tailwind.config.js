/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        surface: "#0F172A",
        primary: "#22C55E",
        accent: "#3B82F6",
        "text-primary": "#F8FAFC",
        "text-secondary": "#94A3B8",
        border: "#1E293B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(to right, #22C55E, #3B82F6)",
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
}
