import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        dark: {
          400: "#2E2E2E",
          500: "#242424",
          600: "#1A1A1A",
          700: "#141414",
          800: "#121212",
          900: "#0F0F0F"
        },
        light: {
          100: "#f9fbfb",
          200: "#f3f6f8",
          300: "#eef2f4",
          400: "#e8edf1",
          500: "#F0F0F0",
          600: "#b5babe",
          700: "#888c8e",
          800: "#5a5d5f",
          900: "#2d2f2f",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
