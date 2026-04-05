import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages path
  base: '/landing-page-la-beatriz/',
  server: {
    host: true,
    port: 3000,
  },
})
