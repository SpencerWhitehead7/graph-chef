import legacy from "@vitejs/plugin-legacy"
import react from "@vitejs/plugin-react"
import path from "path"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"

import pkg from "./package.json"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    legacy({
      targets: pkg.browserslist,
      modernPolyfills: true,
    }),
    visualizer({
      gzipSize: true,
      brotliSize: true,
    }),
  ],
})
