// allow import of MDX files as React (JSX) components
declare module '*.mdx' {
    import { JSX } from 'react';

    const MDXComponent: (props: unknown) => JSX.Element;
    export default MDXComponent;
}
