/** @type { import('@storybook/react').Preview } */
import localeDecorator from './decorators/locales/localeDecorator';
import frameworkStylesDecorator from './decorators/styles/FrameworkStylesDecorator/FrameworkStylesDecorator';
import locale from './toolbar/locale/LocaleGlobal';
import frameworkStyles from './toolbar/styles/FrameworkStylesGlobal'

const preview = {
  initialGlobals: {
    locale: 'en', // default
  },
  globalTypes: {
    locale,
    frameworkStyles,
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
  localeDecorator
]

export default preview;
