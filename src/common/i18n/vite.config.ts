import { viteConfigFor } from "@packages/viteConfigFactory";

export default viteConfigFor('docodylusI18n')({
    build: {
        rollupOptions: {
            external: [ '@docodylus/i18n-internal' ],
        }
    }
});
