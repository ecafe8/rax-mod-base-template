const path = require('path'); // eslint-disable-line
const srcPath = path.resolve(__dirname, './src');

module.exports = (config) => {

  return {
    ...config,
    resolve: {
      alias: {
        common: srcPath + '/common',
      }
    }
  };
};
