import { FileLoader } from "@shared-utils/types";
import { ValidLocale } from "./validLocales"

/**
 *  A map of translation keys to their corresponding localized strings
 */
export type LocalizedStrings = Partial<DocodylusLocalizedStrings>

/**
 * A map of valid locales to their corresponding set of localization strings
 */
export type LocalizedStringsByLocale = {
    [L in ValidLocale]: LocalizedStrings
}

export type LocalizationFileLoaderMap<T> = Partial<Record<ValidLocale, {cacheKey: string, loader: FileLoader<T>}>>;

/**
 * merged interface for aggregating localization strings from all components
 */
export interface DocodylusLocalizedStrings {}