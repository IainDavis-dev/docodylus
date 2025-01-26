import { DEFAULT_LOCALE } from "@i18n/consts";
import LocaleAwarePolyglot from "@i18n/LocaleAwarePolyglot/LocaleAwarePolyglot";
import { LocaleLike, ValidLocale, asValidLocale } from "@i18n/types";
import Polyglot from "node-polyglot";
import { PropsWithChildren, useMemo } from "react";
import { I18nContext, I18nContextValue } from "./I18nContext";

/**
 * Props for the {@link I18nProvider} component.
 *
 * @property {LocaleLike} [locale] - The initial locale for the provider. Defaults to {@link DEFAULT_LOCALE}.
 */
interface I18nProviderProps {
    locale?: LocaleLike;
}

/**
 * React provider component for internationalization (i18n).
 *
 * This component initializes the {@link LocaleAwarePolyglot} instance with the specified or default locale
 * and provides it along with the current locale to the application via the {@link I18nContext}.
 *
 * @param {I18nProviderProps} props - The props for the provider.
 * @returns {JSX.Element} The context provider wrapping the children components.
 */
const I18nProvider: React.FC<PropsWithChildren<I18nProviderProps>> = ({
    locale = DEFAULT_LOCALE,
    children
}) => {
    const validLocale: ValidLocale = useMemo(
        () => asValidLocale(locale) ?? DEFAULT_LOCALE,
        [locale]  // don't revalidate the same locale on every render
    )

    const polyglotInstance = useMemo( () =>
        new LocaleAwarePolyglot(
            new Polyglot({ locale: validLocale }),
            {}
        ),
        [] // instantiate Polyglot only once
    );

    const value: I18nContextValue = {
        i18n: polyglotInstance,
        currentLocale: validLocale
    }

    polyglotInstance.setLocale(validLocale);
    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
}

export default I18nProvider;