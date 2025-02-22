import { BASE_NAMESPACE } from "@i18n/consts";
import { getRawLoaders } from "./getRawLoaders";
import { createNamespacePrepender } from "@shared-utils/createNamespacePrepender";
import { Namespaced } from "@shared-utils/types";
import { toLocalizationFileLoaderMap } from "@i18n/utils/localeNegotiation";

export const ExpandableNamespace = `${BASE_NAMESPACE}.layout.expandable` as const;
export const prependNamespace = createNamespacePrepender(ExpandableNamespace);


export type ExpandableLocalizedStrings = Namespaced<typeof ExpandableNamespace, {
    expandPrompt: string
    collapsePrompt: string
}>

/**
 * Takes the map of {relative-URL} -> {translation-file-lazy-loader},
 * and converts the keys so that they are absolute paths which can be
 * used as cache keys
 * 
 * @returns a map with keys that are aboslute URLs and values which are functions to dynamically load the files
 */
export function getLocalizedStringLoaders() {
    const fileLoaders = getRawLoaders();
    const normalizedFileLoaders = Object.entries(fileLoaders).reduce(
        // URL generation here depends on the location of this file, so we
        // cannot readily externalize this
        (obj, [key, val]) => ({...obj, [new URL(key, import.meta.url).href]: val}),
        {}
    );
    return toLocalizationFileLoaderMap<ExpandableLocalizedStrings>(normalizedFileLoaders);
}

// adds localized-string keys for this component to the master list so
// it can be included in user overrides.
declare module "@i18n/types" {
    export interface DocodylusLocalizedStrings extends ExpandableLocalizedStrings {}
}