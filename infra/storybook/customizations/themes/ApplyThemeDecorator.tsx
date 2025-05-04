import { addons } from '@storybook/manager-api';
import { Decorator } from '@storybook/react'
import { themes } from '@storybook/theming'
import { useEffect } from "react";

type Theme = keyof typeof themes;

const applyThemeDecorator: Decorator = (Story, context) => {
    const theme: Theme = context?.globals?.theme as Theme ?? 'light'

    useEffect(() => {
        const themeRoot = document.querySelector('html');
        if (themeRoot) themeRoot.setAttribute('data-theme', theme);
        addons.setConfig({ theme: themes[theme] })
    }, [theme])

    return <Story />
}

export default applyThemeDecorator;