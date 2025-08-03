import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'PictureToNotes',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // Externalize dependencies you don’t want bundled
      external: [],
      output: {
        globals: {}  // e.g., vue: 'Vue' if you had peer deps
      }
    },
    outDir: 'dist',
    target: 'esnext',
    emptyOutDir: true
  }
});
