// allow import of MDX files as React (JSX) components
declare module '*.mdx' {
    import { JSX } from 'react';
    let MDXComponent: (props: any) => JSX.Element;
    export default MDXComponent;
}