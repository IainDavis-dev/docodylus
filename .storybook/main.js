import remarkGfm from 'remark-gfm';
import remarkGitmoji from 'remark-gemoji';
import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../docs/**/*.docs.mdx",
    "../packages/**/*.docs.mdx",
    "../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm, remarkGitmoji]
          }
        }
      }
    }
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  core: {
    builder: '@storybook/builder-vite'
  },

  viteFinal: (config) => {
    process.env.NODE_OPTIONS = '--conditions development';
    return mergeConfig(
      config,
      {
        resolve: {
          conditions: ['development', 'import', 'require'],
        },

      }
    );
  }
};
export default config;
