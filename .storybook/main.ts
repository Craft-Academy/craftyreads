import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-essentials'
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {
      builder: {
        viteConfigPath: './.storybook/vite.config.ts',
      }
    },
  },
};
export default config;
