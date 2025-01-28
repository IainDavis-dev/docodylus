import { ExpandableLocalizedStrings, prependNamespace } from ".";

const translations: Partial<ExpandableLocalizedStrings> = prependNamespace({
    expandPrompt: 'mostrar mas...',
    collapsePrompt: 'mostrar menos',
});

export default translations;