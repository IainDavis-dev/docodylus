import { IsLowercase } from '@validation/types';

export { Namespaced } from './namespace';

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
