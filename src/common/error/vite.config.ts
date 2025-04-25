import { viteConfigFor } from '../../../infra/build/packages/viteConfigFor';

export default viteConfigFor('docodylusError')({
    build: {
        rollupOptions: {
            external: ['@docodylus/error-internal' ],
        }
    }
})