import { SupportedLocale, Txlns } from "./types";

export const BASE_NAMESPACE = "iaindavis-dev.docodylus";
export const DEFAULT_LOCALE: SupportedLocale = "en";

export const SUPPORTED_LOCALES = [
    "en",
    "es"
] as const;

export const DEFAULT_TRANSLATIONS: Partial<Record<SupportedLocale, Txlns>> = {
    en: { "iaindavis-dev.docodylus.i18n.txlns-loading":  "translations loading..." },
    es: { "iaindavis-dev.docodylus.i18n.txlns-loading": "traducciones cargándose..." }
};