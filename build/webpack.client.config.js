const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = merge(base, {
    entry: {
        app: './src/entry-client.js'
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: "async",
            minSize: 1000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        }
    },
    // optimization: {
    //   splitChunks: {
    //     chunks: "async",
    //     minSize: 30000,
    //     minChunks: 1,
    //     maxAsyncRequests: 5,
    //     maxInitialRequests: 3,
    //     automaticNameDelimiter: '~',
    //     name: true,
    //     cacheGroups: {
    //       vendors: {
    //         name: 'vendors',
    //         test: /[\\/]node_modules[\\/]/,
    //         chunks: 'all',
    //         priority: -10
    //       },
    //       styles: {
    //         name: 'styles',
    //         test: /\.css$/,
    //         chunks: 'all',
    //         enforce: true
    //       },
    //       default: {
    //         minChunks: 2,
    //         priority: -20,
    //         reuseExistingChunk: true
    //       }
    //     }
    //   },
    //   runtimeChunk: {name: 'runtime'},
    //   // noEmitOnErrors: true,
    //   namedModules: true,
    //   namedChunks: true,
    //   minimize: true,
    //   minimizer: [
    //     new UglifyJSPlugin({
    //       uglifyOptions: {
    //         warnings: false,
    //         compress: true,
    //         output: {
    //           comments: false,
    //         },
    //       }
    //     })
    //   ],
    // },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new VueSSRClientPlugin()
    ]
})

module.exports = config