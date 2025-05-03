import { ValidNamespace } from "./ValidNamespace.testable-type";

const namespaceRegex = /^([a-z]+\.)*[a-z]+$/;

export function isValidNamespace(maybeNamespace: unknown): maybeNamespace is ValidNamespace<string> {
  if (typeof maybeNamespace !== 'string') return false;
  return namespaceRegex.test(maybeNamespace);
}
