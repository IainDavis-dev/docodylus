import { createContext } from 'react';
import { LocaleAwarePolyglot } from '@i18n/polyglot/LocaleAwarePolyglot';
import type { ValidLocale } from '@i18n/validation';

export interface I18nContextValue {
    i18n: LocaleAwarePolyglot;
    currentLocale: ValidLocale;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
