import { DocodylusTypeError } from '@error';
import { describeUnitTest } from "@test-utils/testGroups";
import { expect, it } from "vitest";

import { newInvalidNamespaceError } from "./newInvalidNamespaceError";

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
