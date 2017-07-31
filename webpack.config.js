var path    = require('path');

module.exports = {
  entry: { 
    index: './index.js'
  },

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
        test: /\.js$/,
        loaders: 'babel-loader'
      }
    ]
  },
  plugins: [
  ]
};
console.log(module.exports)
