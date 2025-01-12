import { BASE_NAMESPACE } from "@i18n/consts";

export const namespacer = (...ns: string[]) => (key: string) => `${ns.join(".")}.${key}`
