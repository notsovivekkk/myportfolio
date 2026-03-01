import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        bg: "#F9F9F9",
        card: "#FFFFFF",
        primary: "#111111",
        secondary: "#737373",
        muted: "#A3A3A3",
        accent: "#E5E5E5",
        reddot: "#EF4444",
      },
      boxShadow: {
        nav: "0 2px 10px rgba(0,0,0,0.05)",
        card: "0 4px 20px rgba(0,0,0,0.02), 0 1px 3px rgba(0,0,0,0.02)",
      },
    },
  },
  plugins: [],
};

export default config;
