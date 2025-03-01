const namespaceRegex = /^([a-z]+\.)*[a-z]+$/

export function isValidNamespace(maybeNamespace: unknown) {
    if(typeof maybeNamespace !== "string") return false;
    return namespaceRegex.test(maybeNamespace);
}