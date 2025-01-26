import { DEFAULT_TRANSLATIONS, LOADING_KEY } from "@i18n/consts";
import { I18nContext } from "@i18n/context/I18nContext";
import LocaleAwarePolyglot from "@i18n/LocaleAwarePolyglot/LocaleAwarePolyglot";
import { PolyglotOptions } from "node-polyglot";
import { useContext, useEffect, useMemo, useState } from "react";

// default instance serves DEFAULT_LOCALE in the absence of an explicit Provider
let fallbackPolyglot: LocaleAwarePolyglot;

type DefaultTranslationKey = keyof typeof DEFAULT_TRANSLATIONS['en'];
type LoadingState = 'not-loaded' | 'loading' | 'success' | 'error';

/**
 * The response object returned by the {@link useTranslations} hook.
 *
 * @template T - Additional translation keys specific to the component.
 *
 * @property {(key: T | DefaultTranslationKey, options?: PolyglotOptions) =>
 * string} t - A function to retrieve translated strings by key. Note: this
 * is a wrapper around Polyglot.t that provides additional type-safety and
 * code-completion
 * @property {boolean} isLoading - Indicates whether the translations are currently being loaded.
 */
interface UseTranslationsResponse<T extends string = never> {
    t: (key: T | DefaultTranslationKey, options?: PolyglotOptions) => string;
    isLoading: boolean;
}

/**
 * A React hook that ensures translations are loaded into
 * {@link LocaleAwarePolyglot} before translations are invoked.
 * 
 * @template T - Type representing the translation keys. Used only to provide
 * code-completion hints for the set of translations relevant to the compoenent
 *
 * @param {URL} translationsSrc - The URL of the translation file to load.
 * @returns {UseTranslationsResponse<T>} An object containing:
 * - `t`: A function to retrieve translated strings by key.
 * - `isLoading`: A boolean indicating whether translations are currently being loaded.
 */
const useTranslations = <T extends string = never>(translationsSrc: URL): UseTranslationsResponse<T>  => {
    const context = useContext(I18nContext) ?? { i18n: fallbackPolyglot ??= new LocaleAwarePolyglot()};
    const cacheKey = translationsSrc.href;
    const { i18n = fallbackPolyglot } = context;

    const [loadingStates, setLoadingStates] = useState<Record<string, LoadingState>>(() => Object.create(null))
    const currentState: LoadingState = loadingStates[cacheKey] ?? 'not-loaded';
    const isLoading = currentState === 'loading';

    
    useEffect(() => {
        // short circuit if we've already attempted loading the file.
        // may be valuable later to add retry logic on error
        if (['loading', 'success', 'error'].includes(currentState)) return;

        setLoadingStates((prev) => ({ ...prev, [cacheKey]: 'loading'}))

        const load = async () => {
            try {
                const module = await import( /* @vite-ignore */ cacheKey)
                const translations = module.default;

                if(!translations || typeof translations !== 'object') {
                    throw new Error(`Invalid translations format from ${cacheKey}`);
                }

                i18n.extend(translations);

                setLoadingStates((prev) => ({ ...prev, [cacheKey]: 'success'}))
            } catch(error) {
                console.error(`Failed to load translations from ${cacheKey}:`, error);
                setLoadingStates((prev) => ({ ...prev, [cacheKey]: 'error' }))
            }
        }

        load();
    }, [cacheKey])

    const usePlaceholderText = currentState === 'not-loaded' || currentState === 'loading';

    const t = useMemo(() =>
        (key: T | DefaultTranslationKey, options?: PolyglotOptions) => usePlaceholderText ? i18n.t(LOADING_KEY) : i18n.t(key as string, options),
        [usePlaceholderText] // no need to continually re-create this function
    );

    return {
        t,
        isLoading
    }
}

export default useTranslations;
