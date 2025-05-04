import * as mdxParser from 'eslint-mdx'
import * as mdxPlugin from 'eslint-plugin-mdx';

/** @type {import('eslint').Linter.Config} */
const simpleMdxConfig = {
    ...mdxPlugin.flat,
    processor: mdxPlugin.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
    languageOptions: {
        parser: mdxParser.parser
    },
    rules: {
        ...mdxPlugin.flat.rules,
        'no-unused-expressions': 'off'
    }
  };

/** @type {import('eslint').Linter.Config} */
const codeBlocksMdxConfig = {
    ...mdxPlugin.flatCodeBlocks,
    rules: {
      ...mdxPlugin.flatCodeBlocks.rules,
      'no-unused-expressions': 'off'
    },
 };

export default [
    simpleMdxConfig,
    codeBlocksMdxConfig,
];