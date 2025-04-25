import { JSX } from 'react';
import { StoryContext } from '@storybook/react';
import { I18nProvider } from '@i18n';

const localeDecorator = (Story: () => JSX.Element, context: StoryContext) => (
    <I18nProvider locale={context.globals.locale} >
        <Story />
    </I18nProvider>
)

export default localeDecorator;
