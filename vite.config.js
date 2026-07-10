import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Lets the frontend call same-origin "/api/..." during `npm run dev`
    // and have Vite forward it to the Spring Boot server, avoiding CORS
    // entirely in local development. Not used if you set
    // VITE_API_BASE_URL to an absolute URL (see .env.example).
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
