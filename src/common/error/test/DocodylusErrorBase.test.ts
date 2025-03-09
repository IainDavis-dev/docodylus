/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DocodylusTypeError } from '@error/types/DocodylusTypeError';
import { describeUnitTest } from '@test-utils/testGroups';

describeUnitTest.each`
        className               | ErrorClass               | subtype
        ${'DocodylusTypeError'} | ${DocodylusTypeError}    | ${'InvalidLocale' /* appropriate values will vary per subclass of DocodylusErrorBase */}
`('DocodylusErrorBase mixin', ({ className, ErrorClass, subtype }) => {
  describe(`subclass | ${className}`, () => {
    it('should be an instance of Error', () => {
      const err = new ErrorClass('Test Message');
      expect(err).toBeInstanceOf(Error);
    });

    it('should be an instance of its own class', () => {
      const err = new ErrorClass('Test Message');
      expect(err).toBeInstanceOf(Error);
    });

    it('should be identifiable as an error originating in Docodylus', () => {
      const err = new ErrorClass('Test Message');
      expect(err.isDocodylusError).toBe(true);
    });

    it('should preserve message and stack', () => {
      const error = new ErrorClass('Test Message');
      expect(error.message).toBe('Test Message');
      expect(error.stack).toBeDefined();
    });

    it('should support optional parameters', () => {
      const error = new ErrorClass(
        'Test Message',
        null,
        {
          subtype,
          scope: 'i18n',
          reference: new URL('https://www.example.com'),
          details: 'Some details',
        },
      );

      expect(error.scope).toBe('i18n');
      expect(error.reference?.href).toBe('https://www.example.com/');
      expect(error.details).toBe('Some details');
    });

    it('should serialize correctly to JSON with all optional params', () => {
      const err = new ErrorClass(
        'Test Message',
        null,
        {
          subtype,
          scope: 'I18n',
          reference: new URL('https://www.example.com'),
          details: 'Some details',
        },
      );

      expect(err.toJSON()).toMatchSnapshot();
    });

    it('should serialize correctly to JSON with no optional params', () => {
      const err = new ErrorClass('Test Message');

      expect(err.toJSON()).toMatchSnapshot();
    });

    it('should format correctly with `toString()` with all params', () => {
      const err = new ErrorClass(
        'Test Message',
        null,
        {
          subtype,
          scope: 'I18n',
          reference: new URL('https://www.example.com'),
          details: 'Some details',
        },
      );

      expect(err.toString()).toMatchSnapshot();
    });

    it('should format correctly with `toString()` with no optional params', () => {
      const err = new ErrorClass('Test Message');

      expect(err.toString()).toMatchSnapshot();
    });
  });
});
