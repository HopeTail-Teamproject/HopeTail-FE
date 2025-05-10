import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/HopeTail-FE/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.hopetail.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
