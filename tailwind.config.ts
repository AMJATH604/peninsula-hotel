import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1628",
          light: "#152238",
        },
        gold: {
          DEFAULT: "#C9A96E",
          light: "#D4BC8E",
          dark: "#A8894E",
        },
        pearl: "#FAF7F2",
        cream: "#F5F0E8",
        "warm-gray": {
          DEFAULT: "#6B6B6B",
          light: "#9A9A9A",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

