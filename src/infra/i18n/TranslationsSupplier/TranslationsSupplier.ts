import { Txlns } from "../types";

export interface TranslationsSupplierResponse {
    translations?: Txlns;
    error: string | Error | false;
}

/**
 * A generic interface for supplying translations from a given source.
 * Implementations define how translations are loaded and the type of source they support.
 *
 * @template T - The type of the source (e.g., `URL`, `string`, or other).
 */
export interface TranslationsSupplier<SourceType> {
    /**
     * supply a set of translations
     * 
     * @param source - the originating source of the translations
     * @returns  {TranslationsSupplierResponse} - the result of the load operation
     */
    load: (source: SourceType) => Promise<TranslationsSupplierResponse>;
}

