import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    pages({
      dirs: [{ dir: 'src/pages', baseRoute: '' }]
    })
  ],
  server: {
    port: 3000,
    strictPort: true
  }
})
