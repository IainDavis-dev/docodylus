import { I18nContextValue } from '@i18n/types/context';
import { createContext } from 'react';

/**
 * React context for providing internationalization (i18n) support.
 *
 * This context exposes the {@link LocaleAwarePolyglot} instance and the current locale
 * to be consumed across the application.
 */
const I18nContext = createContext<I18nContextValue | null>(null);

export default I18nContext;
