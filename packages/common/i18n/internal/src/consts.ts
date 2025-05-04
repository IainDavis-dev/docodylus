import { BASE_NAMESPACE } from '@docodylus/consts-internal';
import { createNamespacePrepender } from '@docodylus/namespace-internal';

export const I18nNamespace = `${BASE_NAMESPACE}.internationalization`;

export const SUPPORTED_LOCALES = [
  'en',
  'es',
] as const;

export type SupportedLocale = typeof SUPPORTED_LOCALES[number]
export const prependNamespace = createNamespacePrepender(I18nNamespace);
