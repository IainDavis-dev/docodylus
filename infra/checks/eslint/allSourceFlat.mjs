import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import'
import importNewlines from 'eslint-plugin-import-newlines';
import pluginReact from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

import { ALL_SOURCE_FILES,commonConfig } from './consts.mjs';

/** @type {import('eslint').Linter.Config} */
const config = {
    ...commonConfig,
    ...pluginJs.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat['jsx-runtime'],
    plugins: {
        import: importPlugin,
        react: pluginReact,
        'import-newlines': importNewlines,
        'simple-import-sort': simpleImportSort,
    },
    files: [ ALL_SOURCE_FILES ],
    ignores: [
        "**/*.mdx",
    ],
    languageOptions: {
        globals: globals.browser
    },
    rules: {
        'import/no-default-export': 'off',
        'import/no-extraneous-dependencies': 'off', // just a pain in the ass in a monorepo. I don't want to introduce an additional config-file-per-package to satisfy this rule
        'import/extensions': 'off', // causes more trouble than it's worth
        // prefer named exports to support tree-shaking
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',

        'import-newlines/enforce': ['warn', { items: 3, 'max-len': 120 }],

        'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
        'react/react-in-jsx-scope': ['off'],
        'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
        'react/require-default-props': 'off',
        
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',
    }
}

export default config;