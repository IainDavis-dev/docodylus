import localeCodes, { ILocale } from 'locale-codes';
import { SUPPORTED_LOCALES } from '../../../src/infra/i18n/consts';

const [supportedLocales, unsupportedLocales] = localeCodes.all
    .sort((a, b) => a.tag < b.tag ? -1 : 1)
    .reduce<[ILocale[], ILocale[]]>(
        (parsed, locale) => SUPPORTED_LOCALES.includes(locale.tag)
        ? [[...parsed[0], locale], parsed[1]]
        : [parsed[0], [...parsed[1], locale]],
        [[], []]
    );

const localeGlobal = {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
            ...supportedLocales.map(({tag}) => ({ value: tag, title: `${tag} (provided)`})),
            ...unsupportedLocales.map(({tag}) => tag)
        ],
        dynamicTitle: true
      }
    }
  

export default localeGlobal;