import { BASE_NAMESPACE } from '@i18n/consts';
import { toLocalizationFileLoaderMap } from '@i18n/utils/localeNegotiation';
import type { Namespaced } from '@namespace/types';
import createNamespacePrepender from '@namespace/createNamespacePrepender';
import { LocalizationFileLoaderMap } from '@i18n/types';
import getRawLoaders from './getRawLoaders';

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
 * @returns a map with keys that are aboslute URLs and values which
 *      are functions to dynamically load the files
 */
export function getLocalizedStringLoaders(): LocalizationFileLoaderMap<ExpandableLocalizedStrings> {
  const fileLoaders = getRawLoaders();
  const normalizedFileLoaders = Object.entries(fileLoaders).reduce(
    // URL generation here depends on the location of this file, so we
    // cannot readily externalize this
    (obj, [key, val]) => ({ ...obj, [new URL(key, import.meta.url).href]: val }),
    {},
  );
  return toLocalizationFileLoaderMap<ExpandableLocalizedStrings>(normalizedFileLoaders);
}

declare module '@i18n/types' {
    // this statement aggregates the localized strings type defined in this file
    // with the global list.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DocodylusLocalizedStrings extends ExpandableLocalizedStrings {}
}
