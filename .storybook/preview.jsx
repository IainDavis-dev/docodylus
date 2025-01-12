/** @type { import('@storybook/react').Preview } */
const supportedLocales = ['en', 'es'];

const preview = {
  initialGlobals: {
    locale: 'en', // default
  },
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: supportedLocales.map((locale) => ({
          value: locale,
          title: locale.toUpperCase(),
        })),
        dynamicTitle: true
      }
    }
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
