import { describeUnitTest } from "@test-utils/testGroups";
import { isValidNamespace } from "@validation/types";

describeUnitTest.each`
    input                       | isValid
    ${"t"}                      | ${true}
    ${"test"}                   | ${true}
    ${"test.namespace"}         | ${true}
    ${"longer.test.namespace"}  | ${true}
    ${".invalid"}               | ${false}
    ${"invalid."}               | ${false}
    ${"invalid..invalid"}       | ${false}
    ${"ABC"}                    | ${false}
    ${"123"}                    | ${false}
    ${"#$%"}                    | ${false}
    ${"🚀✨💡"}                  | ${false}
    ${' '}                      | ${false}
    ${'\t'}                     | ${false}
    ${'\n'}                     | ${false}
    ${'\r'}                     | ${false}
    ${'\f'}                     | ${false}
    ${'\u00A0'}                 | ${false}
    ${'abc.DEF'}                | ${false}
    ${'abc.123'}                | ${false}
    ${'abc.@#$'}                | ${false}
    ${'abc def'}                | ${false}
    ${'abc\tdef'}               | ${false}
    ${'abc\ndef'}               | ${false}
    ${'abc.🚀✨💡'}              | ${false}
    ${null}                     | ${false}
    ${undefined}                | ${false}
    ${NaN}                      | ${false}
    ${Infinity}                 | ${false}
    ${123}                      | ${false}
    ${[]}                       | ${false}
    ${{}}                       | ${false}

`("isValidNamespace", ({input, isValid}) => {
    it(`"${input}" is ${isValid ? 'a valid' : 'an invalid'} namespace`, () => {
        expect(isValidNamespace(input)).toBe(isValid);
    })
})
