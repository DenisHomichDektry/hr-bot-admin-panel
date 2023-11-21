import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
      "~/": "/src",
    },
  },
});
