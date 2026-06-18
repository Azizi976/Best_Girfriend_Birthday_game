import type { Config } from "tailwindcss";

/**
 * Tailwind configuration for "מבצע שילי".
 * Theme: warm pink, soft purple, cream, gold accents.
 * RTL is handled at the document level (dir="rtl"); Tailwind logical
 * utilities (ms-*, me-*, ps-*, pe-*, start-*, end-*) are preferred in markup.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FFF6EC",
          50: "#FFFBF5",
          100: "#FFF6EC",
          200: "#FCEBD7",
        },
        blush: {
          DEFAULT: "#FF7EB6",
          50: "#FFF0F6",
          100: "#FFE0EC",
          200: "#FFC2DA",
          300: "#FF9DC2",
          400: "#FF7EB6",
          500: "#FF5BA0",
          600: "#EC3A86",
          700: "#C72669",
        },
        grape: {
          DEFAULT: "#9B6BFF",
          50: "#F4EEFF",
          100: "#E9DCFF",
          200: "#D4BBFF",
          300: "#BC97FF",
          400: "#9B6BFF",
          500: "#7E45F0",
          600: "#6730D1",
          700: "#4E22A3",
        },
        gold: {
          DEFAULT: "#FFC857",
          100: "#FFF2D6",
          200: "#FFE3A3",
          300: "#FFD477",
          400: "#FFC857",
          500: "#F5AE2E",
        },
        ink: {
          DEFAULT: "#3A2A4D",
          soft: "#6B5B7B",
        },
      },
      fontFamily: {
        sans: ["var(--font-app)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        node: "0 8px 0 0 rgba(0,0,0,0.12)",
        "node-press": "0 3px 0 0 rgba(0,0,0,0.12)",
        soft: "0 10px 40px -12px rgba(155,107,255,0.45)",
        glow: "0 0 30px rgba(255,126,182,0.6)",
        // Diffused, layered shadows for a premium glass/clay feel.
        sheet: "0 -8px 40px -8px rgba(58,42,77,0.22)",
        card: "0 2px 6px -2px rgba(58,42,77,0.10), 0 12px 28px -12px rgba(155,107,255,0.30)",
        "glow-emerald": "0 0 24px rgba(52,211,153,0.55)",
      },
      keyframes: {
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.4)", opacity: "0" },
          "100%": { opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "60%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        // Marching-ants dash flow for the map path.
        "dash-flow": {
          to: { strokeDashoffset: "-16" },
        },
      },
      animation: {
        "float-y": "float-y 3s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite",
        shimmer: "shimmer 2s infinite",
        "pop-in": "pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        wiggle: "wiggle 0.4s ease-in-out infinite",
        "gradient-pan": "gradient-pan 6s ease infinite",
        "dash-flow": "dash-flow 0.6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
