export class InternationalizationError extends Error {
    constructor(message: string) {
        super();
        this.name = "InternationalizationError";
    }
}

export class UnsupportedLocaleError extends InternationalizationError {
    constructor(locale: string, message?: string) {
        super(`Unsupported locale: ${locale}${message ? `: ${message}` : ''}`)
        this.name = "UnsupportedLocaleError"
    }
}