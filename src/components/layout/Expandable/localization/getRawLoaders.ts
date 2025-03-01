import { ExpandableLocalizedStrings } from ".";

/**
 * Wraps un-mockable `import.meta.glob` call so that it can be mocked in tests.
 * See [This github discussion](https://github.com/vitest-dev/vitest/discussions/3564#discussioncomment-7884395)
 * and [this deeper explanation from the docs](https://vite.dev/guide/features.html#glob-import)
*/
export function getRawLoaders() {
    // cannot externalize this into a utility function: argument to import.meta.glob must be a string literal
    // see: https://vite.dev/guide/features#glob-import-caveats
    return import.meta.glob<Partial<ExpandableLocalizedStrings>>("./txlns/*.txlns.ts", { import: 'default'});
}