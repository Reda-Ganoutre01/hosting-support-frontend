// tailwind.config.js
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        primary: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
        },
        success: "#16A34A",
        heading: "#0F172A",
        body: "#334155",
        section: "#F8FAFC",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ":root": {
          "--background": "#FFFFFF",
          "--foreground": "#0F172A",
          "--muted": "#F8FAFC",
          "--muted-foreground": "#334155",
          "--border": "#E2E8F0",
          "--primary": "#2563EB",
          "--primary-hover": "#1D4ED8",
          "--success": "#16A34A",
        },
      });
    }),
  ],
};
