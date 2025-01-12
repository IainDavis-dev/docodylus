import { Txlns } from "@i18n/types";
import { TranslationsProvider, TranslationsProviderResponse } from "./TranslationsProvider";

export const createImportOnceTranslationsProvider = (): TranslationsProvider<URL> => {
    const importedSources = new Set<string>();

    return {
        async load(source: URL): Promise<TranslationsProviderResponse> {
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
                return {
                    translations: undefined,
                    error: err instanceof Error ? err : String(err),
                }
            }
        }
    }
}