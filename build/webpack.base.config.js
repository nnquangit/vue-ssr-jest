const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {VueLoaderPlugin} = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'
const resolve = (file) => path.resolve(__dirname, file)

module.exports = {
  mode: 'production',
  devtool: isProd ? false : '#cheap-module-source-map',
  output: {
    path: resolve('../public'),
    publicPath: '/public/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {'vue$': 'vue/dist/vue.common.js'}
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
        loader: 'babel-loader'
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[chunkhash].css",
      chunkFilename: "[id].css"
    }),
    new VueLoaderPlugin(),
  ]
}
