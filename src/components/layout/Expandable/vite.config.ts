import { viteConfigFor } from "../../../../infra/build/packages/viteConfigFor";

export default viteConfigFor('docodylusI18n')({
    build: {
        rollupOptions: {
            external: [
                '@docodylus/namespace-internal',
                '@docodylus/i18n-internal',
                '@docodylus/i18n-extend',
                'react'
            ],
        }
    },
    css: {
        modules: {
        scopeBehaviour: 'local',
        generateScopedName: '[name]__[local]__[hash:base64:5]',
        },
    },
});
