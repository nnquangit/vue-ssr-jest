const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const {VueLoaderPlugin} = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'
const resolve = (file) => path.resolve(__dirname, file)

const config = {
  devtool: isProd ? false : '#cheap-module-eval-source-map',
  mode: isProd ? 'production' : 'development',
  performance: {
    maxEntrypointSize: 1024 * 1024,
    maxAssetSize: 500 * 1024,
    hints: isProd ? 'warning' : false
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({uglifyOptions: {warnings: false, compress: true, output: {comments: false}}})
    ],
    noEmitOnErrors: true,
  },
  output: {
    path: resolve('../public'),
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      '@': resolve('src'),
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ['vue-style-loader', 'css-loader'],//MiniCssExtractPlugin.loader
      },
      {
        test: /\.styl$/,
        loader: ['vue-style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {limit: 10000, name: 'fonts/[name].[hash:7].[ext]'}
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {limit: 10000, name: 'img/[name].[hash:7].[ext]'}
      }
    ]
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    // new MiniCssExtractPlugin({
    //   filename: "[name].[hash].css",
    //   chunkFilename: "[id].[hash].css"
    // }),
    new VueLoaderPlugin(),
  ]
}

module.exports = config