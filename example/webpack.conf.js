const path = require('path')
const PugWebpackPlugin = require('../index.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssLoader = {
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
  ]
}

const src = path.resolve(__dirname, './src')
const dist = path.resolve(__dirname, './dist')
const publicPath = '/static/'

const imageLoader = {
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  query: {
    context: src,
    limit: 10000,
    // url-loader(use file-loader inside) hash means contenthash: https://github.com/webpack-contrib/file-loader/issues/177
    name: '[path][name].[hash:8].[ext]'
  }
}

const jsLoader = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
}

module.exports = {
  name: "example",
  mode: "production",
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/static/',
  },
  entry: {
    index: './src/index.js'
  },
  module: {
    rules: [imageLoader, cssLoader, jsLoader]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new PugWebpackPlugin({
      publicPath,
      context: src,
      template: path.resolve(src, 'index.pug'),
      outputPath: dist,
    })
  ]
}