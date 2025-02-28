type CharacterSet<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? First | CharacterSet<Rest>
    : never;

export type Alpha = CharacterSet<'abcdefghijklmnopqrstuvwxyz'>

export type IsLowercase<T extends string> =
    T extends ""
        ? true
        : T extends `${Alpha}${infer Rest}`
            ? IsLowercase<Rest>
            : false