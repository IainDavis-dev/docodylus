import { createNamespacePrepender } from "@i18n/utils/createNamespacePrepender";
import { ExpandableNamespace } from "../Expandable";

const prependNamespace = createNamespacePrepender(ExpandableNamespace);

const translations = prependNamespace({
    expandPrompt: 'show more...',
    collapsePrompt: 'show less',
});

export type ExpandableTranslationKey = keyof typeof translations;
export default translations;