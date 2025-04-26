import { DEFAULT_LOCALE } from '@docodylus/consts-internal';
import { isValidLocale, type ValidLocale } from '../validation';
import { newInvalidLocaleError } from '../error';
import { newExpectedArrayError } from '@docodylus/error-internal';

type LocaleSort =
    'none'
    | 'sort-for-merge' // default locale first, then shortest-to-longest

export function negotiateLocales(requestedLocale: ValidLocale, availableLocales: ValidLocale[], sort: LocaleSort = 'none'): ValidLocale[] {
  if (!Array.isArray(availableLocales)) throw newExpectedArrayError('availableLocales', 'negotiateLocales');
  if (!isValidLocale(requestedLocale)) throw newInvalidLocaleError(requestedLocale);

  const negotiatedLocales = availableLocales.filter((locale) => requestedLocale.startsWith(locale));
  switch (sort) {
    case 'sort-for-merge':
      return [
        DEFAULT_LOCALE,
        ...negotiatedLocales.sort((a, b) => a.length - b.length),
      ];
    default:
      return [
        DEFAULT_LOCALE,
        ...negotiatedLocales,
      ];
  }
}
