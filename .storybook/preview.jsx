/** @type { import('@storybook/react').Preview } */
import frameworkStyles from './toolbar/styles/FrameworkStylesGlobal'
import frameworkStylesDecorator from './decorators/styles/FrameworkStylesDecorator/FrameworkStylesDecorator';

import locale from './toolbar/locale/LocaleGlobal';
import localeDecorator from './decorators/locales/localeDecorator';

import theme from './toolbar/theme/ThemeGlobal';
import applyThemeDecorator from './decorators/theme/ApplyThemeDecorator'

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
