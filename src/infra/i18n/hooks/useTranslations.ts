import { DEFAULT_TRANSLATIONS } from "@i18n/consts";
import { I18nContext } from "@i18n/context/I18nContext";
import LocaleAwarePolyglot from "@i18n/LocaleAwarePolyglot/LocaleAwarePolyglot";
import { PolyglotOptions } from "node-polyglot";
import { useContext, useEffect, useState } from "react";

// default instance serves DEFAULT_LOCALE in the absence of an explicit Provider
let fallbackPolyglot: LocaleAwarePolyglot;

type DefaultTranslationKey = keyof typeof DEFAULT_TRANSLATIONS['en'];

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

    const { i18n = fallbackPolyglot } = context;
    const [ isLoading, setIsLoading ] = useState(false);
    
    useEffect(() => {
        setIsLoading(true)
        const load = async () => {
            await i18n.loadTranslations(translationsSrc)
            setIsLoading(false);
        }

        load();
    }, [i18n, translationsSrc])

    return {
        t: (key: T | DefaultTranslationKey, options?: PolyglotOptions) => i18n.t(key as string, options),
        isLoading
    }
}

export default useTranslations;
