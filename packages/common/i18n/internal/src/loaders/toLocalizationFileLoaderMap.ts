import type { LazyLoader, LazyLoaders } from '@docodylus/loadable-internal';
import { ValidLocale } from '../validation';

const localeRegex = /\/\S*\/localization\/txlns\/(\S+)\.txlns.ts$/i;

export interface FileLoaderWithCacheKey<T> {
    cacheKey: string,
    loader: LazyLoader<T>
}

export type LocalizationFileLoaderMap<T> = Partial<Record<ValidLocale, FileLoaderWithCacheKey<T>>>;

export function toLocalizationFileLoaderMap<T>(
  fileLoaders: LazyLoaders<T>,
): LocalizationFileLoaderMap<T> {
  if (fileLoaders == null || typeof fileLoaders !== 'object' || Array.isArray(fileLoaders)) throw new Error('Invalid FileLoaderMap');
  return Object.entries(fileLoaders).reduce(
    (mapped, [cacheKey, loader]) => {
      const match = cacheKey.match(localeRegex);
      const locale = match?.[1];

      if (locale === undefined) {
        return mapped;
      }

      return ({
        ...mapped,
        [locale]: {
          cacheKey,
          loader,
        },
      });
    },
        {} as LocalizationFileLoaderMap<T>,
  );
}
