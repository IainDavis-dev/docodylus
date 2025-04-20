import { DocodylusTypeError } from '@docodylus/error-internal'
export type LazyLoader<T = unknown> = () => Promise<T>;
export type LazyLoaders<T = unknown> = Record<string, LazyLoader<T>>;

// runtime check for valid URL array (or empty-ish value)
function validateUrls (urls?: unknown): urls is URL[] | null | undefined {
    return urls
        ? Array.isArray(urls) && urls.every((url) => url instanceof URL)
        : true;
};

/**
 * Creates a map of lazy imports from an array of URLs. 
 * 
 * @param urls - An array of URLs to be used as keys in the map. 
 * @returns A map where each key is a URL and the value is a function that returns a promise resolving to the module at that URL.
 */
export function createLazyLoaders<T = unknown, R = T> (
    urls?: URL[],
    transform?: (mod: T) => R
): LazyLoaders<R> {
    if (validateUrls(urls)) {
        return Object.fromEntries( (urls ?? []).map((url) => [
            url.toString(),
            async () => {
                const mod = await import( /* vite-ignore */ url.pathname)
                const result = transform ? transform(mod) : mod;
                return result
            }
        ]));
    }
    throw new DocodylusTypeError("createLoaders expected an array of URL instances");
}