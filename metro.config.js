const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for .mjs files and proper ES module handling
config.resolver.sourceExts.push('mjs');
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'mjs');

// Configure transformer for better web compatibility
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
};

module.exports = config;