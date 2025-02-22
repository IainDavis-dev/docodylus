import { LocalizationFileLoaderMap, ValidLocale } from "@i18n/types";
import { FileLoaderMap } from "@shared-utils/types";

const localeRegex = /\/\S*\/localization\/(\S+)\.txlns.ts$/i;

/**
 * Takes the return object from `import.meta.glob`, extracts the
 * locale from the keys, and produces a map from {@link ValidLocale} to {@link LocalizationFileLoaderMap}
 * 
 * Note: expects keys have been transformed to absolute URLS, rather than the relative paths supplied by `import.meta.glob`
 * see Expandable component localization folder for an example of correct usage
 * 
 * @param fileLoaders a {@link FileLoaderMap } for loading localization files
 * @returns a map from {@link ValidLocale} to {@link LocalizationFileLoaderMap}
 */
export const toLocalizationFileLoaderMap = <T>(fileLoaders: FileLoaderMap<T>): LocalizationFileLoaderMap<T> => {
    return Object.entries(fileLoaders).reduce(
        (mapped, [cacheKey, loader]) => {
            const match = cacheKey.match(localeRegex);
            const locale = match?.[1];
    
            if(!locale) {
                return mapped;
            } else {
                return ({
                    ...mapped,
                    [locale]: {
                        cacheKey,
                        loader,
                    }
                });
            }
        },
        {} as LocalizationFileLoaderMap<T>,
    )
}