var path          = require('path');
var webpackConfig = require('./webpack.config.js');

webpackConfig.devtool = 'cheap-module-eval-source-map';
webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '\'DEV\''
    },
    'NODE_ENV': '\'DEV\''
  })
);


module.exports = webpackConfig;

console.log(module.exports)
