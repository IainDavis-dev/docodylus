import { DYNAMICALLY_LOADED_FILES } from './consts.js';

/** @type {import('eslint').Linter.Config} */
export const dynamicallyLoadedFilesConfig = {
  files: DYNAMICALLY_LOADED_FILES,
  rules: {
    'import/no-default-export': 'off',
  },
};
