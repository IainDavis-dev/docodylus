import { viteConfigFor } from '../../../../infra/build/packages/viteConfigFor';

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
});
