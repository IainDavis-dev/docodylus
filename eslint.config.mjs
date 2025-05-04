import allSourceFlat from './infra/checks/eslint/allSourceFlat.mjs';
import tsSourceFlat from './infra/checks/eslint/tsSourceFlat.mjs';
import testsFlat from './infra/checks/eslint/testsFlat.mjs';
import nonRuntimeFlat from './infra/checks/eslint/nonRuntimeFlat.mjs'
import mdxFlat from './infra/checks/eslint/mdxFlat.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: [
            '**/dist/**',
            '**/static/**',
            '**/node_modules/**',
            '.*',
            '@',
            '**/*.config.*',
            '**/_generated/**/*'
        ],
    },
    allSourceFlat,
    ...tsSourceFlat,
    nonRuntimeFlat,
    testsFlat,
    ...mdxFlat
]