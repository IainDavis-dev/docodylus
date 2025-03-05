// place rules here to have them evaluated last (and therefore
// override any existing defaults from imported rulesets)
const ruleOverrides = {
  rules: {
    'react/react-in-jsx-scope': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
    'react/require-default-props': 'off',
    'import/extensions': ['error', { ts: 'never', tsx: 'never' }],
  },
};

export default ruleOverrides;
