import { I18nContext } from "@i18n/context/I18nContext";
import LocaleAwarePolyglot from "@i18n/LocaleAwarePolyglot/LocaleAwarePolyglot";
import { useContext, useEffect, useState } from "react";

// default instance serves DEFAULT_LOCALE in the absence of an explicit Provider
let fallbackPolyglot: LocaleAwarePolyglot;

interface UseTranslationsResponse {
    t: LocaleAwarePolyglot['t'];
    isLoading: boolean;
}

const useTranslations = (translationsSrc: URL): UseTranslationsResponse  => {
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
        t: i18n.t.bind(i18n),
        isLoading
    }
}

export default useTranslations;
