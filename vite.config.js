import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_BASE_URL = "https://api.hopetail.com";

export default defineConfig({
  base: "/HopeTail-FE/",
  plugins: [react()],
  define: {
    "process.env.VITE_API_BASE_URL": JSON.stringify(API_BASE_URL),
  },
  server: {
    proxy: {
      "/api": {
        target: API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
