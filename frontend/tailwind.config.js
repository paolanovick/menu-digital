/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#f7f8f8",
          100: "#e8e9ea",
          200: "#9ca6a8",
          300: "#777f82",
          400: "#5a6165",
          500: "#3d4245",
        },
        cream: {
          DEFAULT: "#f7f5f2",
          dark: "#e8e6e3",
        },
        wine: {
          DEFAULT: "#a83132",
          dark: "#8a2829",
          light: "#c74849",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Playfair Display", "serif"],
      },
      boxShadow: {
        card: "0 4px 20px rgba(119, 127, 130, 0.08)",
        "card-hover": "0 8px 30px rgba(119, 127, 130, 0.12)",
      },
      animation: {
        "bounce-slow": "bounce-slow 3s infinite",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(5%)" },
        },
      },
    },
  },
  plugins: [],
};
