var path          = require('path');
var webpack       = require('webpack');
var webpackConfig = require('./webpack.config.js');
var complier;

// webpackConfig.devtool = 'cheap-module-eval-source-map';
webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '\'DEV\''
    },
    'NODE_ENV': '\'DEV\''
  })
);

module.exports = webpackConfig;