import { FlatCompat } from '@eslint/eslintrc';
import globalConfigFactory from './config/eslint/globalEslintConfig.js';
import javascriptSourceConfigFactory from './config/eslint/javascriptSource.js';
import typescriptSourceConfigFactory from './config/eslint/typescriptSource.js';
import nonRuntimeFilesConfig from './config/eslint/nonRuntimeFiles.js';
import testFilesConfig from './config/eslint/testFiles.js';
import ignoredFilesConfig from './config/eslint/eslintignore.js';
import ruleOverrides from './config/eslint/ruleOverrides.js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.ts', '.tsx'],
        },
      },
    },
  },
  globalConfigFactory(import.meta.dirname),
  ...javascriptSourceConfigFactory(compat),
  ...typescriptSourceConfigFactory(import.meta.dirname),
  ruleOverrides,
  nonRuntimeFilesConfig,
  testFilesConfig,
  // this has to be last, apparently, or eslint will override the
  // `ignores` array within when merging configs
  ignoredFilesConfig,
];
