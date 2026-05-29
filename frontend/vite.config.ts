import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    proxy: {
      "/api": {
        target: "http://food.dev",
        changeOrigin: true,
      },

      "/socket.io": {
        target: "http://food.dev",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
