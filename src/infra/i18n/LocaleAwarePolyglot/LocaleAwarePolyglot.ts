import Polyglot from "node-polyglot";
import { isSupportedLocale, type SupportedLocale, type Txlns } from "../types";
import { DEFAULT_LOCALE, DEFAULT_TRANSLATIONS } from "../consts";
import { UnsupportedLocaleError } from "../error/I18nError";
import { createImportOnceTranslationsProvider } from "@i18n/TranslationsProvider/ImportOnceTranslationsProvider";
import { TranslationsProvider } from "@i18n/TranslationsProvider/TranslationsProvider";

interface LocaleAwarePolyglotOptions {
    fallbackLocale?: SupportedLocale,
    locale?: SupportedLocale,
}

class LocaleAwarePolyglot {
    private polyglot: Polyglot;
    private translationsProvider: TranslationsProvider<URL> = createImportOnceTranslationsProvider();
    private fallbackLocale: SupportedLocale;
    private translationsCache: Partial<Record<SupportedLocale, Txlns>>

    public locale: typeof this.polyglot['locale'];

    constructor(polyglotInstance: Polyglot = new Polyglot(), options: LocaleAwarePolyglotOptions = {}) {
        const { fallbackLocale = DEFAULT_LOCALE, locale = DEFAULT_LOCALE } = options;

        this.polyglot = polyglotInstance;
        this.locale = polyglotInstance.locale;

        this.locale(locale);
        this.fallbackLocale = fallbackLocale;
        this.translationsCache = { [fallbackLocale]: {}, ...DEFAULT_TRANSLATIONS };
        this._updatePolyglotTranslations();
    }

    public async loadTranslations(url: URL): Promise<void> {
        const { translations, error } = await this.translationsProvider.load(url);
        if (!error && translations) {
            this.extendForLocale(this.polyglot.locale() as SupportedLocale, translations);
        } else if (!error && !translations) {
            /* NOOP, translations already loaded */
        } else if (error) {
            console.error(`Failed to load translations for "${url}`, error);
        }
    }

    public extend = (translations: Txlns): void => {
        this.extendForLocale(this.polyglot.locale() as SupportedLocale, translations);
    }

    public extendForLocale = (locale: SupportedLocale, translations: Txlns): void => {
        if (isSupportedLocale(locale))  {
            this.translationsCache[locale] = {
                ...this.translationsCache[locale],
                ...translations
            }
            this._updatePolyglotTranslations();
        } else {
            console.warn(new UnsupportedLocaleError(locale, "No translations added"))
        }
    }

    private _setLocale(locale: SupportedLocale) {
        this.polyglot.locale(locale);
        this._updatePolyglotTranslations();
    }

    private _updatePolyglotTranslations() {
        this.polyglot.replace({
            ...this.translationsCache[this.fallbackLocale],
            ...this.translationsCache[this.polyglot.locale() as SupportedLocale],
        })
    }

    public t = (key: string, options?: Polyglot.InterpolationOptions): string => {
        return this.polyglot.t(key, options);
    }
}

export default LocaleAwarePolyglot;
