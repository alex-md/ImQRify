// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    base: process.env.NODE_ENV === 'production'
        ? '/imqrify/'    // ← replace with your repo name
        : '/',
    plugins: [react()],
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
    },
})
