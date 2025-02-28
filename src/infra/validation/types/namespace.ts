import { IsLowercase } from ".";

type IsValidNamespace<T extends string> =
  T extends ""
    ? false                                         // Reject empty string outright.
    : T extends `${infer Segment}.${infer Rest}`    // segmented namespace
        ? Segment extends "" 
            ? false                                 // Reject empty segment (leading or double dots)
            : IsLowercase<Segment> extends true
                ? IsValidNamespace<Rest>            // Recurse on the rest.
                : false                             // reject if contains disallowed characters
            : IsLowercase<T> extends true
                ? true
                : false;

export type ValidNamespace<T extends string> = IsValidNamespace<T> extends true ? T : never;


const namespaceRegex = /^([a-z]+\.)*[a-z]+$/

export function isValidNamespace(maybeNamespace: unknown) {
    if(typeof maybeNamespace !== "string") return false;
    return namespaceRegex.test(maybeNamespace);
}
