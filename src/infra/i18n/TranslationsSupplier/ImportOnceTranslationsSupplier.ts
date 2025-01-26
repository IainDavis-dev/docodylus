import { Txlns } from "@i18n/types";
import { TranslationsSupplier, TranslationsSupplierResponse } from "./TranslationsSupplier";

/**
 * Creates a {@link TranslationsSupplier} that dynamically loads translation files and ensures
 * each file is imported only once by caching URLs of loaded sources.
 *
 * @returns {TranslationsSupplier<URL>} A translations supplier for managing dynamic imports.
 *
 * @param {URL} source - The URL of the translation file to import.
 * @returns {Promise<TranslationsSupplierResponse>} The result of the translation load operation.
 */
export const createImportOnceTranslationsSupplier = (): TranslationsSupplier<URL> => {
    const importedSources = new Set<string>();

    return {
        async load(source: URL): Promise<TranslationsSupplierResponse> {
            const key = source.toString()

            if (importedSources.has(key)) {
                return {
                    translations: undefined,
                    error: false,
                }
            };

            try {
                const module = await import( /* @vite-ignore */ source.href);
                const translations: Txlns = module.default;

                if (!translations || typeof translations !== "object")  {
                    throw new Error(`Invalid translation format from ${key}`);
                }

                importedSources.add(key);

                return {
                    translations,
                    error: false,
                }
            } catch (err) {
                console.error(`failed to load i18n translations from '${key}'`, err)
                return {
                    translations: undefined,
                    error: err instanceof Error ? err : String(err),
                }
            }
        }
    }
}
