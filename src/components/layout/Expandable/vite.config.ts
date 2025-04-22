import { viteConfigFor } from "../../../../infra/build/packages/viteConfigFactory";
import tsconfigPaths from 'vite-tsconfig-paths'

export default viteConfigFor('docodylusI18n')({
    build: {
        rollupOptions: {
            external: [
                '@docodylus/namespace-internal',
                '@docodylus/i18n-internal',
                '@docodylus/i18n-extend'
            ],
        }
    },
    plugins: [
        tsconfigPaths({ projects: ['./tsconfig.json']}),
    ],
    css: {
        modules: {
        scopeBehaviour: 'local',
        generateScopedName: '[name]__[local]__[hash:base64:5]',
        },
    },
});
