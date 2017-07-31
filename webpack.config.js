var path    = require('path');

module.exports = {
  entry: {
    dist: path.join(__dirname , 'index.js')
  },

  // devtool: 'cheap-module-eval-source-map',

  output: { 
    path: path.join(__dirname, '/dist/'), 
    filename: 'vei.js'
  },

  resolve: {
    extensions: ['.js']
  },

  module: {
    loaders: [
      {
        test: /\.jsx|\.js?$/,
        loaders: 'babel-loader'
      }
    ]
  },
  plugins: [
  ]
};

