import { ValidLocale, asValidLocale } from "@i18n/types"

interface CacheKeyParams {
    filepath: string;
    requestedLocale: ValidLocale;
}

export type NegotiatedLocaleCacheKey = `${string}-${ValidLocale}`;

export const createNegotiatedLocaleCacheKey = ({ filepath, requestedLocale}: CacheKeyParams): NegotiatedLocaleCacheKey => {
    return `${filepath}|${requestedLocale}` as NegotiatedLocaleCacheKey
}

const localeRegex = /\/localization\/(\S+)\.txlns.ts$/i;

export const getProvidedLocales = <T>(importMeta: Record<string, () => Promise<Partial<T>>>
) => {
    return Object.entries(importMeta).reduce(
        (mapped, [relativePath, loader]) => {
            const match = relativePath.match(localeRegex);
            const locale = asValidLocale(match?.[1] ?? 'invalid');
    
            if(!locale) {
                return mapped;
            } else {
                return ({
                    ...mapped,
                    [locale as ValidLocale]: {
                        cacheKey: new URL(relativePath, import.meta.url).href,
                        loader,
                    }
                });
            }
        },
        {},
    )
}
