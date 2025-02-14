import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["7f96-2a02-27b0-4b01-4960-a934-7c8a-86c7-d183.ngrok-free.app"]
  }
})
