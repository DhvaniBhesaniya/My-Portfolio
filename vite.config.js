// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: "/My-Portfolio/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
            return 'vendor-react'
          }
          if (id.includes('/react-icons/')) {
            return 'vendor-icons'
          }
          if (id.includes('/lucide-react/')) {
            return 'vendor-lucide'
          }
          if (id.includes('/@emailjs/')) {
            return 'vendor-emailjs'
          }
          if (id.includes('/lenis/')) {
            return 'vendor-lenis'
          }
          return 'vendor'
        },
      },
    },
  },
})
