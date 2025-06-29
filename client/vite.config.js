import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['6bb8-116-193-129-209.ngrok-free.app'],
    proxy: {
      '/get-reports': 'http://localhost:3000', // Proxy to your Express server
    },
    historyApiFallback: true,
  },
})
