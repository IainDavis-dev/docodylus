import { I18nProvider } from '@i18n';
import { Decorator } from '@storybook/react';
import { ValidLocale } from 'packages/common/i18n/internal/dist';

const localeDecorator: Decorator = (Story, context) => (
    <I18nProvider locale={context.globals.locale as ValidLocale} >
        <Story />
    </I18nProvider>
)

export default localeDecorator;
