import tseslint from 'typescript-eslint';

import { commonConfig, TYPESCRIPT_FILES } from './consts.mjs';

/** @type {import('eslint').Linter.Config} */
const config = {
    ...commonConfig,
    languageOptions: {
        ...commonConfig.languageOptions,
        parser: tseslint.parser,
        parserOptions: {
            projectService: true,
            tsconfigRootDir: '.',
        }
    },
    files: [TYPESCRIPT_FILES],
    plugins: {
        '@typescript-eslint': tseslint.plugin,
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/strict-boolean-expressions': [
          'warn',
          {
            allowNullableBoolean: true,
            allowNullableNumber: true,
            allowNullableString: true,
          },
        ],
        '@typescript-eslint/prefer-readonly': 'warn',
        '@typescript-eslint/member-ordering': ['warn', {
          default: [
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            'constructor',
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
          ],
        }],
        '@typescript-eslint/restrict-template-expressions': 'off',
    }
}

export default [
    ...tseslint.configs.recommended.map((config) => ({ ...config, files: [TYPESCRIPT_FILES] })),
    ...tseslint.configs.recommendedTypeChecked.map(
      (config) => ({ ...config, files: [TYPESCRIPT_FILES]}),
    ),
    config
];