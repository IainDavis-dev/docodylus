import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

export const createInternalViteConfig = (libName: string) =>
  defineConfig({
    build: {
      outDir: 'dist',
      lib: {
        entry: 'index.ts',
        name: libName,
        formats: ['cjs', 'es'],
        fileName: (format) => {
          const isEs = format === 'es';
          return `${isEs ? 'esm' : 'cjs'}/index.${isEs ? 'mjs' : 'cjs'}`;
        },
      },
      sourcemap: true,
      rollupOptions: {
        external: [], // override if needed
      },
    },
    plugins: [
      tsconfigPaths(),
      dts({
        rollupTypes: true,
      }),
    ],
  });
