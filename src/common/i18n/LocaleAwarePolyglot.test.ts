/* eslint-disable @typescript-eslint/unbound-method */
import { describeUnitTest } from '@test-utils/testGroups';
import {
  DEFAULT_LOCALE,
  DEFAULT_TRANSLATIONS,
  SUPPORTED_LOCALES,
  SupportedLocale,
} from '@i18n/consts';
import { LocaleAwarePolyglot } from '@i18n/LocaleAwarePolyglot';
import Polyglot from 'node-polyglot';

describeUnitTest('LocaleAwarePolyglot', () => {
  let polyglot: Polyglot;

  describe('Instantiation', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
      polyglot = new Polyglot();
      vi.spyOn(polyglot, 'replace');
      vi.spyOn(polyglot, 'extend');
      vi.spyOn(polyglot, 't');
      vi.spyOn(polyglot, 'locale');
    });

    it('should use the provided polyglot instance if one exists', () => {
      const actual = new LocaleAwarePolyglot(
        polyglot,
      );

      actual.setLocale('fr-FR');
      expect(polyglot.locale).toBeCalledWith('fr-FR');
    });

    it('should initalize with the default locale', () => {
      const actual = new LocaleAwarePolyglot();
      expect(actual.getLocale()).toBe(DEFAULT_LOCALE);
    });

    it('should initialize with a specific locale when provided', () => {
      const actual = new LocaleAwarePolyglot(undefined, {
        locale: 'fr-FR',
      });

      expect(actual.getLocale()).toBe('fr-FR');
    });

    it.each(SUPPORTED_LOCALES)('should initialize with a default minimal set of translations', (locale: SupportedLocale) => {
      const actual = new LocaleAwarePolyglot(polyglot);
      actual.setLocale(locale);

      expect(polyglot.t).not.toBeCalled();
      expect(actual.t('dev.iaindavis.docodylus.internationalization.txlns-loading')).toEqual(DEFAULT_TRANSLATIONS[locale]?.['dev.iaindavis.docodylus.internationalization.txlns-loading']);
      expect(polyglot.t).toBeCalledTimes(1);
    });
  });

  describe('localizing strings', () => {
    it('provides translations appropriate for the current locale', () => {
      const EN_COLLAPSE_PROMPT = 'EN_COLLAPSE_PROMPT';
      const FR_COLLAPSE_PROMPT = 'FR_COLLAPSE_PROMPT';

      const actual = new LocaleAwarePolyglot(polyglot);
      expect(polyglot.t).toBeCalledTimes(1); // call in the constructor

      actual.extend('en', { 'dev.iaindavis.docodylus.layout.expandable.collapsePrompt': EN_COLLAPSE_PROMPT });
      actual.extend('fr', { 'dev.iaindavis.docodylus.layout.expandable.collapsePrompt': FR_COLLAPSE_PROMPT });

      // default locale
      expect(actual.t('dev.iaindavis.docodylus.layout.expandable.collapsePrompt')).toBe(EN_COLLAPSE_PROMPT);

      actual.setLocale('fr');
      expect(polyglot.t).toBeCalledTimes(2);

      expect(actual.t('dev.iaindavis.docodylus.layout.expandable.collapsePrompt')).toBe(FR_COLLAPSE_PROMPT);
    });

    it('falls back to a more general locale for unavailable translations', () => {
      const FR_COLLAPSE_PROMPT = 'FR_COLLAPSE_PROMPT';
      const FR_FR_COLLAPSE_PROMPT = 'FR_FR_COLLAPSE_PROMPT';
      const FR_EXPAND_PROMPT = 'FR_EXPAND_PROMPT';

      const actual = new LocaleAwarePolyglot(polyglot, {
        locale: 'fr-FR',
      });

      actual.extend('fr', { 'dev.iaindavis.docodylus.layout.expandable.collapsePrompt': FR_COLLAPSE_PROMPT });
      actual.extend('fr-FR', { 'dev.iaindavis.docodylus.layout.expandable.collapsePrompt': FR_FR_COLLAPSE_PROMPT });
      actual.extend('fr-FR', { 'dev.iaindavis.docodylus.layout.expandable.expandPrompt': FR_EXPAND_PROMPT });

      expect(actual.t('dev.iaindavis.docodylus.layout.expandable.collapsePrompt')).toBe(FR_FR_COLLAPSE_PROMPT);
      expect(actual.t('dev.iaindavis.docodylus.layout.expandable.expandPrompt')).toBe(FR_EXPAND_PROMPT);
    });

    it(`falls back to a default locale ("${DEFAULT_LOCALE}") if no matching string is available`, () => {
      const FR_EXPAND_PROMPT = 'FR_EXPAND_PROMPT';
      const DEFAULT_COLLAPSE_PROMPT = 'DEFAULT_COLLAPSE_PROMPT';

      const actual = new LocaleAwarePolyglot(polyglot, {
        locale: 'fr',
      });

      actual.extend('fr', { 'dev.iaindavis.docodylus.layout.expandable.expandPrompt': FR_EXPAND_PROMPT });

      // note, in the running code, these translations are staged by the with the useTranslations
      // hook, transparent to the component. Here, we have to explicitly add it so the default
      // translation will be available.
      actual.extend(DEFAULT_LOCALE, { 'dev.iaindavis.docodylus.layout.expandable.collapsePrompt': DEFAULT_COLLAPSE_PROMPT });

      expect(actual.t('dev.iaindavis.docodylus.layout.expandable.collapsePrompt')).toBe(DEFAULT_COLLAPSE_PROMPT);
      expect(actual.t('dev.iaindavis.docodylus.layout.expandable.expandPrompt')).toBe(FR_EXPAND_PROMPT);
    });
  });
});
