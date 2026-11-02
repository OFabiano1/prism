import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const src = fileURLToPath(new URL('./src/index.ts', import.meta.url));

export default defineConfig({
  root: 'examples',
  plugins: [react()],
  resolve: {
    alias: { prism: src },
  },
  server: { port: 5283, strictPort: false },
  build: { outDir: '../dist-examples', emptyOutDir: true },
});
