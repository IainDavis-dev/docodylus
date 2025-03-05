const namespaceRegex = /^([a-z]+\.)*[a-z]+$/;

function isValidNamespace(maybeNamespace: unknown): boolean {
  if (typeof maybeNamespace !== 'string') return false;
  return namespaceRegex.test(maybeNamespace);
}

export default isValidNamespace;
