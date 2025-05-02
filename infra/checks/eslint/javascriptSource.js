import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import { SOURCE_FILES } from './consts.js';

/* ESLint config for JavaScript files (and non-TypeScript-specific
 * rules in TypeScript files) */
const javascriptSourceConfig = {
  files: SOURCE_FILES,
  ...pluginJs.configs.recommended,
  ...pluginReact.configs.flat.recommended,
  ...pluginReact.configs.flat['jsx-runtime'],
  languageOptions: {
    globals: globals.browser,
  },
};

const javascriptRuleOverrides = {
  rules: {
    'import/extensions': ['error', 'always', { ts: 'never' }],
    'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
  },
};

// the compat object needs to be created in the `eslint.config.mjs`
// file so it can reference the root directly correctly
export function javascriptSourceConfigFactory(compat) {
  const airbnbJavascriptConfigs = compat.extends('eslint-config-airbnb')
    .map((config) => ({ ...config, files: SOURCE_FILES }));

  return [
    javascriptSourceConfig,
    ...airbnbJavascriptConfigs,
    javascriptRuleOverrides,
  ];
}
