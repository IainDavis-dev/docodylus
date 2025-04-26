import path, { resolve } from 'path';
import { defineConfig, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

const { default: mdxPlugin } = await (import('@mdx-js/rollup'));

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
    react(),
    dts({
      rollupTypes: true,
    }),
    mdxPlugin(),
    ...(overrides.plugins || []),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [resolve(__dirname, '../../../vitest.setup.ts')],
    coverage: {
      provider: 'istanbul',
      reporter: ['html', 'text', 'lcov'],
      reportsDirectory: 'static/reports/coverage',
      all: true,
      exclude: [
        '**/storybook',
        '**/test',
        '**/*.test.*',
        '**/*.test-d.ts',
        '**/__snapshots__',
        '**/__mocks__',
        '**/node_modules',
        '**/dist',
        '**/static',
        '**/scripts',
      ],
      thresholds: {
        statements: 95,
        branches: 95,
        functions: 95,
        lines: 95,
      },
    },
    ...overrides.test,
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: '[name]__[local]__[hash:base64:5]',
      ...overrides.css?.modules
    },
    ...overrides.css
  },
  resolve: {
    alias: {
      // infra, docs, & test stuff
      '@docs': path.resolve(__dirname, '../../../docs'),
      '@dummies': path.resolve(__dirname, '../../../infra/dummies'),
      '@storybook-customizations': path.resolve(__dirname, '../../../infra/storybook/customizations'),
      '@test-utils': path.resolve(__dirname, '../../../infra/testUtils'),

      // library components
      '@components': path.resolve(__dirname, '../../../src/components'),

      // cross-cutting modules
      '@consts': path.resolve(__dirname, '../../../src/common/consts/internal'),
      '@error': path.resolve(__dirname, '../../..//src/common/error/internal'),
      '@i18n': path.resolve(__dirname, '../../../src/common/i18n/internal'),
      '@loadable': path.resolve(__dirname, "../../../src/common/loadable/internal"),
      '@namespace': path.resolve(__dirname, '../../../src/common/namespace/internal'),
      '@validation': path.resolve(__dirname, '../../../src/common/validation/internal'),
    }
  }
});