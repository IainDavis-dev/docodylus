import { DEFAULT_TRANSLATIONS } from "@i18n/consts";
import { I18nContext } from "@i18n/context/I18nContext";
import LocaleAwarePolyglot from "@i18n/LocaleAwarePolyglot/LocaleAwarePolyglot";
import { PolyglotOptions } from "node-polyglot";
import { useContext, useEffect, useState } from "react";

// default instance serves DEFAULT_LOCALE in the absence of an explicit Provider
let fallbackPolyglot: LocaleAwarePolyglot;

type DefaultTranslationKey = keyof typeof DEFAULT_TRANSLATIONS['en'];

interface UseTranslationsResponse<T extends string = never> {
    t: (key: T | DefaultTranslationKey, options?: PolyglotOptions) => string;
    isLoading: boolean;
}

const useTranslations = <T extends string = never>(translationsSrc: URL): UseTranslationsResponse<T>  => {
    const context = useContext(I18nContext) ?? { i18n: fallbackPolyglot ??= new LocaleAwarePolyglot()};

    const { i18n = fallbackPolyglot } = context;
    const [ isLoading, setIsLoading ] = useState(true);
    
    useEffect(() => {
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
