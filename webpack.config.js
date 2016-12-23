var path = require('path');
// var webpack = require('webpack');
module.exports = {
  cache: true,
  entry: {
    app: './src/web/app/index.js'
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: './public/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      // { test: /\.jade$/, loader: 'jade-loader?self'},
      { test: /\.hbs.jade$/, loader: 'ractive-loader!jade-html-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.png$/, loader: 'url?limit=10000&mimetype=image/png' },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader:
        'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  resolve: {
    extensions: ['', '.web.coffee', '.web.js', '.coffee', '.js', '.hbs.jade']
  },
  plugins: [
  ],
  node: {
    fs: 'empty'
  }
};
