import React, { useEffect } from "react";
import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming'

const applyThemeDecorator = (Story, context) => {
    const { theme='light', frameworkStyles } = context?.globals;

    useEffect(() => {
        const themeRoot = document.querySelector('html');
        themeRoot && themeRoot.setAttribute('data-theme', theme);
        addons.setConfig({ theme: themes[theme] })
    }, [theme])

    return <Story />
}

export default applyThemeDecorator;