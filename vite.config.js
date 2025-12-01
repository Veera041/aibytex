// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [
    react(),
    UnoCSS(), // UnoCSS plugin will scan files under your project
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
