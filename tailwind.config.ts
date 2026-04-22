import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff4ff",
          100: "#dbe6ff",
          500: "#2456b8",
          600: "#1e4dab",
          700: "#193f8a",
          900: "#122d62",
        },
        accent: {
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial"],
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(2, 132, 199, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
