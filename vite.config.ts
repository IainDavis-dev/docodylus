import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        react(),
    ],
    css: {
        modules: {
            scopeBehaviour: 'local',
            generateScopedName: '[name]__[local]__[hash:base64:5]'
        }
    },
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@dummies': path.resolve(__dirname, './src/dummies'),
            '@i18n': path.resolve(__dirname, './src/infra/i18n'),
            '@validation': path.resolve(__dirname, './src/infra/validation'),
            '@docs': path.resolve(__dirname, './docs'),
            '@test-utils': path.resolve(__dirname, './test/testUtils'),
            '@types': path.resolve(__dirname, './src/types'),
            '@shared-utils': path.resolve(__dirname, './src/infra/sharedUtils'),
            '@error': path.resolve(__dirname, './src/infra/error'),
            '@namespace': path.resolve(__dirname, './src/infra/namespace')
        }
    },
})