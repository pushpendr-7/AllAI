
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal'
import devBanner from '@replit/vite-plugin-dev-banner'
import cartographer from '@replit/vite-plugin-cartographer'

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    devBanner(),
    cartographer()
  ],
  server: {
    port: Number(process.env.PORT) || 5173,
    host: true
  },
  build: {
    outDir: 'dist'
  }
})