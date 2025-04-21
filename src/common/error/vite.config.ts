import { viteConfigFor } from '@packages/viteConfigFactory';

export default viteConfigFor('docodylusError')({
    build: {
        rollupOptions: {
            external: ['@docodylus/error-internal' ],
        }
    }
})