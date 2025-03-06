import { newInvalidNamespaceError } from '@error/DocodylusTypeError';
import { isValidNamespace } from './isValidNamespace';
import { Namespaced, ValidNamespace } from './types';

/**
 * A utility type representing a function that prepends a namespace to the keys of an object.
 *
 * The function accepts an object `record` and produces a new object where each key is prefixed
 * with the specified namespace `NS` followed by a dot (`.`).
 *
 * @template NS - A string representing the namespace to prepend to each key.
 * @template T - The type of the input object, extending `Record<string, unknown>` by default.
 */
type NamespacePrepender<NS extends string> =
    <T extends Record<string, unknown>>(record: T) => Namespaced<NS, T>

/**
 * Factory function for creating a namespace prepender.
 *
 * @param namespace - The local namespace to prepend to all translation keys.
 * @returns {NamespacePrepender} A function that accepts translations
 *      and returns namespaced translations.
 */
export function createNamespacePrepender<NS extends string>(
  namespace: ValidNamespace<NS>,
): NamespacePrepender<NS> {
  if (!isValidNamespace(namespace)) {
    throw newInvalidNamespaceError(`No namespace or invalid namespace "${namespace}". Must be non-empty and contain no whitespace`);
  }

  return (obj) => Object.fromEntries(Object.keys(obj).map((key) => [`${namespace}.${key}`, obj[key]])) as Namespaced<NS, typeof obj>;
}
