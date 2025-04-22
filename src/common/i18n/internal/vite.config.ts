import { viteConfigFor } from '../../../../infra/build/packages/viteConfigFactory';
import tsconfigPaths from 'vite-tsconfig-paths'

export default viteConfigFor('docodylusI18nInternal')({
    build: {
        rollupOptions: {
            external: [
                "@docodylus/error-internal",
                "@docodylus/loadable-internal",
                "@docodylus/namespace-internal",
            ]
        }
    },
    plugins: [
        tsconfigPaths(),
    ]
});
