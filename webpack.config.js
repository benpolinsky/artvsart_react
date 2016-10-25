var webpack = require('webpack');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  entry: ['whatwg-fetch', './app/main.js'],
  output: {
    path: './',
    filename: 'index.js',
    publicPath: './public'
    },
  devServer: {
    inline: true,
    port: 3333,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.png$/,
        loader: "url",
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  plugins: [
    new DotenvPlugin({
      sample: './.env.default',
      path: './.env.production'
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
  ]
}