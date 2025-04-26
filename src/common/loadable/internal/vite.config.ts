import { viteConfigFor  } from '../../../../infra/build/packages/viteConfigFor';

export default viteConfigFor('docodylusLoadableInternal')({
    build: {
        rollupOptions: {
            external: ['@docodylus/error-internal' ],
        }
    }
})
