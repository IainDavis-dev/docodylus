import createNamespacePrepender from '../namespace/createNamespacePrepender';
import { Namespaced } from '../namespace/types';

export const SUPPORTED_LOCALES = [
  'en',
  'es',
] as const;

export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

export const BASE_NAMESPACE = 'dev.iaindavis.docodylus';
export const DEFAULT_LOCALE: SupportedLocale = 'en';

/**
 * Set of translations supported without explicitly being imported into LocaleAwarePolglot
 *
 * Note: translated messages primarily indicate the status of import operations for other
 * translations
 */
const I18nNamespace = 'dev.iaindavis.docodylus.internationalization';
const prependNamespace = createNamespacePrepender(I18nNamespace);

type DefaultLocalizedStrings = Namespaced<typeof I18nNamespace, {
    'txlns-loading': string;
}>
export type DefaultTranslationKey = keyof DefaultLocalizedStrings

export const DEFAULT_TRANSLATIONS: Partial<Record<SupportedLocale, DefaultLocalizedStrings>> = {
  en: prependNamespace({ 'txlns-loading': 'translations loading...' }),
  es: prependNamespace({ 'txlns-loading': 'traducciones cargándose...' }),
} as const;

// adds localized-string keys for this component to the master list so
// it can be included in user overrides.
declare module '@i18n/types' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DocodylusLocalizedStrings extends DefaultLocalizedStrings {}
}
