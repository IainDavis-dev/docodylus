import { viteConfigFor} from '../../../../infra/build/packages/viteConfigFor';

export default viteConfigFor('docodylusNamespaceInternal')({
    build: {
        rollupOptions: {
            external: ['@docodylus/validation-internal', '@docodylus/error-internal' ],
        }
    }
});
