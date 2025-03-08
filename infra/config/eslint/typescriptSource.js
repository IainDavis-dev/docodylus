import tseslint from 'typescript-eslint';
import { TYPESCRIPT_FILES } from './consts.js';

export function typescriptSourceConfigFactory(dirname) {
  /** @type {import('eslint').Linter.Config[]} */
  return [
    ...tseslint.configs.recommended.map((config) => ({ ...config, files: TYPESCRIPT_FILES })),
    ...tseslint.configs.recommendedTypeChecked.map(
      (config) => ({ ...config, files: TYPESCRIPT_FILES }),
    ),
    {
      files: TYPESCRIPT_FILES,
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: dirname,
        },
      },
      plugins: {
        '@typescript-eslint': tseslint.plugin,
      },
      // we've omitted the AirBnB typescript configs due to
      // incompatibilities with the existing rulesets.
      // This block restores some of the more important rules from
      // AirBnBs style guide.
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
      },
    },
  ];
}
