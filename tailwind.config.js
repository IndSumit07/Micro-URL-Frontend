/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#030303",
        surface: "#111111",
        primary: {
          DEFAULT: "#ff0033",
          glow: "rgba(255, 0, 51, 0.5)",
        },
        muted: "#888888",
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        display: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
};
