import { describeUnitTest } from "@test-utils/testGroups";
import { DocodylusTypeError } from "@error/DocodylusTypeError";
import { DEFAULT_LOCALE } from "@i18n/consts";
import { ValidLocale } from "@i18n/types";
import { negotiateLocales } from "@i18n/utils/localeNegotiation";

describeUnitTest("negotiateLocales", () => {
    const availableLocales = ["bs", "bs-Latn-BA", "bs-Latn", "bs-Cyrl", "fr", "fr-FR"] as ValidLocale[]

    describe("with no sort parameter", () => {

        it("should select all locales from the provided set that are prefixes of the requested locale", () => {
            const actual = negotiateLocales("bs-Latn-BA", availableLocales);

            (["bs-Latn-BA", "bs-Latn", "bs"] as ValidLocale[]).forEach((matchingLocale: ValidLocale) => {
                expect(actual).toContain(matchingLocale);
            });
        });

        it("should exclude all locales from the provided set that are not prefixes of the requested locale", () => {
            const actual = negotiateLocales("bs-Latn", availableLocales);

            (["bs-Latn", "bs"] as ValidLocale[]).forEach((matchingLocale: ValidLocale) => {
                expect(actual).toContain(matchingLocale);
            });
            expect(actual).not.toContain("bs-Latn-BA");
        });

        it("should filter out all locales from the provided set that are not prefixes of the requested locale", () => {
            const actual = negotiateLocales("bs-Latn-BA", availableLocales);

            (["bs-Cyrl", "fr", "fr-FR"] as ValidLocale[]).forEach((nonMatchingLocale: ValidLocale) => {
                expect(actual).not.toContain(nonMatchingLocale);
            })
        })

        it("should return an array containing the default locale (only) if no matching locale is available", () => {
            const actual = negotiateLocales("es-ES", availableLocales);

            expect(actual).toEqual([DEFAULT_LOCALE])
        })

        it("should return an array containing only the default locale when availableLocales is empty", () => {
            const actual = negotiateLocales("bs-Latn-BA", []);
            expect(actual).toStrictEqual(["en"]);
        });

        it("should always include the default locale first", () => {
            const actual = negotiateLocales("bs-Latn-BA", availableLocales);

            expect(actual[0]).toBe(DEFAULT_LOCALE);
        })

    })
    describe("with sort parameter = 'sort-for-merge'", () => {

        it("should list the default locale first and order the remaining elements from shortest to longest", () => {
            const actual = negotiateLocales("bs-Latn-BA", availableLocales, 'sort-for-merge');

            expect(actual[0]).toBe(DEFAULT_LOCALE);
            expect(actual.slice(1)).toStrictEqual(["bs", "bs-Latn", "bs-Latn-BA"]);
        });
    })

    describe("edge cases", () => {

        describe.each`
            description                         | requestedLocale   | availableLocales      | expectedErrorType         | expectedSubtype
            ${"requested locale is null"}       | ${null}           | ${availableLocales}   | ${DocodylusTypeError}     | ${"InvalidLocale"}
            ${"requested locale is undefined"}  | ${undefined}      | ${availableLocales}   | ${DocodylusTypeError}     | ${"InvalidLocale"}
            ${"requested locale is NaN"}        | ${NaN}            | ${availableLocales}   | ${DocodylusTypeError}     | ${"InvalidLocale"}
            ${"requested locale is Infinity"}   | ${Infinity}       | ${availableLocales}   | ${DocodylusTypeError}     | ${"InvalidLocale"}
            ${"requested locale is a number"}   | ${123}            | ${availableLocales}   | ${DocodylusTypeError}     | ${"InvalidLocale"}
            ${"requested locale is an object"}  | ${{}}             | ${availableLocales}   | ${DocodylusTypeError}     | ${"InvalidLocale"}
            ${"available locales is null"}      | ${"en"}           | ${null}               | ${DocodylusTypeError}     | ${"InvalidArgument"}
            ${"available locales is undefined"} | ${"en"}           | ${undefined}          | ${DocodylusTypeError}     | ${"InvalidArgument"}
            ${"available locales is NaN"}       | ${"en"}           | ${NaN}                | ${DocodylusTypeError}     | ${"InvalidArgument"}
            ${"available locales is Infinity"}  | ${"en"}           | ${Infinity}           | ${DocodylusTypeError}     | ${"InvalidArgument"}
            ${"available locales is an object"} | ${"en"}           | ${{}}                 | ${DocodylusTypeError}     | ${"InvalidArgument"}
        `("should throw an error when", ({description, requestedLocale, availableLocales, expectedErrorType, expectedSubtype}) => {

            it(`${description}`, () => {
                try {
                    negotiateLocales(requestedLocale, availableLocales)
                } catch (err: unknown) {
                    if(!(err instanceof DocodylusTypeError)) {
                        assert.fail(`Expected DocodylusTypeError, but got ${err}`)
                    } else {
                        if(err.subtype !== expectedSubtype) assert.fail(`Expected error with subtype ${expectedSubtype}, but got ${err.subtype}`)
                    }
                }
            })
        })
    })
});
