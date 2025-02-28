import { DEFAULT_LOCALE } from "@i18n/consts";
import LocaleAwarePolyglot from "@i18n/LocaleAwarePolyglot";
import { I18nContextValue, ValidLocale } from "@i18n/types";
import { PropsWithChildren, useMemo } from "react";
import { I18nContext } from "./I18nContext";
import { isValidLocale } from "@i18n/utils/validateLocale";
import { newInvalidLocaleError } from "@error/DocodylusTypeError";

interface I18nProviderProps {
    locale?: ValidLocale;
}

const I18nProvider: React.FC<PropsWithChildren<I18nProviderProps>> = ({
    locale = DEFAULT_LOCALE,
    children
}) => {

    if(!isValidLocale(locale)) throw newInvalidLocaleError(locale);

    const polyglotInstance = useMemo( () =>
        new LocaleAwarePolyglot(
            undefined, // let LocaleAwarePolyglot instantiate Polyglot
            { locale }
        ),
        [] // instantiate Polyglot only once per Provider
    );

    const value: I18nContextValue = {
        i18n: polyglotInstance,
        currentLocale: locale
    }

    polyglotInstance.setLocale(locale);
    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
}

export default I18nProvider;