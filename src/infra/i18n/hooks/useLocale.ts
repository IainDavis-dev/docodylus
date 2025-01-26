import { DEFAULT_LOCALE } from "@i18n/consts";
import { I18nContext } from "@i18n/context/I18nContext";
import { ValidLocale } from "@i18n/types";
import { useContext } from "react";

/**
 * A React hook that retrieves the current locale from the {@link I18nContext}.
 *
 * @returns {ValidLocale} The currently active locale. Defaults to {@link DEFAULT_LOCALE} if no context is available.
 */
const useLocale = (): ValidLocale => {
    const context = useContext(I18nContext);
    return context ? context.currentLocale : DEFAULT_LOCALE;
};

export default useLocale;