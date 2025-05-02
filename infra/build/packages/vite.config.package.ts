import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';
import type { PackageJson } from 'type-fest';

const internalPackageTokens = [
    '-internal',
    '-extend',
]

export function viteConfigForPackage(pkg?: PackageJson) {
    const isPublicPackage = !internalPackageTokens.some(token => pkg?.name?.includes(token));

    return defineConfig({
        build: {
            outDir: 'dist',
            lib: {
            entry: './index.ts',
            formats: ['cjs', 'es'],
            fileName: (format) => {
                const isEs = format === 'es';
                return `${isEs ? 'esm' : 'cjs'}/index.${isEs ? 'mjs' : 'cjs'}`;
            },
            },
            sourcemap: true,
            rollupOptions: {
                external: [/^@docodylus\//], // override if needed
            },
        },
        plugins: [
            dts({ rollupTypes: isPublicPackage }),
        ]
    });
}

export default viteConfigForPackage();
