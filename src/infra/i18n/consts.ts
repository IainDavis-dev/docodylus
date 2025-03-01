import { createNamespacePrepender } from "../namespace/createNamespacePrepender";
import { Namespaced } from "../namespace/types";
import { LocalizedStrings, ValidLocale } from "./types";

export const BASE_NAMESPACE = "dev.iaindavis.docodylus";
export const DEFAULT_LOCALE: ValidLocale = "en";

export const SUPPORTED_LOCALES: ValidLocale[] = [
    "en",
    "es"
] as const;


/**
 * Set of translations supported without explicitly being imported into LocaleAwarePolglot
 * 
 * Note: translated messages primarily indicate the status of import operations for other translations
 */
const I18nNamespace = "dev.iaindavis.docodylus.internationalization" as const;
const prependNamespace = createNamespacePrepender(I18nNamespace);

type DefaultLocalizedStrings = Namespaced<typeof I18nNamespace, {
    "txlns-loading": string;
}>

export const DEFAULT_TRANSLATIONS: Partial<Record<ValidLocale, DefaultLocalizedStrings>> = {
    ['en']: prependNamespace({ ["txlns-loading"]:  "translations loading..." }),
    ['es']: prependNamespace({ ["txlns-loading"]: "traducciones cargándose..." })
} as const

export const TXLNS_LOADING_KEY: keyof DefaultLocalizedStrings = "dev.iaindavis.docodylus.internationalization.txlns-loading" as const;

// adds localized-string keys for this component to the master list so
// it can be included in user overrides.
declare module "@i18n/types" {
    export interface DocodylusLocalizedStrings extends DefaultLocalizedStrings {}
}
