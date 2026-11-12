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
          DEFAULT: "#0C1B2A",
          light: "#1A2D42",
          dark: "#060D15",
        },
        gold: {
          DEFAULT: "#C8A97E",
          light: "#E8D5B5",
          dark: "#A68B5B",
          muted: "#C8A97E33",
        },
        pearl: "#FAFAF8",
        cream: "#F5F1EB",
        "warm-white": "#FDFCFA",
        charcoal: "#2A2A2A",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-left": "slideInLeft 0.8s ease-out forwards",
        "slide-right": "slideInRight 0.8s ease-out forwards",
        "scale-in": "scaleIn 0.6s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "ken-burns": "kenBurns 20s ease-in-out infinite alternate",
        "marquee": "marquee 30s linear infinite",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};

export default config;
