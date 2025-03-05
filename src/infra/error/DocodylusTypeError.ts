import DocodylusErrorBase from './types/DocodylusErrorBase';
import { DocodylusErrorParams, DocodylusTypeErrorSubtype } from './types/DocodylusErrorLike';

interface DocodylusTypeErrorParams extends DocodylusErrorParams {
    subtype?: DocodylusTypeErrorSubtype
}

export class DocodylusTypeError extends DocodylusErrorBase(TypeError) {
  constructor(
    message: string,
    cause?: unknown,
    params?: DocodylusTypeErrorParams,
  ) {
    // @ts-expect-error: mixin pattern won't allow us to modify
    // the constructor signature, but the base type does support
    // this signature
    super(message, { cause }, params);
  }
}

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

export function newInvalidNamespaceError(namespace: string): DocodylusTypeError {
  // TODO: add documentation page we can link to in this error
  return new DocodylusTypeError(
    `Invalid namespace: ${namespace}`,
    null,
    {
      subtype: 'InvalidNamespace',
      scope: 'namespace',
      details: 'Namespaces must be dot-delimited groups of lowercase alphabetic characters',
    },
  );
}

export function newExpectedArrayError(parameter: string, funcName: string): DocodylusTypeError {
  return new DocodylusTypeError(
    `function ${funcName} expected array for argument ${parameter}`,
    null,
    { subtype: 'InvalidArgument' },
  );
}
