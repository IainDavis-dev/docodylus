import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: 'index.ts',
      name: 'docodylusSharedUtilsInternal',
      formats: ['cjs', 'es'],
      fileName: (format) => {
        const isEs = format === 'es';
        return `${isEs ? 'esm' : 'cjs'}/index.${isEs ? 'mjs' : 'cjs'}`;
      },
    },
    sourcemap: true,
    rollupOptions: {
      external: [], // You can list shared deps if any
    }
  },
  plugins: [
    tsconfigPaths(),
    dts({
      rollupTypes: true,
    })
  ],
});