const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'
const resolve = (file) => path.resolve(__dirname, file)

const config = {
  devtool: false,//isProd ? false : '#source-map',
  mode: isProd ? 'production' : 'development',
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  output: {
    path: resolve('../public'),
    publicPath: '/public/',
    filename: '[name].[chunkhash].js'
  },
  // optimization: {
  //   runtimeChunk: {name: 'rtm'},
  //   splitChunks: {chunks: 'all'}
  // },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        loader: ['vue-style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin({
    //   filename: 'common.[chunkhash].css'
    // }),
    new VueLoaderPlugin(),
  ]
}

// if (isProd) {
//   config.plugins.push(new UglifyJSPlugin({
//     uglifyOptions: {
//       warnings: false,
//       compress: true,
//       output: {
//         comments: false,
//       },
//     }
//   }))
// }

module.exports = config