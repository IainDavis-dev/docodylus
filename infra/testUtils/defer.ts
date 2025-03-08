type ResolveFunc<T> = (value: T) => void;
type RejectFunc = (reason?: unknown) => void

interface DeferType<T> {
    promise: Promise<T>
    resolve: ResolveFunc<T>
    reject: RejectFunc
}

function defer<T>(): DeferType<T> {
  let resolve!: DeferType<T>['resolve'];
  let reject!: DeferType<T>['reject'];

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

export default defer;
