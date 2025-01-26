/** @type { import('@storybook/react').Preview } */
import frameworkStyles from './customizations/styles/FrameworkStylesGlobal'
import frameworkStylesDecorator from './customizations/styles/FrameworkStylesDecorator';

import locale from './customizations/locales/LocaleGlobal';
import localeDecorator from './customizations/locales/localeDecorator';

import theme from './customizations/themes/ThemeGlobal';
import applyThemeDecorator from './customizations/themes/ApplyThemeDecorator'

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
