/**
 * Mapped type: takes an existing object type and preprends a
 * namespace to each of its properties
 */
export type Namespaced<NS extends string, T extends Record<string, unknown>> = {
    [K in keyof T as `${NS}.${string & K}`]: T[K]
}
