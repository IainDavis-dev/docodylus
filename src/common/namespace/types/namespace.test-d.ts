import { describeTypeTest } from '@test-utils/testGroups';
import { ValidNamespace } from '@namespace/types';

describeTypeTest('type ValidNamespace', () => {
  describe('valid namespace strings', () => {
    it('should accept a string of a signle lowercase alpha', () => {
      expectTypeOf<ValidNamespace<'a'>>().not.toBeNever();
    });

    it('should accept a string of all lowercase alpha', () => {
      expectTypeOf<ValidNamespace<'abcde.fghij.klmnop'>>().not.toBeNever();
    });

    it('should accept a string of all alpha lowercase alpha segments delimited by single dots', () => {
      expectTypeOf<ValidNamespace<'abcde.fghij.klmnop'>>().not.toBeNever();
    });

    it('should accept a single-letter namespace', () => {
      // but don't do this.
      expectTypeOf<ValidNamespace<'abcde.fghij.klmnop'>>().not.toBeNever();
    });
  });

  describe('invalid namespace strings', () => {
    it('should reject a string that starts with a dot', () => {
      expectTypeOf<ValidNamespace<'.invalid'>>().toBeNever();
    });

    it('should reject a string that ends with a dot', () => {
      expectTypeOf<ValidNamespace<'invalid.'>>().toBeNever();
    });

    it('should reject a string with consecutive dots', () => {
      expectTypeOf<ValidNamespace<'invalid..invalid'>>().toBeNever();
    });

    it('should reject a string of uppercase characters', () => {
      expectTypeOf<ValidNamespace<'ABCD'>>().toBeNever();
    });

    it('should reject a string of numbers', () => {
      expectTypeOf<ValidNamespace<'12345'>>().toBeNever();
    });

    it('should reject a string of special characters', () => {
      expectTypeOf<ValidNamespace<'@#$'>>().toBeNever();
    });

    it('should reject a string of emojis', () => {
      expectTypeOf<ValidNamespace<'🚀✨💡'>>().toBeNever();
    });

    it('should reject a string of whitespace', () => {
      expectTypeOf<ValidNamespace<' '>>().toBeNever();
      expectTypeOf<ValidNamespace<'\n'>>().toBeNever();
      expectTypeOf<ValidNamespace<'\t'>>().toBeNever();
      expectTypeOf<ValidNamespace<'\r'>>().toBeNever();
      expectTypeOf<ValidNamespace<'\f'>>().toBeNever();
      expectTypeOf<ValidNamespace<'\u00A0'>>().toBeNever();
    });

    it('should reject a string that mixes allowed characters with disallowed characters', () => {
      expectTypeOf<ValidNamespace<'abc.DEF'>>().toBeNever();
      expectTypeOf<ValidNamespace<'abc.123'>>().toBeNever();
      expectTypeOf<ValidNamespace<'abc.@#$'>>().toBeNever();
      expectTypeOf<ValidNamespace<'abc def'>>().toBeNever();
      expectTypeOf<ValidNamespace<'abc\tdef'>>().toBeNever();
      expectTypeOf<ValidNamespace<'abc\ndef'>>().toBeNever();
      expectTypeOf<ValidNamespace<'abc.🚀✨💡'>>().toBeNever();
    });

    it('should reject an empty string', () => {
      expectTypeOf<ValidNamespace<''>>().toBeNever();
    });
  });

  describe('non-string types', () => {
    it('should reject a null value', () => {
      expectTypeOf<null>().not.toMatchTypeOf<ValidNamespace<string>>();
    });

    it('should reject an undefined value', () => {
      expectTypeOf<undefined>().not.toMatchTypeOf<ValidNamespace<string>>();
    });

    it('should reject NaN', () => {
      expectTypeOf<typeof NaN>().not.toMatchTypeOf<ValidNamespace<string>>();
    });

    it('should reject Infinity', () => {
      expectTypeOf<typeof Infinity>().not.toMatchTypeOf<ValidNamespace<string>>();
    });

    it('should reject a non-string number', () => {
      expectTypeOf<123>().not.toMatchTypeOf<ValidNamespace<string>>();
    });

    it('should reject an object', () => {
      expectTypeOf<object>().not.toMatchTypeOf<ValidNamespace<string>>();
    });

    it('should reject an array', () => {
      expectTypeOf<[]>().not.toMatchTypeOf<ValidNamespace<string>>();
    });
  });
});
