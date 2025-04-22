import { viteConfigFor } from '../../../infra/build/packages/viteConfigFactory';

export default viteConfigFor('docodylusError')({
    build: {
        rollupOptions: {
            external: ['@docodylus/error-internal' ],
        }
    }
})