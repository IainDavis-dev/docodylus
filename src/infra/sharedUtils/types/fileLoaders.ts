export type FileLoader<T> = () => Promise<T>;

/**
 * Type describing the response object returned by import.meta.glob
 */
export type FileLoaderMap<T> = Record<string, () => Promise<T>>