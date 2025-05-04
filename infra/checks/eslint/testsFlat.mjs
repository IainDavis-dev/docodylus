import importPlugin from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react';

import { commonConfig, TEST_FILES } from './consts.mjs';

/** @type {import('eslint').Linter.Config} */
const config = {
    ...commonConfig,
    plugins: {
        import: importPlugin,
        react: pluginReact,
    },
    files: TEST_FILES,
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'import/no-default-export': 'off',
    }
}

export default config;