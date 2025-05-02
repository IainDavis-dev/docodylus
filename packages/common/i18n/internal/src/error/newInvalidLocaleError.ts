import { DocodylusTypeError } from '@docodylus/error-internal';

export function newInvalidLocaleError(locale: string): DocodylusTypeError {
  const reference = new URL('https://www.npmjs.com/package/locale-codes');
  return new DocodylusTypeError(
    `Invalid locale: ${locale}.`,
    null,
    {
      scope: 'i18n',
      subtype: 'InvalidLocale',
      reference,
      details: `Valid locales are those supported by library "locale-codes". See ${reference.href}`,
    },
  );
}