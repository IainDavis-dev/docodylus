import { DEFAULT_LOCALE } from "@i18n/consts";
import { LocalizedStringsByLocale, LocalizedStrings } from "@i18n/types";

export function mergeLocalizedStrings(map: Partial<LocalizedStringsByLocale>): LocalizedStrings {
    return Object.entries(map)
        .filter(([locale]) => locale !== DEFAULT_LOCALE)
        .toSorted(([aLocale], [bLocale]) => aLocale.length - bLocale.length)
        .reduce<LocalizedStrings>(
            (merged, [, localizedStrings]) => ({...merged, ...localizedStrings}),
            {...(map[DEFAULT_LOCALE] ?? {})} // ensure the merged set falls back to defaults if a string is missing
        )
}