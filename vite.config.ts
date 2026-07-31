import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // React/Router change far less often than app code — its own chunk means
        // a deploy that only touches app code doesn't bust this cache entry.
        manualChunks(id) {
          if (/node_modules[\\/](react-router-dom|react-dom|react)[\\/]/.test(id)) {
            return 'vendor-react';
          }
        },
      },
    },
  },
})
