import { DEFAULT_LOCALE } from "@i18n/consts";
import { I18nContext } from "@i18n/context/I18nContext";
import { SupportedLocale } from "@i18n/types";
import { useContext } from "react";

const useLocale = (): SupportedLocale => useContext(I18nContext)?.currentLocale || DEFAULT_LOCALE

export default useLocale;