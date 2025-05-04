
import importPlugin from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react';

import { commonConfig, NON_RUNTIME_FILES } from './consts.mjs';

/** @type {import('eslint').Linter.Config} */
const config = {
    ...commonConfig,
    plugins: {
        import: importPlugin,
        react: pluginReact,
    },
    files: NON_RUNTIME_FILES,
    rules: {
        // tree-shaking not a concern in non-production files
        'import/no-default-export': 'off',
        'import/prefer-named-export': 'off',
    }
}

export default config;