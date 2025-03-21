import remarkGfm from 'remark-gfm';
import remarkGitmoji from 'remark-gemoji';
import path from 'path';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../docs/**/*.docs.mdx",
    "../src/**/*.docs.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
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
    config.resolve.alias = {
      ...config.resolve.alias,
    }

    return config;
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};
export default config;
