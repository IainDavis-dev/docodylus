import type { ExpandableLocalizedStrings } from '@components/layout/Expandable/src/localization';

import { SUPPORTED_LOCALES } from '../consts';
import { createLocalizationStringLoaders } from '.';

describe('createLocalizationStringLoaders (unit)', () => {
  const componentFileUrl = new URL('@components/layout/Expandable/src/Expandable.tsx', import.meta.url);

  it('creates a complete LocalizationFileLoaderMap for all supported locales', () => {
    const map = createLocalizationStringLoaders<ExpandableLocalizedStrings>(componentFileUrl);

    for (const locale of SUPPORTED_LOCALES) {
      expect(map).toHaveProperty(locale);
      const entry = map[locale];

      expect(entry).toHaveProperty('cacheKey');
      expect(entry).toHaveProperty('loader');
      expect(typeof entry?.loader).toBe('function');
    }
  });

  it('produces cache keys that include the expected filenames', () => {
    const map = createLocalizationStringLoaders<ExpandableLocalizedStrings>(componentFileUrl);

    for (const locale of SUPPORTED_LOCALES) {
      const expectedFilename = `${locale}.txlns.ts`;
      expect(map[locale]?.cacheKey).toContain(expectedFilename);
    }
  });

  describe('post-load transform', () => {
    const dummyComponentUrl = new URL('.', import.meta.url);

    vi.mock(new URL('./localization/txlns/en.txlns.ts', new URL('.', import.meta.url)).pathname, () => ({ default: { greeting: 'Hello' }}));
    vi.mock(new URL('./localization/txlns/es.txlns.ts', new URL('.', import.meta.url)).pathname, () => ({ default: { greeting: 'Hola' }}));

    it('produces loaders that extract the default export from each module', async () => {
      const map = createLocalizationStringLoaders(dummyComponentUrl);
  
      for (const locale of SUPPORTED_LOCALES) {
        const result = await map[locale]?.loader();
        expect(result).toHaveProperty('greeting');
        // @ts-expect-error - test mock doesn't conform to the shape expected at runtime
        expect(typeof result?.greeting).toBe('string');
      }
    });
  });
});
