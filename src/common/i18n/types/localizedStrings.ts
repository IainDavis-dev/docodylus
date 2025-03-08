import { FileLoader } from '@shared-utils/types';
import { ValidLocale } from './validLocales';

/**
 * merged interface for aggregating localization strings from all components
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DocodylusLocalizedStrings {}

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

interface FileLoaderWithCacheKey<T> {
    cacheKey: string,
    loader: FileLoader<T>
}

export type LocalizationFileLoaderMap<T> = Partial<Record<ValidLocale, FileLoaderWithCacheKey<T>>>;
