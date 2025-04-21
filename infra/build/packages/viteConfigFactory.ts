import { resolve } from 'path';
import { defineConfig, UserConfig } from 'vite';
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



export const viteConfigFor = (libName: string) => (overrides: Partial<UserConfig> = {}) => defineConfig(
  {
    ...overrides,
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
      ...overrides.build?.lib,
    },
    sourcemap: true,
    rollupOptions: {
      external: [], // override if needed
      ...overrides.build?.rollupOptions
    },
    ...overrides.build,
  },
  plugins: [
    tsconfigPaths(),
    dts({
      rollupTypes: true,
    }),
    ...(overrides.plugins || []),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [resolve(__dirname, '../../../vitest.setup.ts')],
    ...overrides.test
  }
});