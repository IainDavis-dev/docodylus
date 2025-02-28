import Polyglot from "node-polyglot";
import type { LocalizedStringsByLocale, ValidLocale, LocalizedStrings, DocodylusLocalizedStrings } from "./types";
import { DEFAULT_LOCALE, DEFAULT_TRANSLATIONS } from "./consts";
import { negotiateLocales } from "@i18n/utils/localeNegotiation";

/**
 * Options for configuring the {@link LocaleAwarePolyglot} instance.
 *
 * @property {ValidLocale} [fallbackLocale] - The locale to use as a fallback when a key is missing
 * in the current locale's translations. Defaults to {@link DEFAULT_LOCALE}.
 * @property {ValidLocale} [locale] - The initial locale for the `Polyglot` instance. Defaults to {@link DEFAULT_LOCALE}.
 */
interface LocaleAwarePolyglotOptions {
    locale?: ValidLocale,
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
    private translationsCache: Partial<LocalizedStringsByLocale>

    constructor(polyglotInstance: Polyglot = new Polyglot(), options: LocaleAwarePolyglotOptions = {}) {
        const { locale = DEFAULT_LOCALE } = options;

        this.polyglot = polyglotInstance;

        this.polyglot.locale(locale);
        this.translationsCache = { ...DEFAULT_TRANSLATIONS };
        this._pushToPolyglot();
    }

    public getLocale() {
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
     * Fetch localized string for the current locale
     * 
     * @param key - the key of the localized string to be fetched
     * @param { Polyglot.InterpolationOptions } options - options to be passed to the underlying Polyglot instance
     * @returns the translated string OR the key, if no translation is found in Polyglot's current phrases
     */
    public t = (key: string, options?: Polyglot.InterpolationOptions): string => {
        return this.polyglot.t(key, options);
    }

    /**
     * Merge new translations into the existing set
     * 
     * @param translations - the set of translations to cache and add to Polyglot
     */
    public extend = (locale: ValidLocale, translations: LocalizedStrings): void => {
        this._updateCache(locale, translations);
        this._pushToPolyglot()
    }

    private _updateCache(locale: ValidLocale, translations: LocalizedStrings) {
        this.translationsCache[locale] = {
            ...this.translationsCache[locale],
            ...translations
        }
    }

    private _pushToPolyglot() {
        const negotiatedLocales = negotiateLocales(this.getLocale(), Object.keys(this.translationsCache) as ValidLocale[], "sort-for-merge");
        const mergedLocalizedStrings = negotiatedLocales.reduce<LocalizedStrings>(
            (merged, locale) => ({ ...merged, ...this.translationsCache[locale] }),
            {} as LocalizedStrings
        )
        
        this.polyglot.replace({
            ...mergedLocalizedStrings
        })
    }
}

export default LocaleAwarePolyglot;
