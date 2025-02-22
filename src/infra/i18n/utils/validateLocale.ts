import { type ValidLocale, validLocales } from "@i18n/types/validLocales";

/**
 * User-defined type guard validates a given string against
 * {@link https://www.npmjs.com/package/locale-codes locale-codes}
 * 
 * @param maybeLocale 
 * @returns a boolean indicating whether maybeLocale is a valid BCP 47 locale
 */
export function isValidLocale(maybeLocale: unknown): maybeLocale is ValidLocale {
    return validLocales.some((locale) => locale === maybeLocale);
}
