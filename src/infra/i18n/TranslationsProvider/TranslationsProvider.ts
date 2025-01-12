import { Txlns } from "../types";

export interface TranslationsProviderResponse {
    translations?: Txlns;
    error: string | Error | false;
}

export interface TranslationsProvider<SourceType> {
    load: (source: SourceType) => Promise<TranslationsProviderResponse>;
}

