import importNewlines from 'eslint-plugin-import-newlines';

// place rules here to have them evaluated last (and therefore
// override any existing defaults from imported rulesets)
export const ruleOverrides = {
  plugins: { 'import-newlines': importNewlines },
  rules: {
    'react/react-in-jsx-scope': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
    'react/require-default-props': 'off',

    'import/extensions': ['error', { ts: 'never', tsx: 'never' }],
    'import-newlines/enforce': ['warn', { items: 3, 'max-len': 120 }],

    // named imports are now best-practice and important to support tree-shaking
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
  },
};
