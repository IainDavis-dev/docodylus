/**
 * A **compile-time constraint** ensuring a string is **non-empty** (length > 0).
 * 
 * If an empty string is assigned, TypeScript will raise an error.
 */
export type NonEmptyString<T extends string = string> = T extends '' ? never : T;

/**
 * **Runtime validation** for `NonEmptyString`.
 * 
 * Type Guard: Narrows `value` to `NonEmptyString<string>` when `true`.
 * 
 * @param value - The value to check.
 * @returns `true` if `value` is a non-empty string.
 */
export function isNonEmptyString(value: unknown): value is NonEmptyString<string> {
    return typeof value === 'string' && value !== '';
}

/**
 * A **compile-time constraint** ensuring a string has **no whitespace**.
 * 
 * TypeScript will enforce this constraint, preventing whitespace-containing strings.
 */
export type NoWhitespaceString<T extends NonEmptyString<U>, U extends string = string> = T extends `${infer Start}${' ' | '\t' | '\n' | '\r'}${infer End}` ? never : T;

/**
 * **Runtime validation** for `NoWhitespaceString`.
 * 
 * Type Guard: Narrows `value` to `NoWhitespaceString<string>` when `true`.
 * 
 * @param value - The value to check.
 * @returns `true` if `value` contains no whitespace.
 */
export function isNoWhitespaceString(value: unknown): value is NoWhitespaceString<string> {
    return typeof value === 'string' && !/\s/.test(value);
}