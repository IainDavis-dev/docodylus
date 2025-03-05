import isValidLocale from '@i18n/utils/validateLocale';
import { describeUnitTest } from '@test-utils/testGroups';
import { all } from 'locale-codes';

const locales = all.map(({ tag }) => tag);
const invalidLocales = [
  // invalid
  '',
  'xxxxxxxxxxxx',
  // structurally valid but not in `locale-codes`
  'xx-XX',
  'xx-Xxxx-XX',
  // non-string
  null as unknown,
  undefined as unknown,
  123 as unknown,
  {} as unknown,
  [] as unknown,
];

describeUnitTest.for([
  ...locales.map((locale) => [locale, true]),
  ...invalidLocales.map((locale) => [locale, false]),
])('ValidateLocale', ([locale, expectValid]) => {
  it(`locale "${String(locale)}" is ${expectValid as boolean ? 'valid' : 'not valid'}`, () => {
    expect(isValidLocale(locale)).toBe(expectValid);
  });
});
