import type { IsLowercase } from '@docodylus/validation-internal';

const namespaceRegex = /^([a-z]+\.)*[a-z]+$/;

type IsValidNamespace<T extends string> =
  T extends ''
    // Reject empty string outright.
    ? false
    // segmented namespace
    : T extends `${infer Segment}.${infer Rest}`
        ? Segment extends ''
            // Reject empty segment (leading or double dots)
            ? false
            : IsLowercase<Segment> extends true
                // Recurse on the rest.
                ? IsValidNamespace<Rest>
                // reject if contains disallowed characters
                : false
            : IsLowercase<T> extends true
                ? true
                : false;

export type ValidNamespace<T extends string> = IsValidNamespace<T> extends true ? T : never;

export function isValidNamespace(maybeNamespace: unknown): boolean {
  if (typeof maybeNamespace !== 'string') return false;
  return namespaceRegex.test(maybeNamespace);
}
