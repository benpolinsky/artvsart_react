var webpack = require('webpack');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  entry: ['whatwg-fetch', './app/main.js'],
  output: {
    path: './public/',
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
        loader: 'style-loader!css-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?mimetime=image/png'
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        loader: "url-loader?mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: "file-loader?name=[name].[ext]"
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