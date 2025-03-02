import { DEFAULT_TRANSLATIONS, TXLNS_LOADING_KEY } from "@i18n/consts";
import { I18nContext } from "@i18n/context/I18nContext";
import LocaleAwarePolyglot from "@i18n/LocaleAwarePolyglot";
import { LocalizationFileLoaderMap, LocalizedStrings, ValidLocale } from "@i18n/types";
import { negotiateLocales } from "@i18n/utils/localeNegotiation/negotiateLocales";
import { PolyglotOptions } from "node-polyglot";
import { useContext, useEffect, useMemo, useState } from "react";

// default instance serves DEFAULT_LOCALE in the absence of an explicit Provider
let fallbackPolyglot: LocaleAwarePolyglot;

type DefaultTranslationKey = keyof typeof DEFAULT_TRANSLATIONS['en'];
type LoadingState = 'not-loaded' | 'loading' | 'success' | 'error';
type TWrapper<T> = (key: T | DefaultTranslationKey, options?: PolyglotOptions) => string;

/**
 * A React hook that ensures localized strings are loaded into
 * {@link LocaleAwarePolyglot} before string localization is attempted.
 * 
 * @template T - Type representing the translation keys. Used only to provide
 * code-completion hints for the set of translations relevant to the component
 *
 * @param {URL} translationsSrc - The URL of the translation file to load.
 * @returns {UseTranslationsResponse<T>} An object containing:
 * - `t`: A function to retrieve translated strings by key.
 * - `isLoading`: A boolean indicating whether translations are currently being loaded.
 */
const useTranslations = <T extends LocalizedStrings = never>(loaderMap: LocalizationFileLoaderMap<T>): TWrapper<keyof T>  => {
    const { i18n } = useContext(I18nContext) ?? { i18n: fallbackPolyglot ??= new LocaleAwarePolyglot()};

    const  locale = i18n.getLocale();

    const [loadingStates, setLoadingStates] = useState<Record<string, LoadingState>>(
        () => Object.create(null)
    )

    const negotiatedLoaders = negotiateLocales(locale, Object.keys(loaderMap) as ValidLocale[])
        .reduce<LocalizationFileLoaderMap<T>>(
            (loaders, locale) => ({...loaders, [locale]: loaderMap[locale]}),
            {}
        );

    useEffect(() => {
        Object.entries(negotiatedLoaders)
            .filter(([_, { cacheKey }]) => {
                const currentState: LoadingState = loadingStates[cacheKey] ?? 'not-loaded';
                return !['loading', 'success', 'error'].includes(currentState);
            // map here rather than forEach, to ensure loaders run in parallel, if possible
            }).map(([locale, { cacheKey, loader }]) => {
                const wrappedLoader = async () => {
                    setLoadingStates((prev) => ({ ...prev, [cacheKey]: 'loading'}));
                    // assuming locale has been pre-validated by `I18nProvider`.
                    // If another avenue into this code is added in future,
                    // we'll need validation here.
                    try {
                        const localizedStrings = (await loader()) as unknown as T;
                        setLoadingStates((prev) => ({ ...prev, [cacheKey]: 'success'}));
                        i18n.extend(locale as ValidLocale, localizedStrings);
                    } catch (error) {
                        console.error(`Failed to load translations from ${cacheKey}:`, error);
                        setLoadingStates((prev) => ({ ...prev, [cacheKey]: 'error' }))
                    }
                }
                wrappedLoader();
            })
        }, [locale, loaderMap]);

    const usePlaceholderText = Object.values(negotiatedLoaders).length > 0 && Object.values(negotiatedLoaders).some(({ cacheKey }) => {
        return ['not-loaded', 'loading'].includes(loadingStates[cacheKey] ?? 'not-loaded') 
    })

    const tWrapper: TWrapper<keyof T> = useMemo(() =>
        (key, options) => {
            return usePlaceholderText ? i18n.t(TXLNS_LOADING_KEY as string) : i18n.t(key as string, options);
        },
        [usePlaceholderText] // no need to continually re-create this function
    );

    return tWrapper;
}

export default useTranslations;
