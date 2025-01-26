/** @type { import('@storybook/react').Preview } */
import locale from './toolbar/locale/LocaleGlobal';

const preview = {
  initialGlobals: {
    locale: 'en', // default
  },
  globalTypes: {
    locale,
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
  (Story) => (
    <>
      <Story />
    </>
  )
]

export default preview;
