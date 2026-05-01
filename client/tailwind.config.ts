import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0f172a",
        violetArcana: "#7c3aed"
      }
    }
  },
  plugins: []
} satisfies Config;
