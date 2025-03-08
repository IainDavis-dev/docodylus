import { JSX, useEffect } from 'react';
import { StoryContext } from '@storybook/react';

const STYLESHEET_LINK_ELEMENT_ID = 'dev.iaindavis.docodylus.storybook.dynamic-framework-styles';

const styleSheets = {
  default: null,
  docusaurus: 'infra/storybook/customizations/styles/docusaurus_global.css',
} as const;

const applyStyleSheet = (stylesheetUrl: string | null) => {
  const existingLink = document.getElementById(STYLESHEET_LINK_ELEMENT_ID);

  if (!stylesheetUrl) {
    existingLink?.remove(); // restore defaults
    return;
  }

  if (existingLink instanceof HTMLLinkElement) {
    existingLink.href = stylesheetUrl; // replace existing styles
  } else if (stylesheetUrl) {
    const link = document.createElement('link'); // create new dynamic-styles link
    link.rel = 'stylesheet';
    link.id = STYLESHEET_LINK_ELEMENT_ID;
    link.href = stylesheetUrl;
    document.head.appendChild(link);
  }
};

export const frameworkStylesDecorator = (Story: () => JSX.Element, context: StoryContext) => {
  const { frameworkStyles } = context.globals;

  useEffect(() => {
    const styleSheetUrl = styleSheets[frameworkStyles as keyof typeof styleSheets];
    applyStyleSheet(styleSheetUrl);
  }, [frameworkStyles]);

  return <Story />;
};
