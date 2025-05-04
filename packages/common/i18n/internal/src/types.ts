import { DocodylusLocalizableStrings } from '@docodylus/i18n-extend';

import { ValidLocale } from './validation';

/**
 *  A map of translation keys to their corresponding localized strings
 */
export type LocalizedStrings = Partial<DocodylusLocalizableStrings>

/**
 * A map of valid locales to their corresponding set of localization strings
 */
export type LocalizedStringsByLocale = {
    [L in ValidLocale]: LocalizedStrings
}
