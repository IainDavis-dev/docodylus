/** @type { import('@storybook/react').Preview } */
import { frameworkStyles } from '@storybook-customizations/styles/FrameworkStylesGlobal';
import { frameworkStylesDecorator } from '@storybook-customizations/styles/FrameworkStylesDecorator';

import locale from '@storybook-customizations/locales/LocaleGlobal';
import localeDecorator from '@storybook-customizations/locales/localeDecorator';

import theme from '@storybook-customizations/themes/ThemeGlobal';
import applyThemeDecorator from '@storybook-customizations/themes/ApplyThemeDecorator'

const preview = {
  globalTypes: {
    locale,
    frameworkStyles,
    theme,
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  frameworkStylesDecorator,
  localeDecorator,
  applyThemeDecorator
]

export default preview;
