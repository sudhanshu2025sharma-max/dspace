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
        academic: {
          bg: "#F7F5F0",
          card: "#FFFFFF",
          parchment: "#EFECE4",
          border: "#E4DFD5",
          ink: "#12201D",
          charcoal: "#2A3835",
          muted: "#5B6865",
          accent: "#A24B27",
          "accent-dark": "#883C1D",
          "accent-light": "#FAECE6",
          emerald: "#125740",
          "emerald-light": "#E9F3EF",
          "emerald-border": "#C4DFD5",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "'Times New Roman'", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: ["'SF Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
