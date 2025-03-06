import { JSX } from 'react';
import { StoryContext } from '@storybook/react';
import I18nProvider from '../../../src/infra/i18n/context/I18nProvider';

const localeDecorator = (Story: () => JSX.Element, context: StoryContext) => (
    <I18nProvider locale={context.globals.locale} >
        <Story />
    </I18nProvider>
)

export default localeDecorator;
