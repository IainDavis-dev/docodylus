import { describeUnitTest } from '@test-utils/testGroups';
import { DocodylusTypeError } from '@error/types/DocodylusTypeError';
import { DEFAULT_LOCALE } from '@i18n/consts';
import { ValidLocale } from '@i18n/types';
import { negotiateLocales } from '@i18n/utils/localeNegotiation';

describeUnitTest('negotiateLocales', () => {
  const availableLocales = ['bs', 'bs-Latn-BA', 'bs-Latn', 'bs-Cyrl', 'fr', 'fr-FR'] as ValidLocale[];

  describe('with no sort parameter', () => {
    it('should select all locales from the provided set that are prefixes of the requested locale', () => {
      const actual = negotiateLocales('bs-Latn-BA', availableLocales);

      (['bs-Latn-BA', 'bs-Latn', 'bs'] as ValidLocale[]).forEach((matchingLocale: ValidLocale) => {
        expect(actual).toContain(matchingLocale);
      });
    });

    it('should exclude all locales from the provided set that are not prefixes of the requested locale', () => {
      const actual = negotiateLocales('bs-Latn', availableLocales);

      (['bs-Latn', 'bs'] as ValidLocale[]).forEach((matchingLocale: ValidLocale) => {
        expect(actual).toContain(matchingLocale);
      });
      expect(actual).not.toContain('bs-Latn-BA');
    });

    it('should filter out all locales from the provided set that are not prefixes of the requested locale', () => {
      const actual = negotiateLocales('bs-Latn-BA', availableLocales);

      (['bs-Cyrl', 'fr', 'fr-FR'] as ValidLocale[]).forEach((nonMatchingLocale: ValidLocale) => {
        expect(actual).not.toContain(nonMatchingLocale);
      });
    });

    it('should return an array containing the default locale (only) if no matching locale is available', () => {
      const actual = negotiateLocales('es-ES', availableLocales);

      expect(actual).toEqual([DEFAULT_LOCALE]);
    });

    it('should return an array containing only the default locale when availableLocales is empty', () => {
      const actual = negotiateLocales('bs-Latn-BA', []);
      expect(actual).toStrictEqual(['en']);
    });

    it('should always include the default locale first', () => {
      const actual = negotiateLocales('bs-Latn-BA', availableLocales);

      expect(actual[0]).toBe(DEFAULT_LOCALE);
    });
  });
  describe("with sort parameter = 'sort-for-merge'", () => {
    it('should list the default locale first and order the remaining elements from shortest to longest', () => {
      const actual = negotiateLocales('bs-Latn-BA', availableLocales, 'sort-for-merge');

      expect(actual[0]).toBe(DEFAULT_LOCALE);
      expect(actual.slice(1)).toStrictEqual(['bs', 'bs-Latn', 'bs-Latn-BA']);
    });
  });

  type TestCase = {
    description: string,
    requestedLocale: unknown,
    testAvailableLocales: unknown,
    expectedSubtype: string,
  }

  describe('edge cases', () => {
    describe.each`
            description                         | requestedLocale   | testAvailableLocales  | expectedSubtype
            ${'requested locale is null'}       | ${null}           | ${availableLocales}   | ${'InvalidLocale'}
            ${'requested locale is undefined'}  | ${undefined}      | ${availableLocales}   | ${'InvalidLocale'}
            ${'requested locale is NaN'}        | ${NaN}            | ${availableLocales}   | ${'InvalidLocale'}
            ${'requested locale is Infinity'}   | ${Infinity}       | ${availableLocales}   | ${'InvalidLocale'}
            ${'requested locale is a number'}   | ${123}            | ${availableLocales}   | ${'InvalidLocale'}
            ${'requested locale is an object'}  | ${{}}             | ${availableLocales}   | ${'InvalidLocale'}
            ${'available locales is null'}      | ${'en'}           | ${null}               | ${'InvalidArgument'}
            ${'available locales is undefined'} | ${'en'}           | ${undefined}          | ${'InvalidArgument'}
            ${'available locales is NaN'}       | ${'en'}           | ${NaN}                | ${'InvalidArgument'}
            ${'available locales is Infinity'}  | ${'en'}           | ${Infinity}           | ${'InvalidArgument'}
            ${'available locales is an object'} | ${'en'}           | ${{}}                 | ${'InvalidArgument'}
        `('should throw an error when', ({
      description,
      requestedLocale,
      testAvailableLocales,
      expectedSubtype,
    }: TestCase) => {
      it(`${description}`, () => {
        try {
          // @ts-expect-error test error handling with invalid inputs
          negotiateLocales(requestedLocale, testAvailableLocales);
        } catch (err: unknown) {
          if (!(err instanceof DocodylusTypeError)) {
            assert.fail(`Expected DocodylusTypeError, but got ${err}`);
          } else if (err.subtype !== expectedSubtype) assert.fail(`Expected error with subtype ${expectedSubtype}, but got ${err.subtype}`);
        }
      });
    });
  });
});
