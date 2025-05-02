/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { describeUnitTest } from '@test-utils/testGroups';
import {
  DocodylusTypeError,
  newExpectedArrayError,
} from './DocodylusTypeError';
import { describe, expect, it } from 'vitest';

describeUnitTest('DocodylusTypeError', () => {
  it('should be an instance of TypeError', () => {
    const error = new DocodylusTypeError('TEST ERROR');
    expect(error).toBeInstanceOf(TypeError);
  });

  describe.each`
        funcName                        | purpose                               | factoryFunc                   |  args                         | message                | details                  |  subtype              | scope             | reference
        ${'newExpectedArrayError'}      | ${'reports an invalid non-array arg'} | ${newExpectedArrayError}      | ${['mockParam', 'mockFunc']}  |  ${expect.any(String)} | ${undefined}             | ${'InvalidArgument'}  | ${undefined}      | ${undefined}
    `('Concrete Error Factories', ({
    funcName, purpose,
    factoryFunc, args,
    message, details, subtype, scope, reference,
  }) => {
    it(`${funcName} should create an error that ${purpose}`, () => {
      const actual = factoryFunc(...args);
      expect(actual).toBeDefined();
      expect(actual.message).toEqual(message);
      expect(actual.details).toEqual(details);
      expect(actual.subtype).toBe(subtype);
      expect(actual.scope).toBe(scope);
      expect(actual.reference?.href).toBe(reference?.href);
      [Error, TypeError, DocodylusTypeError].forEach((type: unknown) => {
        expect(actual).toBeInstanceOf(type);
      });
      expect(actual.isDocodylusError).toBe(true);
    });
  });
});
