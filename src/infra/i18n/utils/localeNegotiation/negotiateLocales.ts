import { DEFAULT_LOCALE } from '@i18n/consts';
import { ValidLocale } from '@i18n/types';
import { newExpectedArrayError, newInvalidLocaleError } from '@error/DocodylusTypeError';
import isValidLocale from '../validateLocale';

type LocaleSort =
    'none'
    | 'sort-for-merge' // default locale first, then shortest-to-longest

function negotiateLocales(requestedLocale: ValidLocale, availableLocales: ValidLocale[], sort: LocaleSort = 'none'): ValidLocale[] {
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

export default negotiateLocales;
