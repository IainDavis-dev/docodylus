import type { IsLowercase } from '@docodylus/validation-internal';

/**
 * Recursive type-level validator for dot-delimited, lowercase-only namespace strings.
 */
type IsValidNamespace<T extends string> =
  T extends ''
    ? false
    : T extends `${infer Segment}.${infer Rest}`
      ? Segment extends ''
        ? false
        : IsLowercase<Segment> extends true
          ? IsValidNamespace<Rest>
          : false
      : IsLowercase<T> extends true
        ? true
        : false;

/**
 * Enforces a lowercase, dot-separated namespace.
 * If the input string is invalid, it resolves to `never`.
 */
export type ValidNamespace<T extends string> =
  IsValidNamespace<T> extends true ? T : never;
