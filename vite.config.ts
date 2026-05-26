import { defineConfig } from 'vite';

export default defineConfig({
  worker: {
    format: 'es',
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          leaflet: ['leaflet'],
          pmtiles: ['pmtiles'],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['leaflet-draw'],
  },
});
