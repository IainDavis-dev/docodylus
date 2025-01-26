import Polyglot from "node-polyglot";
import { asValidLocale, ValidLocale, type Txlns } from "../types";
import { DEFAULT_LOCALE, DEFAULT_TRANSLATIONS } from "../consts";
import { createImportOnceTranslationsSupplier } from "@i18n/TranslationsSupplier/ImportOnceTranslationsSupplier";
import { TranslationsSupplier } from "@i18n/TranslationsSupplier/TranslationsSupplier";

/**
 * Options for configuring the {@link LocaleAwarePolyglot} instance.
 *
 * @property {ValidLocale} [fallbackLocale] - The locale to use as a fallback when a key is missing
 * in the current locale's translations. Defaults to {@link DEFAULT_LOCALE}.
 * @property {ValidLocale} [locale] - The initial locale for the `Polyglot` instance. Defaults to {@link DEFAULT_LOCALE}.
 */
interface LocaleAwarePolyglotOptions {
    locale?: ValidLocale,
    fallbackLocale?: ValidLocale,
}

/**
 * A wrapper around `node-polyglot` that adds support for managing translations
 * for multiple locales, loading translations dynamically, and providing a
 * fallback locale for missing keys. 
 * 
 * This class maintains an internal cache of translations, merges them as needed,
 * and ensures they are appropriately loaded into the underlying `Polyglot` instance.
 * 
 * The underlying `Polyglot` instance is treated as the source-of-truth for the locale
 *
 * @class LocaleAwarePolyglot
 * @param {Polyglot} [polyglotInstance] - An optional `Polyglot` instance to wrap. If not provided, a new instance is created.
 * @param {LocaleAwarePolyglotOptions} [options] - Configuration options for the instance. See {@link LocaleAwarePolyglotOptions}.
 */
class LocaleAwarePolyglot {
    private polyglot: Polyglot;
    private translationsSupplier: TranslationsSupplier<URL> = createImportOnceTranslationsSupplier();
    private fallbackLocale: ValidLocale;
    private translationsCache: Partial<Record<ValidLocale, Txlns>>

    constructor(polyglotInstance: Polyglot = new Polyglot(), options: LocaleAwarePolyglotOptions = {}) {
        const { fallbackLocale = DEFAULT_LOCALE, locale = DEFAULT_LOCALE } = options;

        this.polyglot = polyglotInstance;

        this.polyglot.locale(asValidLocale(locale) ?? DEFAULT_LOCALE);
        this.fallbackLocale = asValidLocale(fallbackLocale) ?? DEFAULT_LOCALE;
        this.translationsCache = { [fallbackLocale]: {}, ...DEFAULT_TRANSLATIONS };
        this._pushToPolyglot();
    }

    private getLocale() {
        return this.polyglot.locale() as ValidLocale;
    }

    /**
     * Set the active locale and re-sync Polyglot's phrases
     * 
     * @param locale - the new locale
     * @returns the currently active locale
     */
    public setLocale(locale: ValidLocale) {
        const currentLocale = this.polyglot.locale(locale);
        this._pushToPolyglot()
        return currentLocale;
    }

    /**
     * Load translation files into the cache for the current locale and
     * synchronize Polyglot's phrases array
     * 
     * @param url - the URL for a file that contains localized strings
     */
    public async loadTranslations(url: URL): Promise<void> {
        const { translations, error } = await this.translationsSupplier.load(url);
        if (!error && translations) {
            this._extend(translations);
        } else if (!error && !translations) {
            /* NOOP, translations already loaded */
        } else if (error) {
            console.error(`Failed to load translations for "${url}`, error);
        }
    }

    /**
     * Fetch localized string for the current locale
     * 
     * @param key - the key of the localized string to be fetched
     * @param { Polyglot.InterpolationOptions } options - options to be passed to the underlying Polyglot instance
     * @returns the translated string OR the key, if no translation is found in Polyglot's current phrases
     */
    public t = (key: string, options?: Polyglot.InterpolationOptions): string => {
        return this.polyglot.t(key, options);
    }

    private _extend = (translations: Txlns): void => {
        this._updateCache(translations);
        this._pushToPolyglot()
    }

    private _updateCache(translations: Txlns) {
        this.translationsCache[this.getLocale()] = {
            ...this.translationsCache[this.getLocale()],
            ...translations
        }
    }

    private _pushToPolyglot() {
        this.polyglot.replace({
            ...this.translationsCache[this.fallbackLocale],
            ...this.translationsCache[this.getLocale()],
        })
    }
}

export default LocaleAwarePolyglot;
