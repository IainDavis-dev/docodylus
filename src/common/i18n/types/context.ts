import { LocaleAwarePolyglot } from '@i18n/LocaleAwarePolyglot';
import { ValidLocale } from '@i18n/types';

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
