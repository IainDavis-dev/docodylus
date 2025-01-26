import LocaleAwarePolyglot from "@i18n/LocaleAwarePolyglot/LocaleAwarePolyglot";
import { ValidLocale } from "@i18n/types";
import { createContext } from "react";

/**
 * Structure of the value provided by the {@link I18nContext}.
 *
 * @property {LocaleAwarePolyglot} i18n - The Polyglot wrapper instance for managing translations.
 * @property {ValidLocale} currentLocale - The currently active locale.
 */
export interface I18nContextValue {
    i18n: LocaleAwarePolyglot;
    currentLocale: ValidLocale;
}

/**
 * React context for providing internationalization (i18n) support.
 *
 * This context exposes the {@link LocaleAwarePolyglot} instance and the current locale
 * to be consumed across the application.
 */
export const I18nContext = createContext<I18nContextValue | null>(null);
