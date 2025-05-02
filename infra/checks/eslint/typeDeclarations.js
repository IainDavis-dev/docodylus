import { DECLARATIONS } from './consts.js';

/** @type {import('eslint').Linter.Config} */
export const typeDeclarationFilesConfig = {
  files: DECLARATIONS,
  rules: {
    'import/no-default-export': 'off',
  },
};
