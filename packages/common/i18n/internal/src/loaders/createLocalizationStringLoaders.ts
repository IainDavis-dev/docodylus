import { createLazyLoaders } from "@docodylus/loadable-internal"; 

import { SUPPORTED_LOCALES } from "../consts";
import { LocalizedStrings } from "../types";
import { LocalizationFileLoaderMap, toLocalizationFileLoaderMap } from ".";

type TxlnsModuleType<T extends LocalizedStrings> = { default: T }

export function createLocalizationStringLoaders<T extends LocalizedStrings>(
    componentFileUrl: URL,
): LocalizationFileLoaderMap<T>  {
    const baseDir = new URL('./localization/txlns/', componentFileUrl);
    const urls = SUPPORTED_LOCALES.map((locale) => 
        new URL(`./${locale}.txlns.ts`, baseDir),
    );

    const raw = createLazyLoaders<TxlnsModuleType<T>, T>(urls, ({ default: txlns }) => txlns);
    return toLocalizationFileLoaderMap<T>(raw);
}

export type LocalizationStringLoaders<T extends LocalizedStrings> = ReturnType<typeof createLocalizationStringLoaders<T>>