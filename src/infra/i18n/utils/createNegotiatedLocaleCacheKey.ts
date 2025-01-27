import { ValidLocale } from "@i18n/types"

interface CacheKeyParams {
    filepath: string;
    requestedLocale: ValidLocale;
}

export type NegotiatedLocaleCacheKey = `${string}-${ValidLocale}`;

const createNegotiatedLocaleCacheKey = ({ filepath, requestedLocale}: CacheKeyParams): NegotiatedLocaleCacheKey => {
    return `${filepath}|${requestedLocale}` as NegotiatedLocaleCacheKey
}

export default createNegotiatedLocaleCacheKey;