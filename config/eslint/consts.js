// consts used in ESLint configuration
export const SOURCE_FILES = ['**/*.{js,jsx,mjs,cjs,ts,tsx}'];
export const TYPESCRIPT_FILES = ['**/*.{ts,tsx}'];
export const TEST_FILES = ['**/*.test.ts', '**/*.test.tsx', '**/*.test.js', '**/*.test.jsx'];
export const BUILD_CONFIG_FILES = [
  '**/*.config.ts',
  'vitest.setup.ts',
  '*.config.{js,mjs,cjs,ts}',
  'config/**',
];
export const BUILD_SCRIPTS = [
  'scripts/**',
];
export const STORY_FILES = ['**/*.stories.{ts,tsx}'];
