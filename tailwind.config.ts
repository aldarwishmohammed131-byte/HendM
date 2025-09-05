import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: {
          bg: "#0b0b0d",
          card: "#111114",
          border: "#1c1c21",
          text: "#f6f6f6",
          sub: "#c9c9cf",
          gold: "#c7a44b"
        }
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,0.35)" }
    }
  },
  plugins: []
};
export default config;
