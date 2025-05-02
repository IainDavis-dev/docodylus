import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: resolve(__dirname, 'vitest.setup.ts'),
        css:  {
            modules: {
                classNameStrategy: 'non-scoped'
            }
        },
        root: '.',
        typecheck: {
            include: ['**/*.test-d.ts'],
        },
        include: [
            '**/*.{test,spec}.{js,ts,jsx,tsx}',
        ],
        coverage: {
            provider: 'istanbul',
            reporter: ['html', 'text', 'lcov'],
            reportsDirectory: 'static/reports/coverage',
            // all: true,
            all: false,
            thresholds: {
                statements: 95,
                branches: 95,
                functions: 95,
                lines: 95,
            },
            include: ['**/*.{ts,tsx,js,jsx}'],
            exclude: [
                '**/storybook',
                '**/**/*.test.*',
                '**/*/*.test-d.ts',
                '**/__snapshots__',
                '**/__mocks__',
                '**/node_modules',
                '**/dist',
                '**/static',
                '**/scripts',
                'infra',
                'consts',
                '_generated',
            ],
        },
    },
})