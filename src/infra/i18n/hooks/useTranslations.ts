import { DEFAULT_TRANSLATIONS, LOADING_KEY } from "@i18n/consts";
import { I18nContext } from "@i18n/context/I18nContext";
import LocaleAwarePolyglot from "@i18n/LocaleAwarePolyglot/LocaleAwarePolyglot";
import { asValidLocale, ProvidedLocales, Txlns } from "@i18n/types";
import { PolyglotOptions } from "node-polyglot";
import { useContext, useEffect, useMemo, useState } from "react";

// default instance serves DEFAULT_LOCALE in the absence of an explicit Provider
let fallbackPolyglot: LocaleAwarePolyglot;

type DefaultTranslationKey = keyof typeof DEFAULT_TRANSLATIONS['en'];
type LoadingState = 'not-loaded' | 'loading' | 'success' | 'error';
type TWrapper<T> = (key: T | DefaultTranslationKey, options?: PolyglotOptions) => string;

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
const useTranslations = <T extends Txlns = never>(providedLocales: ProvidedLocales<T>): TWrapper<keyof T>  => {
    const context = useContext(I18nContext) ?? { i18n: fallbackPolyglot ??= new LocaleAwarePolyglot()};

    const { i18n = fallbackPolyglot } = context;
    const  locale = i18n.getLocale();

    const [loadingStates, setLoadingStates] = useState<Record<string, LoadingState>>(() => Object.create(null))

    const negotiatedLocales = Object.entries(providedLocales).reduce<ProvidedLocales<T>>(
        (negotiated, [key, val]) => locale.startsWith(key) ? {...negotiated, [key]: val} : negotiated,
        {}
    )
    
    useEffect(() => {
        Object.entries(negotiatedLocales)
            .filter(([_, { cacheKey }]) => {
                const currentState: LoadingState = loadingStates[cacheKey] ?? 'not-loaded';
                return !['loading', 'success', 'error'].includes(currentState);
            // map here, rather than forEach, to ensure loaders run synchronously
            }).map(([locale, { cacheKey, loader }]) => {
                const wrappedLoader = async () => {
                    setLoadingStates((prev) => ({ ...prev, [cacheKey]: 'loading'}));
                    const validLocale = asValidLocale(locale)
                    if(!validLocale) return

                    try {
                        const localizedStrings = (await loader()).default as unknown as T;
                        setLoadingStates((prev) => ({ ...prev, [cacheKey]: 'success'}));
                        i18n.extend(validLocale, localizedStrings);
                    } catch (error) {
                        console.error(`Failed to load translations from ${cacheKey}:`, error);
                        setLoadingStates((prev) => ({ ...prev, [cacheKey]: 'error' }))
                    }
                }
                wrappedLoader();
            })
        }, [locale, providedLocales]);

    const usePlaceholderText = Object.entries(negotiatedLocales).some(([locale, { cacheKey }]) => {
        const currentLoadingState = loadingStates[cacheKey];
        return ['not-loaded', 'loading'].includes(currentLoadingState);
    })

    const tWrapper: TWrapper<keyof T> = useMemo(() =>
        (key, options) => usePlaceholderText ? i18n.t(LOADING_KEY) : i18n.t(key as string, options),
        [usePlaceholderText] // no need to continually re-create this function
    );

    return tWrapper;
}

export default useTranslations;
