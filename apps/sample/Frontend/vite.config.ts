import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import * as pwa from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), mkcert(), pwa.VitePWA({
        srcDir: 'src',
        filename: 'sw.ts',
        devOptions: {
            enabled: true,
            type: 'module'
        }
    })],
    server: {
        port: 3000,
        strictPort: true,
        https: true
    }
})
