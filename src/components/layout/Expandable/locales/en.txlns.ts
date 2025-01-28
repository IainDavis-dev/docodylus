import { createNamespacePrepender } from "@i18n/utils/createNamespacePrepender";
import { ExpandableLocalizedStrings, ExpandableNamespace, prependNamespace } from ".";


const translations: ExpandableLocalizedStrings = prependNamespace({
    expandPrompt: 'show more...',
    collapsePrompt: 'show less',
});

export type ExpandableTranslationKey = keyof typeof translations;
export default translations;