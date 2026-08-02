// tailwind.config.js
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    // include any shadcn UI package paths if you import them from node_modules:
    // "./node_modules/@shadcn/**/*.{js,ts,jsx,tsx,css}",
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
    // If you installed tailwindcss-animate, uncomment the next line:
    // require("tailwindcss-animate"),
    // small default CSS variables so .bg-background etc. exist even without external token files
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
