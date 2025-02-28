import { DocodylusTypeError } from "@error/DocodylusTypeError";
import { createNamespacePrepender } from "@shared-utils/createNamespacePrepender";
import { describeUnitTest } from "@test-utils/testGroups";

describeUnitTest("createNamespacePrepender", () => {
    it("should prepend a namespace to properties of an object", () => {
        const prependTestNamespace = createNamespacePrepender("test.namespace");

        const actual = prependTestNamespace({
            testProp1: "test prop 1",
            testProp2: "test prop 2",
        })

        expect(actual).toEqual({
            "test.namespace.testProp1": "test prop 1",
            "test.namespace.testProp2": "test prop 2",
        })
    })

    describe.each`
        description             | input
        ${'null'}               | ${null}
        ${'undefined'}          | ${undefined}
        ${'NaN'}                | ${NaN}
        ${'Infinity'}           | ${Infinity}
        ${'an object'}          | ${{}}
        ${'an array'}           | ${[]}
        ${'an empty string'}    | ${ '' }
        ${'a string with whitespace'} | ${'abcd efg hij'}
    `("disallowed inputs", ({description, input}) => {
        it(`should catch '${description}' with a runtime check`, () => {
            try {
                // @ts-expect-error
                createNamespacePrepender(input);
            } catch(err) {
                if(err instanceof DocodylusTypeError)  {
                    expect(err.subtype === "InvalidNamespace")
                    expect(err.scope === "namespace")
                } else {
                    assert.fail(`Expected DocodylusTypeError, but got: ${err}`);
                }
            }
        });
    })
});
