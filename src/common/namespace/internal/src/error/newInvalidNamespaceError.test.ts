import { describe, expect, it } from "vitest";
import { DocodylusTypeError } from '@docodylus/error-internal';
import { newInvalidNamespaceError } from "./newInvalidNamespaceError";
import { describeUnitTest } from "@test-utils/testGroups";

describeUnitTest('newInvalidNamespaceError', () => {
    it('newInvalidNamespaceError should create an error that reports in invalid namespace', () => {
        const actual = newInvalidNamespaceError('b0gus-n@mespace');
        expect(actual).toBeDefined();
        expect(actual.message).toEqual(expect.any(String));
        expect(actual.details).toEqual(expect.any(String));
        expect(actual.subtype).toBe('InvalidNamespace');
        expect(actual.scope).toBe('namespace');
        expect(actual.reference).toBe(undefined);

        [Error, TypeError, DocodylusTypeError]
        .forEach(
            (type: unknown) => { expect(actual).toBeInstanceOf(type);
        });
        expect(actual.isDocodylusError).toBe(true);
    });
})
