import { createNamespacePrepender } from "@i18n/utils/createNamespacePrepender";

const prependNamespace = createNamespacePrepender('layout.expandable');

const translations = prependNamespace({
    expandPrompt: 'Show more...',
    collapsePrompt: 'Show less',
});

export type ExpandableTranslationKey = keyof typeof translations;
export default translations;