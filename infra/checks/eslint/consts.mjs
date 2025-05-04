import { resolve } from 'path';

/** @type {import('eslint').Linter.Config} */
export const commonConfig = {
    settings: {
        'import/resolver': {
            typescript: {
                project: resolve('../../../tsconfig.json'),
                alwaysTryTypes: true
            },
            workspaces: true
        },
        react: {
          version: 'detect'
        }
    },
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: '.',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
}

export const ALL_SOURCE_FILES = ["./{packages,test,infra,docs}/**/*.{ts,tsx,js,jsx,mjs}"]
export const TYPESCRIPT_FILES = ["./{packages,test,infra,docs}/**/*.{ts,tsx}"]
export const MDX_FILES = ["**/*.mdx"]
export const TEST_FILES = [
  "./**/*.test.*",
  "./**/*.test-d.*",
  "./**/__mocks__/*",
  "./**/__snapshots__/*",
];
export const NON_RUNTIME_FILES = [
        "./infra/**/*",
        "./docs/**/*",
        "./test/**/*",
        "./**/*.test.*",
        // "./**/*.docs.*",
        "**/*.d.ts",
        "./**/*.stories.*",
        "./**/*.config.*",
        "./**/*.txlns.*",
        "./**/__mocks__/*",
        "./**/__snapshots__/*",
        ".*",
]