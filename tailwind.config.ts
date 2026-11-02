import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        electric: "#0066FF",
        cyan: {
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#00758C",
          700: "#0E5E73",
        },
        safety: "#F97316",
        bkash: "#E2136E",
      },
      fontFamily: {
        sans: ["Inter", "Hind Siliguri", "sans-serif"],
        bangla: ["Hind Siliguri", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 35px -12px rgba(6,182,212,.45)",
        panel: "0 18px 60px -25px rgba(0,0,0,.3)",
      },
      maxWidth: { site: "1280px" },
    },
  },
  plugins: [],
} satisfies Config;
