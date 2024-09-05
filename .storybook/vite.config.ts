import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsxFactory: 'elements.createElement',
  }
})