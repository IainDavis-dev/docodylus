import { DEFAULT_LOCALE } from "@i18n/consts";
import { ValidLocale } from "@i18n/types";

export function negotiateLocales(requestedLocale: ValidLocale, availableLocales: ValidLocale[]): ValidLocale[] {
    const negotiatedLocales = availableLocales.filter((locale) => requestedLocale.startsWith(locale))
    return [
        DEFAULT_LOCALE,
        ...negotiatedLocales
    ];
}
