import React from "react";
import { useEffect } from "react";

const stylesheetLinkId = 'iaindavis-dev.docodylus.storybook.dynamic-framework-styles';

const styleSheets = {
    default: null,
    docusaurus: '/.storybook/assets/styles/docusaurus_global.css'
} as const;

const applyStyleSheet = (stylesheetUrl) => {
    const existingLink = document.getElementById(stylesheetLinkId);

    if(!stylesheetUrl) {
        existingLink?.remove(); // restore defaults
    }

    if (existingLink instanceof HTMLLinkElement) {
        existingLink.href = stylesheetUrl; // replace existing styles
    } else {
        const link = document.createElement('link'); // create new dynamic-styles link
        link.rel = 'stylesheet';
        link.id = stylesheetLinkId;
        link.href = stylesheetUrl;
        document.head.appendChild(link);
    }
}

const frameworkStylesDecorator = (Story, context) => {
    const { frameworkStyles } = context.globals;

    useEffect(() => {
        const styleSheetUrl = styleSheets[frameworkStyles];
        applyStyleSheet(styleSheetUrl);
    }, [frameworkStyles])
    
    return <Story />
};

export default frameworkStylesDecorator;
