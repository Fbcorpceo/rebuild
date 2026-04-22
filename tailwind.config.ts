import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefaff",
          100: "#d9f2ff",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          900: "#0c4a6e",
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
