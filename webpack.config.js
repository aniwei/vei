var path    = require('path');

module.exports = {
  entry: { 
    index: path.join(__dirname, './index.js')
  },

  output: { 
    path: path.join(__dirname, 'dist'), 
    filename: 'vei.js'
  },

  resolve: {
    module: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },

  module: {

    loaders: [
      {
        test: /\.js$/,
        loaders: 'babel-loader'
      }
    ]

  },

  plugins: []
};
