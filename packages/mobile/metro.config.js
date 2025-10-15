const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

// Add support for monorepo
const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

config.resolver = {
  assetExts: [...assetExts, 'bin', 'txt', 'jpg', 'png', 'json'],
  sourceExts: [...sourceExts, 'ts', 'tsx'],
  alias: {
    '@sbdsa/shared': '../shared/src',
    '@': './src',
  },
};

config.watchFolders = [
  // Watch the root folder
  '../../',
  // Watch the shared package
  '../shared',
];

module.exports = mergeConfig(getDefaultConfig(__dirname), config);