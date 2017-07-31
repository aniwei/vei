var path    = require('path');

module.exports = {
  entry: {
    dist: __dirname + '/index.js'
  },

  // devtool: 'cheap-module-eval-source-map',

  output: { 
    path: __dirname + '/dist/', 
    filename: 'vx.js'
  },

  resolve: {
    extensions: ['.js']
  },

  module: {
    loaders: [
      {
        test: /\.jsx|\.vx|\.js?$/,
        loaders: 'babel-loader!vx-loader'
      }
    ]
  },
  plugins: [
  ]
};

