import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import wasm from 'vite-plugin-wasm'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Lyra-UI/',
  plugins: [svelte(), wasm(), tailwindcss()],
})
