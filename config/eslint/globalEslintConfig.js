function globalConfigFactory(dirname) {
  return {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.mjs', '.ts', '.jsx', '.tsx'],
        },
      },
    },
    languageOptions: {
      parserOptions: {
        // make eslint aware of path aliases
        tsconfigRootDir: dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          mjs: 'never',
          cjs: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
    },
  };
}

export default globalConfigFactory;
