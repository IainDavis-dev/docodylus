import { createContext } from 'react';

import { LocaleAwarePolyglot } from '../polyglot/LocaleAwarePolyglot';
import type { ValidLocale } from '../validation';

export interface I18nContextValue {
    i18n: LocaleAwarePolyglot;
    currentLocale: ValidLocale;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
