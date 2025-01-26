import { BASE_NAMESPACE } from '@i18n/consts'
import { Txlns } from '@i18n/types'
import { isNoWhitespaceString, NoWhitespaceString } from "@validation/string"

type FQNamespace<NS extends string> = `${typeof BASE_NAMESPACE}.${NS}`

type FQTxlns<NS extends string, T extends Txlns> = {
    [K in keyof T as `${FQNamespace<NS>}.${string & K}`]: T[K]
}

type NamespacePrepender<NS extends string> = <T extends Txlns>(translations: T) =>  FQTxlns<NS, T>

/**
 * Factory function for creating a namespace prepender. Prepended
 * namespaces are of the format `${BASE_NAMESPACE}.${localNamespace}.${key}`
 * 
 * @see {@link BASE_NAMESPACE}
 * 
 * @param localNamespace - The local namespace to prepend to all translation keys.
 * @returns A function that accepts translations and returns namespaced translations.
 */
export const createNamespacePrepender = <NS extends NoWhitespaceString<string>>(localNamespace: NS): NamespacePrepender<NS> => {

    if(!localNamespace || !isNoWhitespaceString(localNamespace)) {
        // we expect Typescript to prevent this, but just in case somebody gets past the compile-time checks...
        console.warn(new Error(`No namespace or invalid namespace ${localNamespace} provided. Must be non-empty and contain no whitespace`))
    }

    return (translations) => {
        return Object.entries(translations).reduce<FQTxlns<NS, typeof translations>>(
            (mapped, [key, value]) => ({
                ...mapped,
                [`${BASE_NAMESPACE}.${localNamespace.toLowerCase()}.${key}`]: value
            }),
            {} as FQTxlns<NS, typeof translations>
        )}
}
