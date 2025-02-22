import { DEFAULT_LOCALE } from "@i18n/consts";
import LocaleAwarePolyglot from "@i18n/LocaleAwarePolyglot/LocaleAwarePolyglot";
import { I18nContextValue, ValidLocale } from "@i18n/types";
import Polyglot from "node-polyglot";
import { PropsWithChildren, useMemo } from "react";
import { I18nContext } from "./I18nContext";
import { isValidLocale } from "@i18n/utils/validateLocale";

interface I18nProviderProps {
    locale?: ValidLocale;
}

const I18nProvider: React.FC<PropsWithChildren<I18nProviderProps>> = ({
    locale = DEFAULT_LOCALE,
    children
}) => {

    if(!isValidLocale(locale)) {
        throw new Error(
            `Unsupported locale: ${locale}. The list of valid locales is based on the "locale-codes" library. See: https://www.npmjs.com/package/locale-codes`
        );
    }

    const polyglotInstance = useMemo( () =>
        new LocaleAwarePolyglot(
            new Polyglot({ locale: locale }),
            {}
        ),
        [] // instantiate Polyglot only once
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