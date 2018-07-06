const webpack = require('webpack');
const merge = require('webpack-merge')
const path = require('path');
const base = require('./webpack.base')

const CompressionPlugin = require('compression-webpack-plugin');
const {SSRClientPlugin} = require('ssr-plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolve = (file) => path.resolve(__dirname, file)

const config = merge(base(), {
    entry: {app: resolve('../src/entry-client.js')},
    output: {
        path: resolve('../public'),
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.REACT_ENV': '"client"'
        }),
        new SSRClientPlugin({filename: 'ssr-client-manifest.json'})
    ]
})

if (isProd) {
    config.plugins.push(new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    }))
}

module.exports = config
