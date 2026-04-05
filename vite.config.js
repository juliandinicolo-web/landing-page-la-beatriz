import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages path
  base: '/landing-page-la-beatriz/',
  // Sirve todo el root como archivos estáticos en dev (videos, fotos, logo)
  publicDir: '.',
  build: {
    outDir: 'dist',
    copyPublicDir: false,  // no copiar los videos grandes al build
  },
  server: {
    host: true,   // accesible desde LAN → mobile/iOS/Android
    port: 3000,
    fs: { strict: false },
  },
})
