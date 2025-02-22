import { LocalizedStrings, ValidLocale } from "./types";

export const BASE_NAMESPACE = "iaindavis-dev.docodylus";
export const DEFAULT_LOCALE: ValidLocale = "en";

export const SUPPORTED_LOCALES = [
    "en",
    "es"
];

/**
 * Set of translations supported without explicitly being imported into LocaleAwarePolglot
 * 
 * Note: translated messages primarily indicate the status of import operations for other translations
 */
export const TXLNS_LOADING_KEY: string = "iaindavis-dev.docodylus.i18n.txlns-loading"
export const DEFAULT_TRANSLATIONS: Partial<Record<ValidLocale, LocalizedStrings>> = {
    ['en']: { [TXLNS_LOADING_KEY]:  "translations loading..." },
    ['es']: { [TXLNS_LOADING_KEY]: "traducciones cargándose..." }
} as const
