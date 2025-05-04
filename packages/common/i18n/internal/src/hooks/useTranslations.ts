import { PolyglotOptions } from 'node-polyglot';
import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { I18nContext } from '../context';
import { LocalizationFileLoaderMap } from '../loaders';
import { createLocalizationStringLoaders } from '../loaders/createLocalizationStringLoaders';
import { negotiateLocales } from '../localeNegotiation';
import { DefaultTranslationKey } from '../localization';
import { LocaleAwarePolyglot } from '../polyglot/LocaleAwarePolyglot';
import { LocalizedStrings } from '../types';
import { ValidLocale } from '../validation'

// default instance serves DEFAULT_LOCALE in the absence of an explicit Provider
let fallbackPolyglot: LocaleAwarePolyglot;

const TXLNS_LOADING_KEY: DefaultTranslationKey = 'dev.iaindavis.docodylus.internationalization.txlns-loading';
type LoadingState = 'not-loaded' | 'loading' | 'success' | 'error';
type TWrapper<T> = (key: T | DefaultTranslationKey, options?: PolyglotOptions) => string;

export function useTranslations<T extends LocalizedStrings = never>(
  componentFileUrl: URL,
): TWrapper<keyof T> {

  const loaderMap = createLocalizationStringLoaders<T>(componentFileUrl);
  // if no context
  const { i18n } = useContext(I18nContext) ?? {
    // check for a default Polyglot instance and create it if it doesn't exist yet
    i18n: fallbackPolyglot ??= new LocaleAwarePolyglot(),
  };

  const locale = i18n.getLocale();

  const [loadingStates, setLoadingStates] = useState<Record<string, LoadingState>>(
    () => Object.create(null) as Record<string, LoadingState>,
  );

  const negotiatedLoaders = negotiateLocales(locale, Object.keys(loaderMap) as ValidLocale[])
    .reduce<LocalizationFileLoaderMap<T>>(
      (loaders, loc) => ({ ...loaders, [loc]: loaderMap[loc] }),
      {},
    );

  useEffect(() => {
    const loadersToRun = Object.entries(negotiatedLoaders)
      .filter(([, { cacheKey }]) => {
        const currentState: LoadingState = loadingStates[cacheKey] ?? 'not-loaded';
        return !['loading', 'success', 'error'].includes(currentState);
      }).map(([loc, { cacheKey, loader }]) => {
        return (async (): Promise<void> => {
          setLoadingStates((prev) => ({ ...prev, [cacheKey]: 'loading' }));
          try {
            const localizedStrings = (await loader()) as unknown as T;
            setLoadingStates((prev) => ({ ...prev, [cacheKey]: 'success' }));
            i18n.extend(loc as ValidLocale, localizedStrings);
          } catch (error) {
            console.error(`Failed to load translations from ${cacheKey}:`, error);
            setLoadingStates((prev) => ({ ...prev, [cacheKey]: 'error' }));
          }
        })();
      });
    void Promise.all(loadersToRun);
  });

  const usePlaceholderText = Object.values(negotiatedLoaders).length > 0 && Object.values(negotiatedLoaders).some(({ cacheKey }) => ['not-loaded', 'loading'].includes(loadingStates[cacheKey] ?? 'not-loaded'));

  const tWrapper: TWrapper<keyof T> = useMemo(
    () => (key, options) => (
      usePlaceholderText
        ? i18n.t(TXLNS_LOADING_KEY as string)
        : i18n.t(key as string, options)
    ),
    [usePlaceholderText],
  );

  return tWrapper;
}
