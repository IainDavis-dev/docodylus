import { BUILD_CONFIG_FILES, BUILD_SCRIPTS, TEST_FILES } from './consts.js';

/* Config to stop eslint complaining about devDependencies in files
 * where devDependencies are fine */
const nonRuntimeConfig = {
  files: [
    ...TEST_FILES,
    ...BUILD_CONFIG_FILES,
    ...BUILD_SCRIPTS,
  ],
  rules: {
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
  },
};

export default nonRuntimeConfig;
