import { FlatCompat } from '@eslint/eslintrc';
import { globalConfigFactory } from './infra/config/eslint/globalEslintConfig.js';
import { javascriptSourceConfigFactory } from './infra/config/eslint/javascriptSource.js';
import { typescriptSourceConfigFactory } from './infra/config/eslint/typescriptSource.js';
import { nonRuntimeFilesConfig } from './infra/config/eslint/nonRuntimeFiles.js';
import { testFilesConfig } from './infra/config/eslint/testFiles.js';
import { ignoredFilesConfig } from './infra/config/eslint/eslintignore.js';
import { ruleOverrides } from './infra/config/eslint/ruleOverrides.js';
import { dynamicallyLoadedFilesConfig } from './infra/config/eslint/dynamicallyLoaded.js';
import { typeDeclarationFilesConfig } from './infra/config/eslint/typeDeclarations.js';

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
  typeDeclarationFilesConfig,
  dynamicallyLoadedFilesConfig,
  nonRuntimeFilesConfig,
  testFilesConfig,
  // this has to be last, apparently, or eslint will override the
  // `ignores` array within when merging configs
  ignoredFilesConfig,
];
