import globals from 'globals';
import { TEST_FILES } from './consts.js';

/** @type {import('eslint').Linter.Config} */
export const testFilesConfig = {
  files: TEST_FILES,
  languageOptions: {
    globals: {
      ...globals.vitest,
      ...globals.node,
    },
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-default-export': 'off',
  },
};
