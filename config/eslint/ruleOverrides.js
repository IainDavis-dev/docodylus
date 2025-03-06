import importNewlines from 'eslint-plugin-import-newlines';

// place rules here to have them evaluated last (and therefore
// override any existing defaults from imported rulesets)
const ruleOverrides = {
  plugins: { 'import-newlines': importNewlines },
  rules: {
    'react/react-in-jsx-scope': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
    'react/require-default-props': 'off',

    'import/extensions': ['error', { ts: 'never', tsx: 'never' }],
    'import-newlines/enforce': ['warn', { items: 3, 'max-len': 120 }],
  },
};

export default ruleOverrides;
