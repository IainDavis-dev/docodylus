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
            '@components': path.resolve(__dirname, 'src/iaindavis-dev/docusaurus-extensions/components'),
            '@dummies': path.resolve(__dirname, 'src/dummies')
        }
    },
})