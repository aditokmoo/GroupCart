import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["5cc3-2a02-27b0-4b06-dfc0-1da8-e9e2-7299-342a.ngrok-free.app"]
  }
})
