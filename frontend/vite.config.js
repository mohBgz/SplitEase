import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,  // This forces polling for changes (important for Docker on some systems)
    },
    host: true,         // Make sure Vite is bound to all network interfaces in Docker
    port: 5173,
    strictPort: true,   // Ensure it doesn’t pick a random available port
  }
})
