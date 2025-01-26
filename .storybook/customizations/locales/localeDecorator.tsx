import React from 'react';
import I18nProvider from '../../../src/infra/i18n/context/I18nProvider';

const localeDecorator = (Story, context) => (
    <I18nProvider locale={context.globals.locale} >
        <Story />
    </I18nProvider>
)

export default localeDecorator;
