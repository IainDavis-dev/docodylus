declare module '*.mdx' {
    import { JSX } from 'react';

    const MDXComponent: (props: unknown) => JSX.Element;
    export default MDXComponent;
}
  