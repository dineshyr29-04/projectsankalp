/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#F8FAFC",
        primary: "#0F172A", // slate-900
        accent: "#10B981", // emerald-500
        "text-primary": "#0F172A",
        "text-secondary": "#475569", // slate-600
        border: "#F1F5F9", // slate-100
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Fraunces", "serif"],
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(to right, #0A0A0A, #262626)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(100%) translateY(100%) rotate(45deg)' },
        }
      },
      animation: {
        sweep: 'sweep 1.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
