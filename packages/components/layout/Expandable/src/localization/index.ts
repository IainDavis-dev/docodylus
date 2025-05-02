import { BASE_NAMESPACE } from '@docodylus/consts-internal';
import { createNamespacePrepender } from '@docodylus/namespace-internal';
import { Namespaced } from '@docodylus/namespace-internal';
import {} from '@docodylus/i18n-extend'

export const ExpandableNamespace = `${BASE_NAMESPACE}.layout.expandable` as const;
export const prependNamespace = createNamespacePrepender(ExpandableNamespace);

export type ExpandableLocalizedStrings = Namespaced<typeof ExpandableNamespace, {
    expandPrompt: string
    collapsePrompt: string
}>

declare module '@docodylus/i18n-extend' {
    export interface DocodylusLocalizedStrings extends ExpandableLocalizedStrings {}
}
