import { BASE_NAMESPACE } from '@i18n/consts';
import { createNamespacePrepender } from '@namespace/createNamespacePrepender';
import { Namespaced } from '@namespace/types';

export const ExpandableNamespace = `${BASE_NAMESPACE}.layout.expandable` as const;
export const prependNamespace = createNamespacePrepender(ExpandableNamespace);

export type ExpandableLocalizedStrings = Namespaced<typeof ExpandableNamespace, {
    expandPrompt: string
    collapsePrompt: string
}>

declare module '@i18n/types' {
    // this statement aggregates the localized strings type defined in this file
    // with the global list.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DocodylusLocalizedStrings extends ExpandableLocalizedStrings {}
}
