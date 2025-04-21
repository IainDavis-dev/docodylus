import { viteConfigFor  } from '@packages/viteConfigFactory';

export default viteConfigFor('docodylusLoadableInternal')({
    build: {
        rollupOptions: {
            external: ['@docodylus/error-internal' ],
        }
    }
})
