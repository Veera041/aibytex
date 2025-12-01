// uno.config.ts
import { defineConfig, presetUno, presetIcons, presetAttributify, presetTypography } from "unocss";

export default defineConfig({
  // Enable useful presets
  presets: [
    presetUno(),
    presetAttributify(),         // allows attributes like flex="~" text="center"
    presetIcons({ scale: 1.2 }), // use i-xxx icons
    presetTypography(),          // nice prose styling
  ],

  // Custom theme
  theme: {
    colors: {
      primary: "#2563eb", // blue-600
      secondary: "#1e293b", // slate-800
      accent: "#3b82f6", // blue-500
      muted: "#6b7280", // gray-500
      light: "#f9fafb",
      dark: "#111827",
    },

    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
  },

  // Utility shortcuts (super useful)
  shortcuts: {
    "flex-center": "flex justify-center items-center",
    "flex-between": "flex justify-between items-center",

    "btn":
      "px-4 py-2 rounded-lg font-medium transition shadow-sm " +
      "bg-primary text-white hover:bg-blue-700",

    "btn-outline":
      "px-4 py-2 rounded-lg border border-gray-300 text-gray-800 " +
      "hover:bg-gray-50 transition",

    "card":
      "bg-white border border-gray-100 rounded-xl shadow-sm p-5 " +
      "hover:shadow-lg transition-shadow",

    "section-title":
      "text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4",

    "section-subtitle":
      "text-gray-600 max-w-2xl mx-auto text-center mb-8",

    "input":
      "px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
  },

  // For dynamic classes so UnoCSS keeps them
  safelist: [
    "bg-blue-50",
    "bg-green-50",
    "bg-red-50",
    "bg-yellow-50",
    "bg-gray-50",

    "text-blue-600",
    "text-green-600",
    "text-red-600",
    "text-gray-700",

    "border-gray-200",
    "border-gray-300",
    "border-primary",

    "hover:bg-blue-700",
    "hover:bg-gray-100",
    "hover:bg-gray-200",

    "rounded-md",
    "rounded-lg",
    "rounded-xl",
    "rounded-2xl",
  ],
});
