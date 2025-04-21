import { viteConfigFor } from '@packages/viteConfigFactory';
import tsconfigPaths from 'vite-tsconfig-paths'

export default viteConfigFor('docodylusI18nInternal')({
    plugins: [
        tsconfigPaths(),
    ]
});
