import { DEFAULT_LOCALE } from '@docodylus/consts-internal';
import { LocaleAwarePolyglot } from '@i18n/polyglot/LocaleAwarePolyglot';
import { I18nContext,  I18nContextValue } from '@i18n/context'
import { PropsWithChildren, useMemo } from 'react';
import { isValidLocale, type ValidLocale } from '@i18n/validation';
import { newInvalidLocaleError } from '@i18n/error';

type I18nProviderProps = PropsWithChildren<{
    locale?: ValidLocale
}>

export const I18nProvider: React.FC<I18nProviderProps> = ({
  locale = DEFAULT_LOCALE,
  children,
}: I18nProviderProps) => {
  if (!isValidLocale(locale)) throw newInvalidLocaleError(locale);

  const polyglotInstance = useMemo(
    () => new LocaleAwarePolyglot(
      undefined, // let LocaleAwarePolyglot instantiate Polyglot
      { locale },
    ),
    [], // instantiate Polyglot only once per Provider
  );

  const value: I18nContextValue = useMemo(() => ({
    i18n: polyglotInstance,
    currentLocale: locale,
  }), [locale]);

  polyglotInstance.setLocale(locale);
  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};
