import { Txlns } from '@i18n/types'
import { isNoWhitespaceString, NoWhitespaceString } from "@validation/string"

type FQNamespace<NS extends string> = `${NS}`

type FQTxlns<NS extends string, T extends Txlns> = {
    [K in keyof T as `${FQNamespace<NS>}.${string & K}`]: T[K]
}

type NamespacePrepender<NS extends string> = <T extends Txlns>(translations: T) =>  FQTxlns<NS, T>

/**
 * Factory function for creating a namespace prepender. Prepended
 * namespaces are of the format `${BASE_NAMESPACE}.${localNamespace}.${key}`
 * 
 * @param namespace - The local namespace to prepend to all translation keys.
 * @returns A function that accepts translations and returns namespaced translations.
 */
export const createNamespacePrepender = <NS extends NoWhitespaceString<string>>(namespace: NS): NamespacePrepender<NS> => {

    if(!namespace || !isNoWhitespaceString(namespace)) {
        // we expect Typescript to prevent this, but just in case somebody gets past the compile-time checks...
        console.warn(new Error(`No namespace or invalid namespace ${namespace} provided. Must be non-empty and contain no whitespace`))
    }

    return (translations) => {
        return Object.entries(translations).reduce<FQTxlns<NS, typeof translations>>(
            (mapped, [key, value]) => ({
                ...mapped,
                [`${namespace.toLowerCase()}.${key}`]: value
            }),
            {} as FQTxlns<NS, typeof translations>
        )}
}
