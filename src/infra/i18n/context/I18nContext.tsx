import { DEFAULT_LOCALE } from "@i18n/consts";
import LocaleAwarePolyglot from "@i18n/LocaleAwarePolyglot/LocaleAwarePolyglot";
import { I18nContextValue, SupportedLocale } from "@i18n/types";
import Polyglot from "node-polyglot";
import { createContext, PropsWithChildren, useEffect, useMemo, useState } from "react";

export const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
    locale?: SupportedLocale;
}

export const I18nProvider: React.FC<PropsWithChildren<I18nProviderProps>> = ({
    locale = DEFAULT_LOCALE,
    children
}) => {
    const polyglotInstance = useMemo(
        () =>
            new LocaleAwarePolyglot(
                new Polyglot({locale: locale || DEFAULT_LOCALE}),
                {}
            ),
        []
    );

    const [currentLocale, setCurrentLocale] = useState<SupportedLocale>(locale);

    useEffect(() => {
        setCurrentLocale(locale);
        if(polyglotInstance) { polyglotInstance.locale(locale) }
    }, [currentLocale])

    const value = useMemo(
        () => ({
            i18n: polyglotInstance,
            currentLocale: currentLocale,
        }),
        [currentLocale]
    )

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
}

