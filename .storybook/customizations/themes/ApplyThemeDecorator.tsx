import { JSX, useEffect } from "react";
import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming'
import {StoryContext} from '@storybook/react'

const applyThemeDecorator = (Story: () => JSX.Element, context: StoryContext): JSX.Element => {
    const theme: keyof typeof themes = context?.globals?.theme ?? 'light'

    useEffect(() => {
        const themeRoot = document.querySelector('html');
        themeRoot && themeRoot.setAttribute('data-theme', theme);
        addons.setConfig({ theme: themes[theme] })
    }, [theme])

    return <Story />
}

export default applyThemeDecorator;