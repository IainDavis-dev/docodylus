export type NonEmptyString<T extends string = string> = T extends '' ? never : T;

export function isNonEmptyString(value: unknown): value is NonEmptyString<string> {
    return typeof value === 'string' && value !== '';
}

export type NoWhitespaceString<T extends NonEmptyString<U>, U extends string = string> = T extends `${infer Start}${' ' | '\t' | '\n' | '\r'}${infer End}` ? never : T;

export function isNoWhitespaceString(value: unknown): value is NoWhitespaceString<string> {
    return typeof value === 'string' && !/\s/.test(value);
}
