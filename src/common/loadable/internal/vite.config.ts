import { viteConfigFor  } from '../../../../infra/build/packages/viteConfigFactory';

export default viteConfigFor('docodylusLoadableInternal')({
    build: {
        rollupOptions: {
            external: ['@docodylus/error-internal' ],
        }
    }
})
