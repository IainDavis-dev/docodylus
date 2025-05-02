import { mergeConfig } from "vite";
import react from '@vitejs/plugin-react';
import path from "path";
import vitestConfig  from '../test/vite.config.test-config';

const isTest = process.env.VITEST === 'true';
const { default: mdxPlugin } = await (import('@mdx-js/rollup'));

const viteConfig = {
    plugins: [
        react(),
        ...(isTest ? [mdxPlugin()] : []),
    ],
    css: {
        modules: {
            scopeBehaviour: 'local',
            generateScopedName: '[name]__[local]__[hash:base64:5]',
        },
    },
    resolve: {
        alias: {
        // infra, docs, & test stuff
        '@docs': path.resolve(__dirname, '../../docs'),
        '@dummies': path.resolve(__dirname, '../../infra/dummies'),
        '@storybook-customizations': path.resolve(__dirname, '../../infra/storybook/customizations'),
        '@test-utils': path.resolve(__dirname, '../../infra/test/utils'),

        // library components
        '@components': path.resolve(__dirname, '../../packages/components'),

        // cross-cutting modules
        '@consts': path.resolve(__dirname, '../../packages/common/consts/internal'),
        '@error': path.resolve(__dirname, '../../packages/common/error/internal'),
        '@i18n': path.resolve(__dirname, '../../packages/common/i18n/internal'),
        '@loadable': path.resolve(__dirname, "../../packages/common/loadable/internal"),
        '@namespace': path.resolve(__dirname, '../../packages/common/namespace/internal'),
        '@validation': path.resolve(__dirname, '../../packages/common/validation/internal'),
        },
    },
}

export default mergeConfig(viteConfig, isTest ? vitestConfig : {})
