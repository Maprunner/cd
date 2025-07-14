import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
    base: "/cd/",
    build: {
      outDir: "./dist",
      emptyOutDir: true,
      minify: "esbuild",
      manifest: true,
      sourcemap: true,
    },
  plugins: [react()],
})
