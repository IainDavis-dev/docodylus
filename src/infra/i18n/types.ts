import { BASE_NAMESPACE, SUPPORTED_LOCALES } from "./consts"
import LocaleAwarePolyglot from "./LocaleAwarePolyglot/LocaleAwarePolyglot"

// translations map type
export type Txlns = Record<string, string>

// fully-qualified namespace type
export type FQNamespace<NS extends string> = `${typeof BASE_NAMESPACE}.${NS}`

// translations map with fully-qualified namespaced keys type
export type FQTxlns<NS extends string, T extends Txlns> = {
    [K in keyof T as `${FQNamespace<NS>}.${string & K}`]: T[K]
}

// function type for factory's return function
export type NamespacePrepender<NS extends string> = <T extends Txlns>(translations: T) =>  FQTxlns<NS, T>

// set of supported locales, defined in @i18n consts file
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export function isSupportedLocale(value: string): value is SupportedLocale {
    return SUPPORTED_LOCALES.includes(value as any)
}

export interface I18nContextValue {
    i18n: LocaleAwarePolyglot;
    currentLocale: SupportedLocale;
}