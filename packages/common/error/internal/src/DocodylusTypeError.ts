import { DocodylusErrorBase } from './DocodylusErrorBase';
import { DocodylusErrorParams, DocodylusTypeErrorSubtype } from './DocodylusErrorLike';

interface DocodylusTypeErrorParams extends DocodylusErrorParams {
    subtype?: DocodylusTypeErrorSubtype
}

export class DocodylusTypeError extends DocodylusErrorBase(TypeError) {
  constructor(
    message: string,
    cause?: unknown,
    params?: DocodylusTypeErrorParams,
  ) {
    // @ts-expect-error: mixin pattern won't allow us to modify
    // the constructor signature, but the base type does support
    // this signature
    super(message, { cause }, params);
  }
}

export function newExpectedArrayError(parameter: string, funcName: string): DocodylusTypeError {
  return new DocodylusTypeError(
    `function ${funcName} expected array for argument ${parameter}`,
    null,
    { subtype: 'InvalidArgument' },
  );
}
