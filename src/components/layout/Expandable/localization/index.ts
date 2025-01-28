import { BASE_NAMESPACE } from "@i18n/consts";
import { Namespaced } from "@i18n/types";
import { createNamespacePrepender } from "@i18n/utils/createNamespacePrepender";

export const ExpandableNamespace = `${BASE_NAMESPACE}.layout.expandable` as const;
export const prependNamespace = createNamespacePrepender(ExpandableNamespace);

export type ExpandableLocalizedStrings = Namespaced<typeof ExpandableNamespace, {
    expandPrompt: string
    collapsePrompt: string
}>
