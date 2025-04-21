import { BASE_NAMESPACE } from '@docodylus/consts-internal';
import { createNamespacePrepender } from '@docodylus/namespace-internal';
import { Namespaced } from '@docodylus/namespace-internal';

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
