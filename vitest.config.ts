import { defineConfig, UserConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig(async () => {
    const { default: mdxPlugin } = await (import('@mdx-js/rollup'))

    const config = {
        ...viteConfig,
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './vitest.setup.ts',
            include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}', 'test/**/*.{test,spec}.{js,ts,jsx,tsx}'],
            root: ".",
            typecheck: {
                tsconfig: './tsconfig.json',
                exclude: ["./node_modules", "./dist", "./build", "./static"]
            },
            coverage: {
                provider: 'istanbul',
                reporter: ['html', 'text', 'lcov'],
                reportsDirectory: 'static/reports/coverage',
                all: true,
                thresholds: {
                    statements: 20,
                    branches: 20,
                    functions: 20,
                    lines: 20,
                },
                exclude: [
                    "docs", // TODO: separate coverage metrics for docs
                    "scripts", // TODO: separate coverage metrics for scripts
                    "build", 
                    "static",
                    ".*",   // no dot-files

                    // typescript and javascript files in the root directory tend to be config files
                    "*.ts",
                    "*.js", 

                    // I think I want to avoid testing all the markdown files. May revisit later
                    // May just do snapshot tests on the rendered content later so at least I can detect if something breaks unexpectedly.
                    "*.mdx",
                    "*.md",

                    // no need to test the test files themselves
                    "**/*.test.*",
                    "**/*.test-d.*",
                    "test/test-utils",
                    "**/*.spec.*",
                    "**/*.stories.*",
                    "**/__mocks__",
                    "**/__snapshots__",
                ]
            } as any // something of a desperation move... VS Code is complaining about the perfectly-valid `provider: 'istanbul'` property. Note: everything is fine at runtime, it's just a TS check throwing a spurious warning.
        },
        plugins: [
            ...(viteConfig.plugins || []),
            mdxPlugin()
        ],
    };
    return config;
});
