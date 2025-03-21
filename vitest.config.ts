import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

const { default: mdxPlugin } = await (import('@mdx-js/rollup'));

export default defineConfig({
  ...viteConfig,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}', 'test/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    root: '.',
    typecheck: {
      tsconfig: './tsconfig.json',
      exclude: ['./node_modules', './dist', './build', './static'],
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['html', 'text', 'lcov'],
      reportsDirectory: 'static/reports/coverage',
      all: true,
      thresholds: {
        statements: 95,
        branches: 95,
        functions: 95,
        lines: 95,
      },
      exclude: [
        'docs', // TODO: separate coverage metrics for docs
        'scripts', // TODO: separate coverage metrics for scripts
        'build',
        'static',
        'config',
        '.*', // no dot-files

        // typescript and javascript files in the root directory
        // tend to be config files
        '*.ts',
        '*.js',
        '*.mjs',

        // I think I want to avoid testing all the markdown files.
        // May revisit later May just do snapshot tests on the
        // rendered content later so at least I can detect if
        // something breaks unexpectedly.
        '*.mdx',
        '*.md',

        // no need to test the test files themselves
        '**/*.test.*',
        '**/*.test-d.*',
        'test/testUtils',
        '**/*.spec.*',
        '**/*.stories.*',
        '**/__mocks__',
        '**/__snapshots__',
      ],
      // something of a desperation move using 'unknown' here... VS Code is complaining about the
      // perfectly-valid `provider: 'istanbul'` property. The actual type is deprecated in favor of
      // using inference. Note: everything is fine at runtime, it's just a TS check throwing a
      // spurious warning.
    },
  },
  plugins: [
    ...(viteConfig.plugins || []),
    mdxPlugin(),
  ],
});
