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
        dspace: {
          DEFAULT: "#92C644", // Official DSpace brand green
          hover: "#82B438",   // Darker green on hover
          dark: "#6F9E2B",    // Rich brand green
          light: "#F2F9E8",   // Soft tinted light green
          tint: "#E5F4CE",    // Badge & pill light green
          forest: "#1D3B1C",  // Deep green
          navy: "#0C1B33",    // Deep DSpace/Lyrasis navy
          "navy-surface": "#142646",
          "navy-border": "#1F355E",
          slate: "#1E293B",
          muted: "#64748B",
          border: "#E2E8F0",
          bg: "#F8FAF8",      // Crisp clean conference background
          card: "#FFFFFF",
          blue: "#006699",    // Classic DSpace tech blue
          "blue-light": "#EBF5FB",
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
      boxShadow: {
        "dspace-sm": "0 2px 8px -2px rgba(146, 198, 68, 0.25)",
        "dspace-md": "0 8px 24px -4px rgba(146, 198, 68, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
