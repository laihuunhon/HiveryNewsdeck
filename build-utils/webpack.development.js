const commonPaths = require('./common-paths');
const webpack = require('webpack');
const port = process.env.PORT || 3000;
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    app: `${commonPaths.appEntry}/app/app.js`
  },
  output: {
    filename: '[name].[hash].js'
  },
  devtool: 'inline-source-map',
  resolve: {
    modules: [path.resolve(process.cwd(), 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'less-loader',
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].[hash].css')
  ],
  devServer: {
    host: 'localhost',
    contentBase: './src/public',
    port: port,
    historyApiFallback: true,
    hot: true,
    open: true,
	proxy: [{
      context: ['/hivery'],
      target: 'http://secure-cliffs-25767.herokuapp.com',
      changeOrigin: true,
    }]
  }
};
module.exports = config;