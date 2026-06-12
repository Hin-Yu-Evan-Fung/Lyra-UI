import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import wasm from 'vite-plugin-wasm'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [svelte(), wasm(), tailwindcss()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
})
