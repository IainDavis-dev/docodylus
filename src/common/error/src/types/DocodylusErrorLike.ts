export type DocodylusTypeErrorSubtype = 'InvalidLocale' | 'InvalidNamespace' | 'InvalidArgument';

export type DocodylusErrorSubtype = DocodylusTypeErrorSubtype;

export type DocodylusErrorScope = 'i18n' | 'namespace';

export interface DocodylusErrorParams {
    subtype?: DocodylusErrorSubtype
    scope?: DocodylusErrorScope
    reference?: URL
    details?: string
}

export interface DocodylusErrorLike {
    readonly subtype?: DocodylusErrorSubtype
    readonly scope?: DocodylusErrorScope
    readonly reference?: URL
    readonly details?: string
    toString: () => string
    toJSON: () => object
    isDocodylusError: true
}
