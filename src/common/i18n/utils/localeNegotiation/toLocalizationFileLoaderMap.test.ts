import { toLocalizationFileLoaderMap } from '@i18n/utils/localeNegotiation';
import { FileLoaderMap } from '@shared-utils/types';
import { describeUnitTest } from '@test-utils/testGroups';

describeUnitTest('toLocalizationFileLoaderMap', () => {
  it('should transform the FileLoaderMap to the correct output shape', () => {
    const enLoader = (): Promise<object> => Promise.resolve({});
    const esLoader = (): Promise<object> => Promise.resolve({});
    const input: FileLoaderMap<object> = {
      'https://mockurl.com/src/components/layout/Expandable/localization/txlns/en.txlns.ts': enLoader,
      'https://mockurl.com/src/components/layout/Expandable/localization/txlns/es.txlns.ts': esLoader,
    };

    const actual = toLocalizationFileLoaderMap(input);

    expect(actual).toEqual({
      en: {
        cacheKey: 'https://mockurl.com/src/components/layout/Expandable/localization/txlns/en.txlns.ts',
        loader: enLoader,
      },
      es: {
        cacheKey: 'https://mockurl.com/src/components/layout/Expandable/localization/txlns/es.txlns.ts',
        loader: esLoader,
      },
    });
  });

  it('should ignore FileLoaderMap properties whose key does not include a locale-like string in the expected location', () => {
    const enLoader = (): Promise<object> => Promise.resolve({});
    const esLoader = (): Promise<object> => Promise.resolve({});
    const input: FileLoaderMap<object> = {
      'https://mockurl.com/src/components/layout/Expandable/localization/txlns/en.txlns.ts': enLoader,
      'https://mockurl.com/src/components/layout/Expandable/localization/txlns/es.txlns.ts': esLoader,
      'https://mockurl.com/src/components/layout/Expandable/wrongFileNameAndLocation.ts': () => Promise.resolve({}),
    };

    const actual = toLocalizationFileLoaderMap(input);
    expect(actual).toEqual({
      en: {
        cacheKey: 'https://mockurl.com/src/components/layout/Expandable/localization/txlns/en.txlns.ts',
        loader: enLoader,
      },
      es: {
        cacheKey: 'https://mockurl.com/src/components/layout/Expandable/localization/txlns/es.txlns.ts',
        loader: esLoader,
      },
    });
    expect(Object.keys(actual).length).toBe(2);
  });

  it('should return an empty object when an empty object is the input', () => {
    expect(toLocalizationFileLoaderMap({})).toEqual({});
  });

  type TestCase = {description: string, input: unknown}
  describe.each`
        description         | input
        ${'undefined'}    | ${undefined as unknown}
        ${'null'}         | ${null as unknown}
        ${'NaN'}          | ${NaN as unknown}
        ${'Infinity'}     | ${Infinity as unknown}
        ${'Array'}        | ${[]}
    `('invalid inputs', ({ description, input }: TestCase) => {
    it(`should throw an error for invalid input ${description}`, () => {
      // @ts-expect-error
      expect(() => toLocalizationFileLoaderMap(input)).toThrowError();
    });
  });
});
