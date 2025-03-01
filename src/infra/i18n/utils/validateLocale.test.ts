import { isValidLocale } from "@i18n/utils/validateLocale";
import { describeUnitTest } from "@test-utils/testGroups";
import { all } from 'locale-codes';

const locales = all.map(({tag}) => tag);
const invalidLocales = [
    "",                     // empty string
    "xxxxxxxxxxxx",         // gibberish
    "xx-XX",                // structurally valid but not in `locale-codes`
    "xx-Xxxx-XX",           // same as above, with script tag
    null as any,            // non-string
    undefined as any,
    123 as any,
    {} as any,
    [] as any
];


describeUnitTest.for([
    ...locales.map(locale => [locale, true]),
    ...invalidLocales.map(locale => [locale, false])
])("ValidateLocale", ([locale, expectValid]) => {
    it(`locale "${locale}" is ${expectValid ? 'valid' : 'not valid'}`, () => {
        expect(isValidLocale(locale)).toBe(expectValid);
    })
});