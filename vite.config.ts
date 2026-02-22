import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Remove base path for Vercel deployment
  // GitHub Pages would need: base: '/ai-business-survey/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});