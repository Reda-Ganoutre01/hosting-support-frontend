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
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ":root": {
          "--background": "#f8fafc",
          "--foreground": "#0f172a",
          "--muted": "#94a3b8",
          "--muted-foreground": "#64748b",
          "--border": "#e6edf3",
          "--input": "#ffffff",
          "--ring": "#bfdbfe",
        },
      });
    }),
  ],
};
