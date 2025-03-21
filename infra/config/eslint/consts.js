// consts used in ESLint configuration
export const SOURCE_FILES = ['**/*.{js,jsx,mjs,cjs,ts,tsx}'];
export const TYPESCRIPT_FILES = ['**/*.{ts,tsx}'];
export const DECLARATIONS = ['**/*.d.ts'];
export const DYNAMICALLY_LOADED_FILES = ['**/*.txlns.ts'];
export const TEST_FILES = ['test/**', '**/*.test.ts', '**/*.test.tsx', '**/*.test.js', '**/*.test.jsx'];
export const INFRA_FILES = [
  '**/*.config.ts',
  'vitest.setup.ts',
  '*.config.{js,mjs,cjs,ts}',
  'infra/**',
];
export const BUILD_SCRIPTS = [
  'scripts/**',
];
export const STORY_FILES = ['**/*.stories.{ts,tsx}'];
