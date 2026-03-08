/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-vitest', '@github-ui/storybook-addon-performance-panel/universal'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  staticDirs: ['../css'],
  viteFinal: async (config) => {
    // Add support for importing .html files as raw strings
    config.assetsInclude = config.assetsInclude || [];
    if (Array.isArray(config.assetsInclude)) {
      config.assetsInclude.push('**/*.html');
    }
    return config;
  },
};

export default config;
