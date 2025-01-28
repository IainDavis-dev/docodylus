import { BASE_NAMESPACE } from "@i18n/consts";
import { FQTxlns } from "@i18n/types";
import { createNamespacePrepender } from "@i18n/utils/createNamespacePrepender";

export const ExpandableNamespace = `${BASE_NAMESPACE}.layout.expandable` as const;
export const prependNamespace = createNamespacePrepender(ExpandableNamespace);

export type ExpandableLocalizedStrings = FQTxlns<typeof ExpandableNamespace, {
    expandPrompt: string
    collapsePrompt: string
}>

export const namespacer = (raw: string) => `${ExpandableNamespace}.${raw}`;
