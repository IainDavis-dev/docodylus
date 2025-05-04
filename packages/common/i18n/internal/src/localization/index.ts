import { Namespaced } from '@docodylus/namespace-internal';

import { I18nNamespace, prependNamespace, SupportedLocale } from '../consts';

export type DefaultLocalizedStrings = Namespaced<typeof I18nNamespace, {
  'txlns-loading': string;
}>;

export type DefaultTranslationKey = keyof DefaultLocalizedStrings;
export const DEFAULT_TRANSLATIONS: Partial<Record<SupportedLocale, DefaultLocalizedStrings>> = {
  en: prependNamespace({ 'txlns-loading': 'translations loading...' }),
  es: prependNamespace({ 'txlns-loading': 'traducciones cargándose...' }),
} as const;
// adds localized-string keys for this component to the master list so
// it can be included in user overrides.

declare module '@docodylus/i18n-extend' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DocodylusLocalizedStrings extends DefaultLocalizedStrings { }
}

