import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext", // pour autoriser top-level await
    minify: false, // désactive minification (voir erreurs plus claires)
  },
});
