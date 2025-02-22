import { isNoWhitespaceString, NoWhitespaceString } from "@validation/types"
import { Namespaced } from "./types"

/**
 * A utility type representing a function that prepends a namespace to the keys of an object.
 * 
 * The function accepts an object `record` and produces a new object where each key is prefixed
 * with the specified namespace `NS` followed by a dot (`.`).
 * 
 * @template NS - A string representing the namespace to prepend to each key.
 * @template T - The type of the input object, extending `Record<string, unknown>` by default.
 */
type NamespacePrepender<NS extends string> = <T extends Record<string, unknown> = Record<string, string>>(record: T) =>  Namespaced<NS, T>

/**
 * Factory function for creating a namespace prepender.
 * 
 * @param namespace - The local namespace to prepend to all translation keys.
 * @returns {NamespacePrepender} A function that accepts translations and returns namespaced translations.
 */
export const createNamespacePrepender = <NS extends NoWhitespaceString<string>>(namespace: NS): NamespacePrepender<NS> => {

    if(!namespace || !isNoWhitespaceString(namespace)) {
        // we expect Typescript to prevent this, but just in case somebody gets past the compile-time checks...
        console.warn(new Error(`No namespace or invalid namespace ${namespace} provided. Must be non-empty and contain no whitespace`))
    }

    return (translations) => {
        return Object.entries(translations).reduce<Namespaced<NS, typeof translations>>(
            (mapped, [key, value]) => ({
                ...mapped,
                [`${namespace.toLowerCase()}.${key}`]: value
            }),
            {} as Namespaced<NS, typeof translations>
        )}
}
