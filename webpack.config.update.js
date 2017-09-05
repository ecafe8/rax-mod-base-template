const webpack = require('webpack'); // eslint-disable-line
const RaxWebpackPlugin = require('rax-webpack-plugin');
const IS_DEV = process.env.NODE_ENV !== 'production';
const path = require('path'); // eslint-disable-line
const srcPath = path.resolve('./src');

module.exports = (config) => {
  const updateConfig = {
    ...config,
    entry: {
      'build/weex-index': [path.resolve(srcPath, 'index.js')], // 支持rax-mod的rax-viewer
    },
  };
  updateConfig.plugins.push(
    new RaxWebpackPlugin({
      moduleName: 'fie', // 兼容 fie 本地开发环境
      externalBuiltinModules: false
    }));
  return updateConfig;
};
