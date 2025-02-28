import { DocodylusErrorLike, DocodylusErrorScope, DocodylusTypeErrorSubtype } from "./DocodylusErrorLike";

export function DocodylusErrorBase<T extends new(...args: any[]) => Error>(Base: T) {
    return class extends Base implements DocodylusErrorLike {
        isDocodylusError: true = true;
        subtype?: DocodylusTypeErrorSubtype;
        scope?: DocodylusErrorScope;
        reference?: URL;
        details?: string;

        // required params: (message: string, cause: unknown, params: DocodylusErrorParams)
        protected constructor(...args: any[]){
            const [message, cause, {scope, subtype, reference, details} = {}] = args;
            super(message, { cause });

            this.scope = scope;
            this.subtype = subtype;
            this.reference = reference;
            this.details = details;

            Object.setPrototypeOf(this, new.target.prototype)
        }

        toJSON() {
            return {
                type: this.name,
                message: this.message,
                stack: this.stack,
                ...(this.subtype ? {subtype: this.subtype} : {}),
                ...(this.scope ? {scope: this.scope} : {}),
                ...(this.reference ? { reference: this.reference} : {}),
                ...(this.details ? { details: this.details} : {}),
            }
        }
    
        toString(): string {
            return this.message
                + (this.subtype ? ` [Subtype: ${this.subtype}]` : "")
                + (this.scope ? ` [Scope: ${this.scope}]` : "")
                + (this.reference ? ` [Reference: ${this.reference.href}]` : "")
                + (this.details ? ` [Details: ${this.details}]` : "");
        }
    }
}