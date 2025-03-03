import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { FlatCompat } from "@eslint/eslintrc"

const SOURCE_FILES = ["**/*.{js,jsx,mjs,cjs,ts,tsx}"];
const TYPESCRIPT_FILES = ["**/*.{ts,tsx}"];
const TEST_FILES = ["**/*.test.{ts,tsx,js,jsx}"];

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
})

console.log(compat.extends("eslint-config-airbnb-typescript"));

const ignoredFilesConfig = {
  ignores: [
    "**/.*",
    "node_modules",
    "static",
    "tsconfig.vitest-temp.json",
    ".vscode",
    ".local",
  ],
}

/** @type {import('eslint').Linter.Config} */
const jsConfig = {
  files: SOURCE_FILES,
  ...pluginJs.configs.recommended,
  ...pluginReact.configs.flat.recommended,
  ...pluginReact.configs.flat['jsx-runtime'],
  // ...tseslint.configs.disableTypeChecked
}

const airBnbJsConfig = compat.extends("eslint-config-airbnb")
  .map((config) => ({...config, files: SOURCE_FILES}))


/** @type {import('eslint').Linter.Config} */
const tsConfig = {
  files: TYPESCRIPT_FILES,
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true
    }
  },
  rules: {
    ...tseslint.configs.recommended.rules,
    ...tseslint.configs.recommendedTypeChecked.rules
  }
}

const tsAirbnbConfig = compat.extends("eslint-config-airbnb-typescript")
  .map((config) => ({
    ...config,
    files: TYPESCRIPT_FILES,
    rules: {
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "@typescript-eslint/brace-style":  "off",
    }
  }));


/** @type {import('eslint').Linter.Config} */
const testConfig = {
  files: TEST_FILES,
  languageOptions: {
    globals: globals.node
  }
}

/** @type {import('eslint').Linter.Config} */
const universalConfig = {
    languageOptions: {
      parserOptions: {
        // make eslint aware of path aliases
        tsconfigRootDir: import.meta.dirname,
      },
      globals:  {
        ...globals.browser,
      }
    },
}

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...compat.extends("eslint-config-airbnb"),
  universalConfig,
  jsConfig,
  ...airBnbJsConfig,
  tsConfig,
  ...tsAirbnbConfig,
  testConfig,
  // this has to be last, apparently, or eslint will override the
  // `ignores` array within when merging configs
  ignoredFilesConfig,
];