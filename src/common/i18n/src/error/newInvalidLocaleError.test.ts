import { describe, expect, it } from "vitest";
import { DocodylusTypeError } from '@docodylus/error-internal'
import { newInvalidLocaleError } from "./newInvalidLocaleError";
import { describeUnitTest } from "@test-utils/testGroups";

describeUnitTest('newInvalidLocaleError factory', () => {

    it('newInvalidLocaleError should create an error that reports an invalid locale', () => {
        const actual = newInvalidLocaleError('xx-XX');
        expect(actual).toBeDefined();
        expect(actual.message).toEqual(expect.any(String));
        expect(actual.details).toEqual(expect.any(String));
        expect(actual.subtype).toBe('InvalidLocale');
        expect(actual.scope).toBe('i18n');
        expect(actual.reference?.href).toBe(new URL('https://www.npmjs.com/package/locale-codes')?.href);
        [Error, TypeError, DocodylusTypeError].forEach((type: unknown) => {
            expect(actual).toBeInstanceOf(type);
        });
        expect(actual.isDocodylusError).toBe(true);
    });

})