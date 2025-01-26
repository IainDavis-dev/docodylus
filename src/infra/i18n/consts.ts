import { LocaleLike, Txlns, ValidLocale } from "./types";

export const BASE_NAMESPACE = "iaindavis-dev.docodylus";
export const DEFAULT_LOCALE: ValidLocale = "en" as ValidLocale;

export const SUPPORTED_LOCALES = [
    "en",
    "es"
];

/**
 * Set of translations supported without explicitly being imported into LocaleAwarePolglot
 * 
 * Note: translated messages primarily indicate the status of import operations for other translations
 */
export const DEFAULT_TRANSLATIONS = {
    en: { "iaindavis-dev.docodylus.i18n.txlns-loading":  "translations loading..." },
    es: { "iaindavis-dev.docodylus.i18n.txlns-loading": "traducciones cargándose..." }
} as const satisfies Partial<Record<LocaleLike, Txlns>>;
