import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      // typescript: true,
    }),
    splitVendorChunkPlugin(),
    // visualizer(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
      '~/': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        // manualChunks(id: string) {
        //   if (id.includes('node_modules')) {
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
        //   }
        // },
      },
    },
  },
});
