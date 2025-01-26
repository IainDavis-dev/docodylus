import { all as locales } from 'locale-codes'

// locale subtags allowable under BCP 47
type Bcp47Language = `${Lowercase<string>}${Lowercase<string>}`
                | `${Lowercase<string>}${Lowercase<string>}${Lowercase<string>}}`;                          // e.g., "en", "zh", "zho"
type Bcp47Script = `${Uppercase<string>}${Lowercase<string>}${Lowercase<string>}${Lowercase<string>}`;      // e.g., "Latn", "Hant"
type Bcp47Region = `${Uppercase<string>}${Uppercase<string>}`;                                              // e.g., "US", "CN"
type Bcp47Variant = `${Lowercase<string>}`;                                                                 // e.g., "rozaj"
type Bcp47Extension = `u-${string}`;                                                                        // e.g., "u-co-phonebk"
type Bcp47PrivateUse = `x-${string}`;                                                                       // e.g., "x-private"

/**
 * Provides compile-time checking that a string conforms to the formatting rules
 * of BCP 47 
 * 
 * Note: This type does not validate the string actually represents a valid
 * locale, only that it follows the structural rules of BCP 47
 */
export type LocaleLike =  
    | Bcp47Language                                                         // e.g., "en"
    | `${Bcp47Language}-${Bcp47Script}`                                     // e.g., "zh-Hant"
    | `${Bcp47Language}-${Bcp47Region}`                                     // e.g., "en-US"
    | `${Bcp47Language}-${Bcp47Script}-${Bcp47Region}`                      // e.g., "zh-Hant-TW"
    | `${Bcp47Language}-${Bcp47Region}-${Bcp47Variant}`                     // e.g., "sl-rozaj"
    | `${Bcp47Language}-${Bcp47Region}-${Bcp47Extension}`                   // e.g., "de-DE-u-co-phonebk"
    | `${Bcp47Language}-${Bcp47Script}-${Bcp47Region}-${Bcp47Extension}`    // e.g., "zh-Hant-TW-u-co-phonebk"
    | `${Bcp47Language}-${Bcp47PrivateUse}`;                                // e.g., "en-x-private"

/**
 * Branded type representing a BCP 47 locale tag that has been validated at
 * runtime with {@link https://www.npmjs.com/package/locale-codes locale-codes} 
 */
export type ValidLocale = string & { _brand: 'iaindavis-dev.docodylus.i18n.ValidLocale' };

/**
 * User-defined type guard validates a given string against
 * {@link https://www.npmjs.com/package/locale-codes locale-codes}
 * 
 * @param maybeLocale 
 * @returns a boolean indicating whether maybeLocale is a valid BCP 47 locale
 */
export function isValidLocale(maybeLocale: LocaleLike | string): maybeLocale is ValidLocale {
    return locales.some(({tag}) => tag === maybeLocale);
}

/**
 * Converts maybeLocale to ValidLocale on successful validation with
 * {@link https://www.npmjs.com/package/locale-codes locale-codes} 
 * 
 * on successful validation, returns the string as a {@link ValidLocale}
 * 
 * on failure, returns `undefined
 * 
 * @example
 * const locale = asValidLocale('en-US');
 * console.log( locale ? `Locale is valid: ${locale}` : 'Locale is invalid')
 * 
 * @param {LocaleLike | string} maybeLocale  - the locale string to validate and cast
 * @returns {ValidLocale | undefined} - the validated locale or `undefined` if invalid
 */
export function asValidLocale(maybeLocale: LocaleLike | string): ValidLocale | undefined {
    if (isValidLocale(maybeLocale)) {
        return maybeLocale as ValidLocale;
    } else {
        console.warn(`Invalid locale: "${maybeLocale}". Locales should conform to BCP 47.`)
        return undefined;
    }
}

/**
 *  A map of translation keys to their corresponding localized strings
 */
export type Txlns = Record<string, string>
