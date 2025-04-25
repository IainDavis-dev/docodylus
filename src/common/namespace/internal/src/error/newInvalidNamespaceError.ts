import { DocodylusTypeError } from '@docodylus/error-internal'

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