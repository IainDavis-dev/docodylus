import { DEFAULT_LOCALE } from "@i18n/consts";
import { ValidLocale } from "@i18n/types";
import { isValidLocale } from "../validateLocale";
import { newExpectedArrayError, newInvalidLocaleError } from "@error/DocodylusTypeError";

type LocaleSort =
    'none'
    | 'sort-for-merge' // default locale first, then shortest-to-longest

export function negotiateLocales(requestedLocale: ValidLocale, availableLocales: ValidLocale[], sort: LocaleSort = 'none'): ValidLocale[] {
    if(!Array.isArray(availableLocales)) throw newExpectedArrayError("availableLocales", "negotiateLocales");
    if(!isValidLocale(requestedLocale)) throw newInvalidLocaleError(requestedLocale);

    const negotiatedLocales = availableLocales.filter((locale) => requestedLocale.startsWith(locale))
    switch(sort){
        case 'none':
            return [
                DEFAULT_LOCALE,
                ...negotiatedLocales
            ]
        case 'sort-for-merge':
            return [
                DEFAULT_LOCALE,
                ...negotiatedLocales.sort((a, b) => a.length - b.length)
            ]

    }
}
