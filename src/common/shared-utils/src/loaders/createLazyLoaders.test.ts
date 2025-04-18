// test/createRawLoaders.test.ts
import { expect, it, vi } from 'vitest';
import { createLazyLoaders } from './createLazyLoaders';
import { describeIntegrationTest, describeUnitTest } from '@test-utils/testGroups';
import { ExpandableLocalizedStrings } from '@components/layout/Expandable/src/localization';
import { DocodylusTypeError } from '@docodylus/error';

describeUnitTest('createRawLoaders', () => {
  it('returns a map of lazy loaders from URLs', () => {
    const dummyUrl1 = new URL('./__mocks__/dummy1.ts', import.meta.url);
    const dummyUrl2 = new URL('./__mocks__/dummy2.ts', import.meta.url);

    const loaders = createLazyLoaders([dummyUrl1, dummyUrl2]);

    expect(Object.keys(loaders)).toContain(String(dummyUrl1));
    expect(Object.keys(loaders)).toContain(String(dummyUrl2));

    for (const loader of Object.values(loaders)) {
      expect(typeof loader).toBe('function');
    }
  });

  it('throws on invalid URL that does not resolve to a module', async () => {
    const invalid = new URL('./__mocks__/not_a_module.ts', import.meta.url);
    const loaders = createLazyLoaders([invalid]);

    await expect(loaders[invalid.toString()]()).rejects.toThrow();
  })

  it('should apply the transform if one is provided', async () => {
    const dummyUrl1 = new URL('./__mocks__/dummy1.ts', import.meta.url);

    type DummyModType = { default: {name: 'dummy1'}};
    type DummyTransformedModType = { default: DummyModType } & { transformed: boolean };

    const dummyTransform = vi.fn((mod) => {
      return { ...mod, transformed: true };
    });

    const loaders = createLazyLoaders<DummyModType, DummyTransformedModType>([dummyUrl1], dummyTransform);

    expect(dummyTransform).not.toHaveBeenCalled();

    const loaded = await loaders[dummyUrl1.toString()]();

    expect(dummyTransform).toHaveBeenCalled();
    expect(loaded).toHaveProperty('transformed');
    expect(loaded.transformed).toBe(true);
  })

  it('should return the untransformed module if no transform is supplied', async () => {
    const dummyUrl1 = new URL('./__mocks__/dummy1.ts', import.meta.url);

    type DummyModType = { default: {name: 'dummy1'}};
    const loaders = createLazyLoaders<DummyModType>([dummyUrl1]);

    const loaded = await loaders[dummyUrl1.toString()]();
    expect(loaded).toHaveProperty('default');
    expect(loaded.default).toEqual({name: 'dummy1'});

  })

  // default inputs
  it.each(['./__mocks__/dummy1.ts', {}, 42, NaN, Infinity, true, false ])
  ('throws on non-URL input: %s', (invalid) => {
    // @ts-expect-error - intentionally misusing the API
    expect(() => createLazyLoaders([invalid])).toThrow(DocodylusTypeError);
  })

  it.each([[], null, undefined])
  ('should return an empty object if passed no URLs (%s)', (arg) => {
    /* this validates runtime checking in the absence of a TypeScript environment */
    // @ts-expect-error - intentionally misusing the API 
    const loaders = createLazyLoaders(arg);
    expect(loaders).toEqual({});
  });

});

describeIntegrationTest('createLoaders (integration)', () => {
  const realEn = new URL('../../../../components/layout/Expandable/src/localization/txlns/en.txlns.ts', import.meta.url)
  const realEs = new URL('../../../../components/layout/Expandable/src/localization/txlns/es.txlns.ts', import.meta.url)

  it('invokes a loader and resolves a module', async () => {
    const dummyUrl = new URL('./__mocks__/dummy1.ts', import.meta.url);
    const loaders = createLazyLoaders([dummyUrl]);

    const result = await loaders[dummyUrl.toString()]();
    expect(result).toHaveProperty('default');
    expect(result.default).toEqual({name: 'dummy1'})
  });

  it('creates working dynamic imports for each URL', async () => {
    const loaders = createLazyLoaders<ExpandableLocalizedStrings>([realEn, realEs]);

    const enModule = await loaders[realEn.toString()]();
    const esModule = await loaders[realEs.toString()]();

    [enModule, esModule].forEach((m) => {
      expect(m).toHaveProperty('default')
      expect(m.default).toHaveProperty('dev.iaindavis.docodylus.layout.expandable.expandPrompt')
      expect(m.default).toHaveProperty('dev.iaindavis.docodylus.layout.expandable.collapsePrompt')
    })
  });
});
