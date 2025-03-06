import { BUILD_CONFIG_FILES, BUILD_SCRIPTS, TEST_FILES } from './consts.js';

/* Config to stop eslint complaining about devDependencies in files
 * where devDependencies are fine */
const nonRuntimeConfig = {
  settings: {
    // for whatever reason, eslint treats this dependency as a violation of rule
    // `import/no-extraneous-dependencies`, if it appears in `devDependencies`, while permitting
    // other dependencies in the same situation. Tweaking the rule hasn't fixed it, so I'm
    // explicitly whitelisting this import for build-time files.
    'import/core-modules': ['@storybook/react'],
  },
  files: [
    ...TEST_FILES,
    ...BUILD_CONFIG_FILES,
    ...BUILD_SCRIPTS,
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: true,
      }],

    // eslint configs run in node and require the file extension for imports. For now, this is
    // applied broadly to all non-runtime files, but we can make it more specific later if needed
    'import/extensions': [
      'warn',
      { js: 'always' },
    ],

  },
};

export default nonRuntimeConfig;
