import {
  DocodylusErrorLike,
  DocodylusErrorParams,
  DocodylusErrorScope,
  DocodylusTypeErrorSubtype,
} from './DocodylusErrorLike';

type MixinArgs = [
    string,
    unknown,
    DocodylusErrorParams,
];

// explicit any is required for mixin pattern
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ErrorConstructor = new(...args: any[]) => Error;

// deducing the appropriate return type of this function is not trivial
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function DocodylusErrorBase<T extends ErrorConstructor>(Base: T) {
  return class extends Base implements DocodylusErrorLike {
    isDocodylusError = true as const;

    subtype?: DocodylusTypeErrorSubtype;

    scope?: DocodylusErrorScope;

    reference?: URL;

    details?: string;

    // required params: (message: string, cause: unknown, params: DocodylusErrorParams)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected constructor(...args: any[]) {
      const [
        message,
        cause,
        {
          scope, subtype, reference, details,
        },
      ] = args as MixinArgs;

      super(message, { cause });

      this.scope = scope;
      this.subtype = subtype;
      this.reference = reference;
      this.details = details;

      Object.setPrototypeOf(this, new.target.prototype);
      Object.freeze(this);
    }

    toJSON(): object {
      return {
        type: this.name,
        message: this.message,
        stack: this.stack,
        ...(this.subtype ? { subtype: this.subtype } : {}),
        ...(this.scope ? { scope: this.scope } : {}),
        ...(this.reference ? { reference: this.reference } : {}),
        ...(this.details ? { details: this.details } : {}),
      };
    }

    toString(): string {
      return this.message
                + (this.subtype ? ` [Subtype: ${this.subtype}]` : '')
                + (this.scope ? ` [Scope: ${this.scope}]` : '')
                + (this.reference ? ` [Reference: ${this.reference.href}]` : '')
                + (this.details ? ` [Details: ${this.details}]` : '');
    }
  };
}

export default DocodylusErrorBase;
