import { viteConfigFor } from "../../../infra/build/packages/viteConfigFor";

export default viteConfigFor('docodylusI18n')({
    build: {
        rollupOptions: {
            external: [ '@docodylus/i18n-internal' ],
        }
    }
});
