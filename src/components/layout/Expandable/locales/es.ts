import { createNamespacePrepender } from "@i18n/utils/createNamespacePrepender";

const prependNamespace = createNamespacePrepender('layout.expandable');

const translations = prependNamespace({
    expandPrompt: 'mostrar mas...',
    collapsePrompt: 'mostrar menos',
});

export default translations;