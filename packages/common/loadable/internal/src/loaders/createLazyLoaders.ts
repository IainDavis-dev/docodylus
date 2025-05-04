import { DocodylusTypeError } from '@docodylus/error-internal'
export type LazyLoader<T = unknown> = () => Promise<T>;
export type LazyLoaders<T = unknown> = Record<string, LazyLoader<T>>;

// runtime check for valid URL array (or empty-ish value)
function validateUrls (urls?: unknown): urls is URL[] | null | undefined {
    return (urls != null) 
        ? Array.isArray(urls) && urls.every((url) => url instanceof URL)
        : true;
};

function identity<T>(x: unknown): T {return x as T};

/**
 * Creates a map of lazy imports from an array of URLs. 
 * 
 * @param urls - An array of URLs to be used as keys in the map. 
 * @returns A map where each key is a URL and the value is a function that returns a promise resolving to the module at that URL.
 */
export function createLazyLoaders<T = unknown> (
    urls?: URL[],
    transform: (mod: unknown) => T = identity
): LazyLoaders<T> {
    if (validateUrls(urls)) {
        return Object.fromEntries( (urls ?? []).map((url) => [
            url.toString(),
            async (): Promise<T> => {
                const mod = await import( url.pathname /* vite-ignore */) as unknown
                return transform(mod)
            }
        ]));
    }
    throw new DocodylusTypeError("createLoaders expected an array of URL instances");
}