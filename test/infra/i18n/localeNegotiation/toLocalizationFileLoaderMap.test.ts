import { toLocalizationFileLoaderMap } from "@i18n/utils/localeNegotiation";
import { FileLoaderMap } from "@shared-utils/types";
import { describeUnitTest } from "@test-utils/testGroups";

describeUnitTest("toLocalizationFileLoaderMap", () => {

    it("should transform the FileLoaderMap to the correct output shape", () => {
        const enLoader = () => Promise.resolve({});
        const esLoader = () => Promise.resolve({});
        const input: FileLoaderMap<{}> = {
            "https://mockurl.com/src/components/layout/Expandable/localization/en.txlns.ts": enLoader,
            "https://mockurl.com/src/components/layout/Expandable/localization/es.txlns.ts": esLoader,
        }

        const actual = toLocalizationFileLoaderMap(input);

        expect(actual).toEqual({
            "en": {
                cacheKey: "https://mockurl.com/src/components/layout/Expandable/localization/en.txlns.ts",
                loader: enLoader
            },
            "es": {
                cacheKey: "https://mockurl.com/src/components/layout/Expandable/localization/es.txlns.ts",
                loader: esLoader
            }
        })
    })

    it("should ignore FileLoaderMap properties whose key does not include a locale-like string in the expected location", () => {
        const enLoader = () => Promise.resolve({});
        const esLoader = () => Promise.resolve({});
        const input: FileLoaderMap<{}> = {
            "https://mockurl.com/src/components/layout/Expandable/localization/en.txlns.ts": enLoader,
            "https://mockurl.com/src/components/layout/Expandable/localization/es.txlns.ts": esLoader,
            "https://mockurl.com/src/components/layout/Expandable/wrongFileNameAndLocation.ts": () => Promise.resolve({}),
        }

        const actual = toLocalizationFileLoaderMap(input);
        expect(actual).toEqual({
            "en": {
                cacheKey: "https://mockurl.com/src/components/layout/Expandable/localization/en.txlns.ts",
                loader: enLoader
            },
            "es": {
                cacheKey: "https://mockurl.com/src/components/layout/Expandable/localization/es.txlns.ts",
                loader: esLoader
            }
        })
        expect(Object.keys(actual).length).toBe(2);
    })

    it("should return an empty object when an empty object is the input", () => {
        expect(toLocalizationFileLoaderMap({})).toEqual({});
    });

    describe.each`
        description         | input
        ${ "undefined" }    | ${undefined as any}
        ${ "null" }         | ${null as any}
        ${ "NaN" }          | ${NaN as any}
        ${ "Infinity" }     | ${Infinity as any}
        ${ "Array" }        | ${[]}
    `("invalid inputs", ({description, input}) => {
        it(`should throw an error for invalid input ${description}`, () => {
            expect(() => toLocalizationFileLoaderMap(input)).toThrowError();
        })
    })
})