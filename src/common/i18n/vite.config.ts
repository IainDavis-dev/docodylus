import { viteConfigFor } from "../../../infra/build/packages/viteConfigFactory";

export default viteConfigFor('docodylusI18n')({
    build: {
        rollupOptions: {
            external: [ '@docodylus/i18n-internal' ],
        }
    }
});
