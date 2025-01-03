// allow import of MDX files as React (JSX) components
declare module '*.mdx' {
    import { JSX } from 'react';
    let MDXComponent: (props: any) => JSX.Element;
    export default MDXComponent;
}

// allow import of CSS modules
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}